import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import geoip from "geoip-lite";
import User, { IUser } from "../models/User";

const router = express.Router();

interface GeoLocation {
  city?: string;
  region?: string;
  country?: string;
}

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    async (err: Error | null, user: IUser | false, info: any) => {
      if (err) throw err;
      if (!user) return res.status(400).json({ message: "No user found" });

      req.logIn(user, async (err) => {
        if (err) throw err;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        const ip = req.ip || "8:8:8:8";
        const geo = geoip.lookup(ip);
        console.log(`Geo: ${geo}`);

        if (geo) {
          if (user.lastLoginIP && user.lastLoginIP !== ip) {
            const transporter = nodemailer.createTransport({
              host: "smtp.office365.com",
              port: 587,
              secure: false,
              auth: {
                user: process.env.OUTLOOK_USER,
                pass: process.env.OUTLOOK_PASS,
              },
            });

            const mailOptions = {
              from: process.env.OUTLOOK_USER,
              to: user.email,
              subject: "New Login Detected",
              text: `Your account was accessed from a new location: ${geo.city}, ${geo.region}, ${geo.country}`,
            };

            try {
              const info = await transporter.sendMail(mailOptions);
              console.log("Email sent: " + info.response);
            } catch (error) {
              console.error("Error sending email: ", error);
            }
          }

          user.lastLoginIP = ip;
          await user.save();
          res.json({ token });
        } else {
          res.status(500).json({ error: "Geolocation lookup failed" });
        }
      });
    }
  )(req, res, next);
});

export default router;

import React, { useState } from "react";
import Logo from "./Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-24">
      <Logo />
      <h1 className="text-3xl font-bold tracking-tighter p-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="pr-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-black bg-slate-200 rounded-md active:border-none"
          />
        </div>
        <div>
          <label className="pr-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-black bg-slate-200 rounded-md active:border-none"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

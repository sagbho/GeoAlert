import Logo from "./Logo";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-24 space-y-4">
      <Logo />
      <button className="bg-black text-white px-4 py-2 rounded-md">
        <a href="/login">Login</a>
      </button>
      <button className="bg-black text-white px-4 py-2 rounded-md">
        <a href="/register">Register</a>
      </button>
    </div>
  );
}

import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <button>
        <a href="/login">Login</a>
      </button>
      <button>
        <a href="/register">Register</a>
      </button>
    </div>
  );
}

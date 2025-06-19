"use client";

import { useState } from "react";
import api from "@/../../lib/axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/api";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true); 
    try {
      await API.post("/api/auth/signup", form);
      router.push("/login");
    } catch (err) {
      alert("Signup failed");
    }
    setLoading(false); 
  }

  return (
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Signup"}
      </button>
    </form>
  </div>
);
}
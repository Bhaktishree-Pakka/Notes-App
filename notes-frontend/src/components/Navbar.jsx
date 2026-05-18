"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    const loadTheme = () => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.body.classList.add("dark");
        setIsDark(true);
      }
    };

    checkAuth();
    loadTheme();

    // 🔥 listen for login/logout
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");

    // 🔥 update instantly
    window.dispatchEvent(new Event("storage"));

    router.push("/login");
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");
    setIsDark(darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }

  return (
    <nav className="nav">
      {/* clickable logo */}
      <Link href="/">
        <h2 className="logo">MyNotes</h2>
      </Link>

      <div className="links">
        <Link href="/">Home</Link>

        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}

        <button onClick={toggleTheme}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
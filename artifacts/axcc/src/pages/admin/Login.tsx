import { useState, FormEvent } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        navigate("/admin");
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Could not reach server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={`${import.meta.env.BASE_URL}ax-logo.png`}
            alt="a-X"
            className="h-14 w-auto mx-auto mb-3"
          />
          <p className="text-white/30 text-xs tracking-widest uppercase">
            Admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                         text-white text-sm placeholder-white/20 outline-none
                         focus:border-white/30 focus:bg-white/8 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white
                       transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "hsl(68 57% 38%)" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

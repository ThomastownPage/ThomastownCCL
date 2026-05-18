import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Lock, User, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/admin", { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(username, password);
    if (success) {
      navigate("/admin");
    } else {
      setError("Wrong username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-[var(--brand-light)] rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-12 h-12 text-[var(--brand)]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-xl text-gray-500">Thomastown Community Centre</p>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-5 py-4 rounded-xl text-lg mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-3">
              <User className="w-5 h-5" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-[var(--brand)] focus:outline-none"
              placeholder="Enter your username"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-3">
              <Lock className="w-5 h-5" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-[var(--brand)] focus:outline-none"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-[var(--brand)] text-white text-2xl font-bold rounded-xl hover:bg-[var(--brand-hover)] active:bg-[var(--brand-dark)] transition-colors flex items-center justify-center gap-3 mt-4"
          >
            <LogIn className="w-7 h-7" />
            Log In to Admin Panel
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-lg text-[var(--brand)] hover:text-[var(--brand-hover)] underline"
          >
            ← Back to the Website
          </a>
        </div>
      </div>
    </div>
  );
}

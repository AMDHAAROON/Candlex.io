import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utility/firebase/firebase";

export default function Signup() {
  const [name, setName] = useState(""); // ✅ new state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Set the display name in Firebase
      await updateProfile(userCredential.user, { displayName: name });

      alert("Account created successfully!");
      window.location.href = "/login"; // Go back to login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3b2f23] to-[#1c150f] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#f1cc94] rounded-full blur-[180px] opacity-50 animate-pulse"></div>

      <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent shadow-2xl">
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 w-96 border border-white/40 shadow-[0_4px_30px_rgba(241,204,148,0.4)]">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-[#f1cc94] drop-shadow-lg">
            Candlex Signup
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* ✅ Name input */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:border-[#f1cc94]"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:border-[#f1cc94]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:border-[#f1cc94]"
              required
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#f1cc94]/90 text-[#3b2f23] py-3 rounded-lg font-bold shadow-lg hover:bg-[#f1cc94] transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-200 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#f1cc94] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

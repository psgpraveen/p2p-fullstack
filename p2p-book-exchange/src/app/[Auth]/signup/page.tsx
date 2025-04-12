"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "owner",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_URL}api/users/register`, formData);
      localStorage.setItem("userRole", formData.role);
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500 px-4">
        <div className="bg-white/30 backdrop-blur-lg border border-white/40 p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in">
          <h2 className="text-4xl font-extrabold text-white text-center mb-8 tracking-tight">
            Create Your Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-white">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm cursor-pointer font-medium">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 w-full  cursor-pointerpx-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400"
              >
                <option value="owner">Book Owner</option>
                <option value="seeker">Book Seeker</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 flex justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white underline font-semibold hover:text-blue-200">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/users/login`, {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("userRole", response.data.role);
      toast.success("Login successful!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back 👋</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-white flex items-center gap-2">
                <input type="checkbox" {...register("remember")} className="accent-blue-600" />
                Remember me
              </label>
              {/* <Link href="/auth/forgot" className="text-sm text-white underline hover:text-blue-200">
                Forgot password?
              </Link> */}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 flex items-center justify-center"
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
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-white underline font-semibold hover:text-blue-200">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

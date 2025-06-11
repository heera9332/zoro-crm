"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Suspense } from "react";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // zustand hooks
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const user = useAuthStore((s) => s.user);

  // local only for view-switch and transient success state
  const [action, setAction] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const urlAction = searchParams.get("action");
    setAction(urlAction === "register" ? "register" : "login");
    setSuccess("");
  }, [searchParams]);

  // Redirect on login (optional)
  useEffect(() => {
    if (user && action === "login") {
      setSuccess("Login successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [user, action, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    const name = (formData.get("name") as string) || username;

    if (action === "login") {
      await login({ email, password, username });
      // success and error handled by zustand state/effect above
    } else {
      const ok = await register({ email, password, username, name });
      if (ok) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => {
          router.replace("?action=login");
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold text-center text-orange-500 mb-2">
            {action === "login" ? "Login" : "Register"}
          </h1>
          <p className="text-center text-gray-500 mb-8">
            {action === "login"
              ? "Sign in to your account"
              : "Create a new account to get started"}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {action === "register" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="johnny"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 bg-red-50 border border-red-100 p-2 rounded text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-600 bg-green-50 border border-green-100 p-2 rounded text-center">
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                disabled={loading}
              >
                {loading
                  ? action === "login"
                    ? "Logging in..."
                    : "Registering..."
                  : action === "login"
                    ? "Login"
                    : "Register"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            {action === "login" ? (
              <a
                href="?action=register"
                className="text-orange-500 hover:underline font-medium"
              >
                Don't have an account? Register
              </a>
            ) : (
              <a
                href="?action=login"
                className="text-orange-500 hover:underline font-medium"
              >
                Already have an account? Login
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}

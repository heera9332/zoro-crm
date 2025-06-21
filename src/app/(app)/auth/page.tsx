"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Suspense } from "react";

// const Action : string =  "login" | "register" | "logout" | "reset-password" | "forgot-password";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // zustand hooks
  const {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    loading,
    error,
    user,
  } = useAuthStore();

  const [action, setAction] = useState<
    "login" | "register" | "forgot-password" | "reset-password" | "logout"
  >("login");
  const [success, setSuccess] = useState<string>("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const urlAction = searchParams.get("action");
    setAction(
      urlAction === "register" ||
        urlAction === "forgot-password" ||
        urlAction === "reset-password"
        ? urlAction
        : "login"
    );
    setToken(searchParams.get("token"));
    setRedirectTo(searchParams.get("redirect_to"));
    setSuccess("");
  }, [searchParams]);

  // Redirect on login
  useEffect(() => {
    if (action === "logout") {
      logout();
      setSuccess("You have been logged out.");
      setTimeout(() => {
        router.replace("?action=login");
      }, 1000);
    } else if (user && action === "login") {
      setSuccess("Login successful!");
      setTimeout(() => {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push("/dashboard");
        }
      }, 1000);
    }
  }, [user, action, router, redirectTo, logout]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    if (action === "login") {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      await login({ username, password });
    } else if (action === "register") {
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      const name = (formData.get("name") as string) || username;
      const password = formData.get("password") as string;
      const ok = await register({ email, username, name, password });
      if (ok) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => {
          router.replace("?action=login");
        }, 1000);
      }
    } else if (action === "forgot-password") {
      const email = formData.get("email") as string;
      const ok = await forgotPassword(email);
      if (ok) {
        setSuccess("Check your email for reset instructions.");
      }
    } else if (action === "reset-password") {
      const password = formData.get("password") as string;
      if (!token) {
        setSuccess("Invalid or expired reset token.");
        return;
      }
      const ok = await resetPassword(token, password);
      if (ok) {
        setSuccess("Password reset! You can now log in.");
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
            {
              {
                login: "Login",
                register: "Register",
                "forgot-password": "Forgot Password",
                "reset-password": "Reset Password",
              }[action]
            }
          </h1>
          <p className="text-center text-gray-500 mb-8">
            {
              {
                login: "Sign in to your account",
                register: "Create a new account to get started",
                "forgot-password":
                  "Enter your email and we'll send you reset instructions.",
                "reset-password": "Enter a new password for your account.",
              }[action]
            }
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {action === "register" && (
                <>
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </>
              )}
              {action === "forgot-password" && (
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
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="you@email.com"
                  />
                </div>
              )}
              {(action === "login" || action === "register") && (
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
              )}
              {(action === "login" ||
                action === "register" ||
                action === "reset-password") && (
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
              )}
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
                {
                  {
                    login: loading ? "Logging in..." : "Login",
                    register: loading ? "Registering..." : "Register",
                    "forgot-password": loading
                      ? "Sending..."
                      : "Send Reset Link",
                    "reset-password": loading
                      ? "Resetting..."
                      : "Reset Password",
                  }[action]
                }
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            {action === "login" && (
              <>
                <a
                  href="?action=register"
                  className="text-orange-500 hover:underline font-medium"
                >
                  Don't have an account? Register
                </a>
                <br />
                <a
                  href="?action=forgot-password"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </>
            )}
            {action === "register" && (
              <a
                href="?action=login"
                className="text-orange-500 hover:underline font-medium"
              >
                Already have an account? Login
              </a>
            )}
            {action === "forgot-password" && (
              <a
                href="?action=login"
                className="text-orange-500 hover:underline font-medium"
              >
                Back to Login
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

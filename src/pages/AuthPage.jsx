import React, { useState } from "react";
import "../styles/authStyles.css";
import { useLogin, useRegister } from "../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const { mutate: login, isPending: loginLoading } = useLogin();
  const { mutate: register, isPending: registerLoading } = useRegister();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchTab = (type) => {
    setIsLogin(type === "login");
    setForm({ name: "", email: "", password: "" });
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      login(
        { email: form.email, password: form.password },
        {
          onSuccess: (res) => {
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("userData", JSON.stringify(res?.data?.user));
            toast.success("Login successful 🚀");
            navigate("/dashboard");
            console.log(res)
          },
          onError: (err) => {
            console.log(err)
            toast.error(
              err?.response?.data?.message || "Login failed"
            );
          },
        }
      );
    } else {
      register(
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          onSuccess: (res) => {
            console.log("res", res)
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("userData", JSON.stringify(res?.data?.user));
            toast.success("Welcome to TaskFlow🚀");
            navigate("/dashboard");
          },
          onError: (err) => {
            toast.error(
              err?.response?.data?.message || "Registration failed"
            );
          },
        }
      );
    }
  };

  const loading = loginLoading || registerLoading;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg,#f0f0ff 0%,#f7f7f5 60%,#eaf3de 100%)" }}
    >
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 bg-violet-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-violet-600/30">
            ✓
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">TaskFlow</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              type="button"
              onClick={() => switchTab("login")}
              className={`flex-1 py-3.5 text-sm font-semibold border-b-2 transition-all ${isLogin
                ? "border-violet-600 text-violet-600 bg-violet-50"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchTab("register")}
              className={`flex-1 py-3.5 text-sm font-semibold border-b-2 transition-all ${!isLogin
                ? "border-violet-600 text-violet-600 bg-violet-50"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              Create account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="p-7">

            {/* Name — register only */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <i className="ti ti-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    required
                    className="w-full pl-4 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:border-violet-400 focus:ring focus:ring-violet-600/10"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Email address
              </label>
              <div className="relative">
                <i className="ti ti-mail absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-4 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:border-violet-400 focus:ring focus:ring-violet-600/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <i className="ti ti-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="w-full pl-4 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:border-violet-400 focus:ring focus:ring-violet-600/10"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-800 active:scale-95 text-white
                         text-sm font-semibold rounded-lg transition-all shadow-md shadow-violet-600/25
                         hover:shadow-lg hover:shadow-violet-600/30 disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading && (
                <i className="ti ti-loader-2 animate-spin text-base" aria-hidden="true" />
              )}
              {isLogin ? "Sign in" : "Create account"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchTab(isLogin ? "register" : "login")}
                className="text-violet-600 font-semibold hover:underline"
              >
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
"use client";
import React from "react";
import { Mail, Lock, GraduationCap, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import ImageLogin from "../../Asset/images/ImageLogin.jpg";
import avatar1 from "../../Asset/images/avatar1.jpg";
import avatar2 from "../../Asset/images/avatar2.jpg";
import avatar3 from "../../Asset/images/avatar3.jpg";
import LogoDac from "../../Asset/images/favicon.svg";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Tous les champs sont obligatoires");
      return;
    }
    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }

    setLoading(true);
    // Simuler une connexion (remplacer par logique réelle)
    try {
      // await loginUser({ email, password });
      console.log("Connexion avec", email, password);
      // Redirection ou autre logique après connexion
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white w-full h-screen flex items-center justify-center overflow-y-hidden">
      <div className="bg-white shadow-2xl w-full max-w-5xl h-[90vh] rounded-2xl flex overflow-hidden">
        <div className="relative w-1/2 h-full rounded-l-2xl overflow-hidden">
          <Image
            src={ImageLogin}
            alt="ImageLogin"
            fill
            className="object-cover  rounded-l-2xl"
          />
          <div className="absolute inset-0 bg-blue-700/50 w-full rounded-l-2xl flex flex-col items-center justify-center text-white p-8">
            <h1 className="font-bold text-4xl">
              Empowering the next generation of African scholars.
            </h1>
            <p className="mt-3 leading-relaxed">
              Digital Academy Congo provides word-class educational
              infrastructure tailored for modern universities.
            </p>
            <div className="flex mt-6 w-full items-center justify-start">
              <div className="relative">
                <Image
                  src={avatar1}
                  alt="Avatar 1"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="relative -ml-3">
                <Image
                  src={avatar2}
                  alt="Avatar 2"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="relative -ml-3">
                <Image
                  src={avatar3}
                  alt="Avatar 3"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <p className="ml-2 text-white text-center">
                +2,500 students joinded this semester
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 h-full flex flex-col items-center justify-center bg-white"
        >
          <div className="w-full p-4 mt-4 flex items-center justify-around">
            <Image src={LogoDac} alt="DAC" width={70} height={50} />
            <div className="flex flex-col justify-center items-center">
              <GraduationCap
                size={40}
                className="text-gray-500 mr-2 border-dashed border-2 p-2 flex justify-center items-center rounded-xl size-10 text-2xl"
              />
              <p className="uppercase text-sm text-gray-500 font-semibold">
                partner university
              </p>
            </div>
          </div>
          <div className="w-full h-full max-w-md p-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <h2 className="text-2xl font-bold">Welcome back</h2>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Please enter your credentials to access your dashboard.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email
              </label>
              <div className="flex items-center bg-gray-400/10 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                <Mail size={20} className="text-gray-500 shrink-0" />
                <input
                  type="email"
                  placeholder="ex: jean.dupont@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-gray-500 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center w-full">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Password
                </label>
                <a
                  href="/auth/verify"
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center bg-gray-400/10 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                <Lock size={20} className="text-gray-500 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-gray-500 font-medium"
                />
                {showPassword ? (
                  <EyeOff
                    size={20}
                    className="text-gray-500 shrink-0 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-gray-500 shrink-0 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-600 ml-2">
                Keep me logged in for 30 days
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-primary text-white font-semibold rounded-lg py-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-secondary hover:underline"
                >
                  Contact your administrator
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

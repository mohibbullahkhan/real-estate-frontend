'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { handleApiError } from '@/lib/utils';
import { showError } from '@/lib/alerts';
import { Command, ArrowRight, Home } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // If already authenticated, skip the login page entirely
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await api.get('/api/auth/me');
          router.replace('/admin/dashboard');
          return;
        } catch {
          localStorage.removeItem('token');
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await api.post('/api/auth/login', { email: normalizedEmail, password });
      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        window.dispatchEvent(new Event('auth-change'));
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      await showError('Login Failed', handleApiError(err) || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show a spinner while we verify existing auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans bg-white selection:bg-black selection:text-white">
      {/* Left Side - Image & Brand (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 flex-col justify-between">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80"
          alt="Luxury Real Estate"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        {/* Top left brand */}
        <div className="relative z-10 p-12">
          <Link href="/" className="flex items-center gap-3 group inline-flex">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
              <Command className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Ever<span className="text-slate-300">Green</span></span>
          </Link>
        </div>

        {/* Bottom left content */}
        <div className="relative z-10 p-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            EverGreen Admin Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Manage your elite real estate portfolio.
          </h1>
          <p className="text-lg text-slate-300 font-medium">
            Access your dashboard to oversee properties, track inquiries, and close deals faster than ever.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 relative">
        {/* Mobile Brand (Visible only on mobile) */}
        <div className="lg:hidden absolute top-8 left-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Command className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Ever<span className="text-slate-500">Green</span></span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[400px]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-3 text-[15px] text-slate-500 font-medium">
              Please enter your credentials to access the admin dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email-address" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm font-medium bg-slate-50/50 focus:bg-white"
                    placeholder="admin@evergreen.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <Link href="/admin/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm font-medium bg-slate-50/50 focus:bg-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-8 group"
            >
              {isLoading ? 'Signing in...' : 'Sign in to Dashboard'}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            
            <div className="mt-8 text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                <Home className="w-4 h-4" />
                Return to public site
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Home, MessageSquare, Settings, LogOut, Menu, X, Command } from 'lucide-react';
import api from '@/lib/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Exclude auth pages from sidebar and auth checks
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/forgot-password';

  useEffect(() => {
    if (isAuthPage) {
      setIsLoading(false);
      return;
    }

    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await api.get('/api/auth/me');
        setUser(response.data.data); // Based on standard success payload
      } catch (err: any) {
        localStorage.removeItem('token');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [isAuthPage, router, pathname]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Properties', href: '/admin/properties', icon: Home },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900 selection:bg-black selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 flex flex-col z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)] lg:translate-x-0 lg:static lg:flex-shrink-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-100/60">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-black/10">
              <Command className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Ever<span className="text-slate-500">Green</span></span>
          </Link>
          <button className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 scrollbar-hide">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Menu</p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-md shadow-black/5'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-black rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-200"></div>
                )}
                <Icon className={`w-[22px] h-[22px] mr-3.5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                <span className="text-[15px]">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Profile & Logout */}
        <div className="p-5 border-t border-slate-100/60 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-inner">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@evergreen.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-red-600 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-[14px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-slate-100 to-transparent -z-10 pointer-events-none"></div>
        
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center px-4 sticky top-0 z-30">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:text-black focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 text-[17px] font-semibold text-slate-900">EverGreen Admin</span>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

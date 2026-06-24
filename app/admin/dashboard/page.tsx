'use client';

import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  MessageSquareText, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { formatInquiryStatus } from '@/lib/utils';

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Loop through statuses to get accurate total properties count
      const statuses = ['ACTIVE', 'PENDING', 'SOLD', 'RENTED'];
      let totalProps = 0;
      let activeProps = 0;

      await Promise.all(
        statuses.map(async (status) => {
          const res = await api.get(`/api/properties?limit=1&status=${status}`);
          const count = res.data.total || 0;
          totalProps += count;
          if (status === 'ACTIVE') {
            activeProps = count;
          }
        })
      );

      // Fetch inquiries
      const inqRes = await api.get('/api/inquiries?limit=5'); // Assuming recent 5
      const inquiries = inqRes.data.data || [];
      const totalInq = inqRes.data.total || inquiries.length;
      
      // We might need to fetch all new inquiries to get an accurate count if there are many.
      // But let's assume we can query by status=NEW
      const newInqRes = await api.get('/api/inquiries?status=NEW&limit=1');
      const newInqCount = newInqRes.data.total || 0;

      setStats({
        totalProperties: totalProps,
        activeListings: activeProps,
        totalInquiries: totalInq,
        newInquiries: newInqCount,
      });
      setRecentInquiries(inquiries.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Admin</h1>
          <p className="text-slate-500 mt-1 text-[15px]">Here's what's happening with your properties today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <Calendar className="w-4 h-4 text-indigo-500" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-slate-500 mb-1">Total Properties</h3>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.totalProperties}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-slate-500 mb-1">Active Listings</h3>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.activeListings}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                <MessageSquareText className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-slate-500 mb-1">Total Inquiries</h3>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.totalInquiries}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                <AlertCircle className="w-6 h-6" />
              </div>
              {stats.newInquiries > 0 && (
                <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md animate-pulse">
                  Action Required
                </span>
              )}
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-slate-500 mb-1">New Inquiries</h3>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.newInquiries}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area - Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Recent Inquiries List - Takes up 2/3 width */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Inquiries</h2>
              <p className="text-sm text-slate-500 mt-0.5">The latest messages from potential buyers.</p>
            </div>
            <Link href="/admin/inquiries" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto">
            {isLoading ? (
               <div className="p-8 text-center text-slate-500">Loading inquiries...</div>
            ) : recentInquiries.length === 0 ? (
               <div className="p-8 text-center text-slate-500">No inquiries yet.</div>
            ) : (
              recentInquiries.map((inquiry, idx) => (
                <div key={inquiry.id || inquiry._id} className={`p-6 flex flex-col sm:flex-row gap-5 hover:bg-slate-50/80 transition-colors ${idx !== recentInquiries.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  {/* Avatar Placeholder */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                    {inquiry.name.charAt(0).toUpperCase()}
                    {inquiry.status === 'NEW' && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[16px] font-bold text-slate-900">{inquiry.name}</h3>
                        {inquiry.status === 'NEW' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-rose-100 text-rose-700 uppercase">
                            New
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-slate-100 text-slate-600 uppercase">
                          {(inquiry.type || 'GENERAL').replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {inquiry.property && (
                      <p className="text-sm font-medium text-indigo-600 mb-2 flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> {inquiry.property.title} - {inquiry.property.address}
                      </p>
                    )}
                    
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{inquiry.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Takes up 1/3 width */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">Quick Actions</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Manage your real estate empire quickly.</p>
            
            <div className="space-y-3 relative z-10">
              <Link href="/admin/properties/create" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white px-5 py-4 rounded-xl transition-colors group border border-white/5">
                <span className="font-medium text-sm">Add New Property</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
              </Link>
              <Link href="/admin/settings" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white px-5 py-4 rounded-xl transition-colors group border border-white/5">
                <span className="font-medium text-sm">Update Settings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { handleApiError, getInquiryStatusStyle } from '@/lib/utils';
import { showSuccess, showError, showToast, confirmDelete } from '@/lib/alerts';
import { Trash2, Filter } from 'lucide-react';

export default function InquiryManager() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      let url = `/api/inquiries?page=${page}&limit=10`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (typeFilter) url += `&type=${typeFilter}`;

      const res = await api.get(url);
      setInquiries(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err: any) {
      await showError('Failed to load inquiries', handleApiError(err) || 'Could not fetch inquiries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter, typeFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/inquiries/${id}/status`, { status: newStatus });
      await showToast(`Status updated to ${newStatus}`);
      fetchInquiries();
    } catch (err: any) {
      await showError('Status update failed', handleApiError(err) || 'Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete('this inquiry');
    if (!confirmed) return;

    try {
      await api.delete(`/api/inquiries/${id}`);
      await showSuccess('Inquiry deleted', 'The inquiry has been permanently removed.');
      fetchInquiries();
    } catch (err: any) {
      await showError('Could not delete inquiry', handleApiError(err) || 'Failed to delete inquiry.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
          <Filter className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 mr-2">Status:</span>
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-transparent border-none focus:ring-0 text-sm font-medium p-0"
          >
            <option value="">All</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
        <div className="flex-1 flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
          <Filter className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 mr-2">Type:</span>
          <select 
            value={typeFilter} 
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="bg-transparent border-none focus:ring-0 text-sm font-medium p-0"
          >
            <option value="">All</option>
            <option value="GENERAL">General</option>
            <option value="QUESTION">Question</option>
            <option value="TOUR_REQUEST">Tour Request</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Message</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Property</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No inquiries found matching your criteria.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry: any) => {
                  const isNew = inquiry.status === 'NEW';
                  const propertyData = inquiry.property || inquiry.propertyId;
                  
                  return (
                    <tr key={inquiry._id || inquiry.id} className={`${isNew ? 'bg-red-50 hover:bg-red-100/50' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          {inquiry.name}
                          {isNew && <span className="w-2 h-2 rounded-full bg-red-500" title="New Inquiry"></span>}
                        </div>
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                        {inquiry.phone && <div className="text-xs text-gray-400 mt-1">{inquiry.phone}</div>}
                        <div className="text-xs text-gray-400 mt-1">{new Date(inquiry.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 whitespace-pre-wrap line-clamp-3">
                          {inquiry.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-800 inline-block mb-1">
                          {(inquiry.type || 'GENERAL').replace('_', ' ')}
                        </div>
                        {propertyData && (
                          <div className="text-xs text-blue-600 truncate max-w-[200px]" title={`${propertyData.title} - ${propertyData.address}`}>
                            {propertyData.title} <br/>
                            <span className="text-gray-500">{propertyData.address}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`text-xs rounded-full px-2 py-1 font-semibold border-0 cursor-pointer focus:ring-0 ${getInquiryStatusStyle(inquiry.status)}`}
                          value={inquiry.status || 'NEW'}
                          onChange={(e) => handleStatusChange(inquiry._id || inquiry.id, e.target.value)}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleDelete(inquiry._id || inquiry.id)} className="text-red-600 hover:text-red-900 p-2">
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

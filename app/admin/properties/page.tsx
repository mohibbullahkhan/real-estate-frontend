'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { handleApiError, formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import { showSuccess, showError, showToast, confirmDelete } from '@/lib/alerts';
import { Plus, Search, Edit, Trash2, Check, X, Home } from 'lucide-react';

export default function PropertiesManager() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [properties, setProperties] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchProperties();
  }, [page, debouncedSearch]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      let url = `/api/properties?page=${page}&limit=10`;
      if (debouncedSearch) url += `&search=${debouncedSearch}`;
      const res = await api.get(url);
      setProperties(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err: any) {
      await showError('Failed to load properties', handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete(title);
    if (!confirmed) return;

    try {
      await api.delete(`/api/properties/${id}`);
      await showSuccess('Property deleted', `"${title}" has been removed from your listings.`);
      fetchProperties();
    } catch (err: any) {
      await showError('Could not delete property', handleApiError(err));
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/properties/${id}/status`, { status: newStatus });
      await showToast(`Status updated to ${newStatus}`);
      fetchProperties();
    } catch (err: any) {
      await showError('Status update failed', handleApiError(err));
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await api.patch(`/api/properties/${id}/featured`, { featured: !currentFeatured });
      await showToast(currentFeatured ? 'Removed from featured' : 'Marked as featured');
      fetchProperties();
    } catch (err: any) {
      await showError('Could not update featured status', handleApiError(err));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <Link
          href="/admin/properties/create"
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search properties by title or city..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price & Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
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
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((property: any) => {
                  const propId = property._id || property.id;
                  return (
                    <tr key={propId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                            {property.coverImage ? (
                              <img src={property.coverImage} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <Home className="h-full w-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(property.price)}</div>
                        <div className="text-xs text-gray-500">{property.propertyType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`text-xs rounded-full px-2 py-1 font-semibold border-0 cursor-pointer focus:ring-0 ${getStatusBadgeStyle(property.status)}`}
                          value={property.status || 'ACTIVE'}
                          onChange={(e) => handleStatusChange(propId, e.target.value)}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="PENDING">PENDING</option>
                          <option value="SOLD">SOLD</option>
                          <option value="RENTED">RENTED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleToggleFeatured(propId, property.featured)}
                          className={`inline-flex p-1.5 rounded-full ${property.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'} hover:opacity-80 transition-opacity`}
                        >
                          {property.featured ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <Link href={`/admin/properties/${propId}/edit`} className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(propId, property.title)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
              </p>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { handleApiError } from '@/lib/utils';
import { showSuccess, showError, showToast, showLoading, closeAlert, confirmDelete } from '@/lib/alerts';
import { ArrowLeft, Upload, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const [formData, setFormData] = useState({
    title: '', description: '', price: '', bedrooms: '', bathrooms: '',
    squareArea: '', address: '', city: '', state: '', zipCode: '',
    country: 'USA', propertyType: 'HOUSE', listingType: 'FOR_SALE',
    agentName: '', agentTitle: '', agentPhoto: '',
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState('');
  const [newGalleryImages, setNewGalleryImages] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const fetchProperty = async () => {
    setIsFetching(true);
    try {
      const res = await api.get(`/api/properties/${id}`);
      const p = res.data.data;
      setProperty(p);
      setFormData({
        title: p.title || '', description: p.description || '',
        price: p.price?.toString() || '', bedrooms: p.bedrooms?.toString() || '',
        bathrooms: p.bathrooms?.toString() || '', squareArea: p.squareArea?.toString() || '',
        address: p.address || '', city: p.city || '', state: p.state || '',
        zipCode: p.zipCode || '', country: p.country || 'USA',
        propertyType: p.propertyType || 'HOUSE', listingType: p.listingType || 'FOR_SALE',
        agentName: p.agentName || '', agentTitle: p.agentTitle || '', agentPhoto: p.agentPhoto || '',
      });
      if (p.amenities) {
        try {
          const parsed = typeof p.amenities === 'string' ? JSON.parse(p.amenities) : p.amenities;
          setAmenities(Array.isArray(parsed) ? parsed : []);
        } catch {
          setAmenities(typeof p.amenities === 'string' ? p.amenities.split(',').filter(Boolean) : []);
        }
      }
    } catch (err: any) {
      await showError('Failed to load property', handleApiError(err));
      router.push('/admin/properties');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchProperty(); }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAmenity = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && amenityInput.trim()) {
      e.preventDefault();
      if (!amenities.includes(amenityInput.trim())) setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput('');
    }
  };

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) { showError('Invalid file type', `"${file.name}" must be JPEG, PNG, or WEBP.`); return false; }
    if (file.size > MAX_FILE_SIZE) { showError('File too large', `"${file.name}" exceeds the 5MB limit.`); return false; }
    return true;
  };

  const handleNewGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(validateFile);
      const remaining = 10 - ((property?.propertyImages?.length || 0) + newGalleryImages.length);
      const newFiles = files.slice(0, remaining);
      setNewGalleryImages([...newGalleryImages, ...newFiles]);
      setNewGalleryPreviews([...newGalleryPreviews, ...newFiles.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeNewGalleryImage = (index: number) => {
    const imgs = [...newGalleryImages]; imgs.splice(index, 1); setNewGalleryImages(imgs);
    const prevs = [...newGalleryPreviews]; prevs.splice(index, 1); setNewGalleryPreviews(prevs);
  };

  const handleUploadNewImages = async () => {
    if (newGalleryImages.length === 0) return;
    setIsUploadingImages(true);
    showLoading('Uploading images…');
    const data = new FormData();
    newGalleryImages.forEach(file => data.append('images', file));
    try {
      await api.post(`/api/properties/${id}/images`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      closeAlert();
      await showSuccess('Images added', 'Your new gallery images are now live.');
      setNewGalleryImages([]);
      setNewGalleryPreviews([]);
      fetchProperty();
    } catch (err: any) {
      closeAlert();
      await showError('Upload failed', handleApiError(err));
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleDeleteExistingImage = async (imageId: string) => {
    const confirmed = await confirmDelete('this image');
    if (!confirmed) return;
    try {
      await api.delete(`/api/properties/${id}/images/${imageId}`);
      await showToast('Image deleted');
      fetchProperty();
    } catch (err: any) {
      await showError('Could not delete image', handleApiError(err));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    showLoading('Saving changes…');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
    data.append('amenities', JSON.stringify(amenities));

    try {
      await api.put(`/api/properties/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      closeAlert();
      await showSuccess('Property updated!', 'Your changes have been saved successfully.');
      router.push('/admin/properties');
    } catch (err: any) {
      closeAlert();
      await showError('Update failed', handleApiError(err));
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return <div className="p-8 text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
      </div>

      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea name="description" required rows={4} value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input type="number" name="price" required min="0" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Square Area (sqft) *</label>
                <input type="number" name="squareArea" required min="0" value={formData.squareArea} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
                <input type="number" name="bedrooms" required min="0" value={formData.bedrooms} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
                <input type="number" name="bathrooms" required min="0" step="0.5" value={formData.bathrooms} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black">
                  <option value="HOUSE">HOUSE</option>
                  <option value="VILLA">VILLA</option>
                  <option value="APARTMENT">APARTMENT</option>
                  <option value="TOWNHOUSE">TOWNHOUSE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type *</label>
                <select name="listingType" value={formData.listingType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black">
                  <option value="FOR_SALE">FOR_SALE</option>
                  <option value="FOR_RENT">FOR_RENT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
            </div>
          </div>

          {/* Features & Agent */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Features & Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1.5 flex-wrap gap-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  {amenities.map(amenity => (
                    <span key={amenity} className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                      {amenity}
                      <button type="button" onClick={() => setAmenities(amenities.filter(a => a !== amenity))} className="text-gray-500 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <input type="text" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} onKeyDown={handleAddAmenity} placeholder="Type and press Enter" className="flex-1 min-w-[150px] border-none focus:ring-0 p-1 text-sm bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                <input type="text" name="agentName" value={formData.agentName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Title</label>
                <input type="text" name="agentTitle" value={formData.agentTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Photo URL</label>
                <input type="url" name="agentPhoto" value={formData.agentPhoto} onChange={handleInputChange} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="submit" disabled={isUpdating} className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-70">
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Gallery Management */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold border-b pb-2">Gallery Images</h2>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Images</h3>
            <div className="flex flex-wrap gap-4">
              {property?.propertyImages?.map((img: any) => (
                <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => handleDeleteExistingImage(img.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {(!property?.propertyImages || property.propertyImages.length === 0) && (
                <p className="text-sm text-gray-500">No gallery images yet.</p>
              )}
            </div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add More Images</h3>
            <div className="flex flex-wrap gap-4 items-end">
              {newGalleryPreviews.map((preview, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeNewGalleryImage(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {((property?.propertyImages?.length || 0) + newGalleryImages.length) < 10 && (
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-500">Select</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleNewGalleryImagesChange} className="hidden" />
                </label>
              )}
              {newGalleryImages.length > 0 && (
                <button type="button" onClick={handleUploadNewImages} disabled={isUploadingImages} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-70">
                  {isUploadingImages ? 'Uploading...' : 'Upload Selected'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

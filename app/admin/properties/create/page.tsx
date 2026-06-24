'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { handleApiError } from '@/lib/utils';
import { showSuccess, showError, showLoading, closeAlert } from '@/lib/alerts';
import { ArrowLeft, Upload, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function CreateProperty() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareArea: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    propertyType: 'HOUSE',
    listingType: 'FOR_SALE',
    agentName: '',
    agentTitle: '',
    agentPhoto: '',
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState('');

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');

  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAmenity = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && amenityInput.trim()) {
      e.preventDefault();
      if (!amenities.includes(amenityInput.trim())) {
        setAmenities([...amenities, amenityInput.trim()]);
      }
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter(a => a !== amenity));
  };

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      showError(`Invalid file type`, `"${file.name}" must be JPEG, PNG, or WEBP.`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      showError('File too large', `"${file.name}" exceeds the 5MB limit.`);
      return false;
    }
    return true;
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(validateFile);
      const newFiles = files.slice(0, 10 - galleryImages.length);
      setGalleryImages([...galleryImages, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    setGalleryImages(newImages);
    const newPreviews = [...galleryPreviews];
    newPreviews.splice(index, 1);
    setGalleryPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage) {
      await showError('Cover image required', 'Please upload a cover image before creating the listing.');
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    showLoading('Creating property…');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value.toString());
    });
    data.append('amenities', JSON.stringify(amenities));
    data.append('coverImage', coverImage);
    galleryImages.forEach(file => data.append('images', file));

    try {
      await api.post('/api/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      closeAlert();
      await showSuccess('Property created!', 'Your new listing is now live on the platform.');
      router.push('/admin/properties');
    } catch (err: any) {
      closeAlert();
      await showError('Failed to create property', handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Property</h1>
      </div>

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
                    <button type="button" onClick={() => removeAmenity(amenity)} className="text-gray-500 hover:text-red-500"><X className="w-3 h-3" /></button>
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

        {/* Media */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Media</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
            <div className="flex items-center gap-4">
              {coverPreview && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setCoverImage(null); setCoverPreview(''); }} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Upload Cover</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleCoverImageChange} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (Max 10)</label>
            <div className="flex flex-wrap gap-4">
              {galleryPreviews.map((preview, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {galleryImages.length < 10 && (
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-500">Add Images</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleGalleryImagesChange} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-70">
            {isLoading ? 'Creating...' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  );
}

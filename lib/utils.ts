export const formatCurrency = (amount: number | string) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const formatPropertyType = (type: string) => {
  const types: Record<string, string> = {
    HOUSE: 'House',
    VILLA: 'Villa',
    APARTMENT: 'Apartment',
    TOWNHOUSE: 'Townhouse',
  };
  return types[type] || type;
};

export const formatListingType = (type: string) => {
  const types: Record<string, string> = {
    FOR_SALE: 'For Sale',
    FOR_RENT: 'For Rent',
  };
  return types[type] || type;
};

export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'bg-emerald-100 text-emerald-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'SOLD': return 'bg-slate-100 text-slate-800';
    case 'RENTED': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatStatus = (status: string) => {
  const statuses: Record<string, string> = {
    ACTIVE: 'Active',
    PENDING: 'Pending',
    SOLD: 'Sold',
    RENTED: 'Rented',
  };
  return statuses[status] || status;
};

export const getInquiryStatusStyle = (status: string) => {
  switch (status) {
    case 'NEW': return 'bg-rose-100 text-rose-800';
    case 'CONTACTED': return 'bg-indigo-100 text-indigo-800';
    case 'CLOSED': return 'bg-slate-100 text-slate-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatInquiryStatus = (status: string) => {
  const statuses: Record<string, string> = {
    NEW: 'New',
    CONTACTED: 'Contacted',
    CLOSED: 'Closed',
  };
  return statuses[status] || status;
};

export const handleApiError = (error: any): string => {
  return error?.response?.data?.message || error?.message || 'An unexpected error occurred';
};

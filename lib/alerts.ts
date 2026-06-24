import Swal, { SweetAlertResult } from 'sweetalert2';

// ─── Base config shared across all alerts ───────────────────────────────────
const BASE = {
  customClass: {
    popup: '!font-sans !rounded-2xl !shadow-2xl',
    title: '!text-slate-900 !font-bold !text-xl',
    htmlContainer: '!text-slate-500 !text-sm',
    confirmButton:
      '!rounded-full !px-6 !py-2.5 !font-semibold !text-sm !transition-all !duration-200',
    cancelButton:
      '!rounded-full !px-6 !py-2.5 !font-semibold !text-sm !bg-slate-100 !text-slate-700 hover:!bg-slate-200 !border-0 !transition-all !duration-200',
    denyButton:
      '!rounded-full !px-6 !py-2.5 !font-semibold !text-sm !transition-all !duration-200',
  },
  buttonsStyling: false,
} as const;

// ─── Success (full modal, for significant actions) ──────────────────────────
export const showSuccess = (title: string, text?: string): Promise<SweetAlertResult> =>
  Swal.fire({
    ...BASE,
    icon: 'success',
    title,
    text,
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
    iconColor: '#22c55e',
  });

// ─── Error ──────────────────────────────────────────────────────────────────
export const showError = (title: string, text?: string): Promise<SweetAlertResult> =>
  Swal.fire({
    ...BASE,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0f172a',
    iconColor: '#ef4444',
  });

// ─── Loading (shown while async work is happening) ──────────────────────────
export const showLoading = (title = 'Please wait...'): void => {
  Swal.fire({
    ...BASE,
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => Swal.showLoading(),
  });
};

export const closeAlert = (): void => Swal.close();

// ─── Toast (lightweight, non-intrusive — for frequent low-stakes actions) ───
export const showToast = (
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info' = 'success',
  timer = 1800
): Promise<SweetAlertResult> =>
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    iconColor: icon === 'success' ? '#22c55e' : icon === 'error' ? '#ef4444' : undefined,
    customClass: {
      popup: '!font-sans !rounded-xl !shadow-lg !text-sm',
    },
  });

// ─── Confirm Delete ──────────────────────────────────────────────────────────
export const confirmDelete = async (itemName = 'this item'): Promise<boolean> => {
  const result = await Swal.fire({
    ...BASE,
    icon: 'warning',
    title: 'Are you sure?',
    html: `This will permanently delete <strong>${itemName}</strong>.<br/>This action cannot be undone.`,
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#dc2626',
    reverseButtons: true,
    iconColor: '#f59e0b',
    focusCancel: true,
  });
  return result.isConfirmed;
};

// ─── Confirm Action (generic) ────────────────────────────────────────────────
export const confirmAction = async (
  title: string,
  text: string,
  confirmText = 'Yes, continue'
): Promise<boolean> => {
  const result = await Swal.fire({
    ...BASE,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#0f172a',
    reverseButtons: true,
    iconColor: '#6366f1',
    focusCancel: true,
  });
  return result.isConfirmed;
};

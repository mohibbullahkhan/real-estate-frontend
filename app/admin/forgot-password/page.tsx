'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { handleApiError } from '@/lib/utils';
import { showSuccess, showError, showToast } from '@/lib/alerts';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const router = useRouter();

  const normalizedEmail = email.trim().toLowerCase();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRequesting) return;
    setIsRequesting(true);
    try {
      await api.post('/api/auth/forgot-password', { email: normalizedEmail });
      await showSuccess('Check your email', 'If this email exists, an OTP has been sent.');
      setStep(2);
    } catch (err: any) {
      if (err?.response?.status === 429) {
        await showError('Too many requests', 'Please wait before requesting another OTP.');
      } else {
        // Security: always show same message regardless of whether email exists
        await showSuccess('Check your email', 'If this email exists, an OTP has been sent.');
        setStep(2);
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    setIsVerifying(true);
    try {
      await api.post('/api/auth/verify-otp', { email: normalizedEmail, otp });
      await showToast('OTP verified successfully.', 'success');
      setStep(3);
    } catch (err: any) {
      const msg = handleApiError(err);
      if (msg.includes('No OTP request found')) {
        await showError('OTP expired', 'No OTP request found. Please request a new one.');
        setStep(1);
        setOtp('');
      } else if (err?.response?.status === 429 || msg.includes('Too many failed attempts')) {
        await showError('Too many attempts', 'Too many failed attempts. Please request a new OTP.');
        setStep(1);
        setOtp('');
      } else {
        await showError('Invalid OTP', msg || 'The code you entered is incorrect. Please check and try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      await showError('Passwords do not match', 'Your new password and confirmation password must match.');
      return;
    }
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      await showError('Weak password', 'Password must be at least 8 characters long and contain at least one number.');
      return;
    }
    if (isResetting) return;
    setIsResetting(true);
    try {
      await api.post('/api/auth/reset-password', { email: normalizedEmail, newPassword });
      await showSuccess('Password reset!', 'You can now log in with your new password.');
      router.push('/admin/login');
    } catch (err: any) {
      await showError('Reset failed', handleApiError(err) || 'Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 && 'Reset Password'}
            {step === 2 && 'Enter OTP'}
            {step === 3 && 'New Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 && 'Enter your email to receive a verification code.'}
            {step === 2 && `We sent a code to ${email}`}
            {step === 3 && 'Password must be at least 8 characters and contain a number.'}
          </p>
        </div>

        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleRequestOtp}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isRequesting || !email}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isRequesting ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength={6}
                  className="appearance-none tracking-widest text-center rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-lg"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={isVerifying || otp.length !== 6}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={isRequesting}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isResetting || !newPassword || !confirmPassword}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isResetting ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <Link href="/admin/login" className="font-medium text-gray-600 hover:text-black flex items-center gap-1">
              <span>&larr;</span> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

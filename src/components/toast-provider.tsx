"use client";

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => (
  <Toaster
    toastOptions={{
      duration: 5000
    }}
  />
)

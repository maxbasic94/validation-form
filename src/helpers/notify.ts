import { toast, ToastOptions } from 'react-toastify';

export const notify = (message: string, status: string, toastConfig: ToastOptions<{}>) => {
  if (status === 'error') {
    toast.error(message, toastConfig);
  }
  if (status === 'success') {
    toast.success(message, toastConfig);
  }
};

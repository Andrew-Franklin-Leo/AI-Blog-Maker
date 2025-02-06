export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const createToast = (
  message: string,
  type: Toast['type'] = 'info'
): Omit<Toast, 'id'> => ({
  message,
  type,
});
export interface NotificationProps {
  show: boolean;
  message: string;
  description?: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}
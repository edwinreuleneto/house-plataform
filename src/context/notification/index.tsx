//Dependencies
import { createContext, useContext, useState, type ReactNode } from 'react';

//Notification component
import Notification from '@/components/Notifications';

interface NotificationContextProps {
  showNotification: (message: string, type: 'success' | 'error' | 'info', description?: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info', description: '' });

  const showNotification = (message: string, type: 'success' | 'error' | 'info', description = '') => {
    setNotification({ show: true, message, type, description });
    setTimeout(() => {
      setNotification({ show: false, message, type, description, });
    }, 3000);
  };

  const handleClose = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        show={notification.show}
        message={notification.message}
        description={notification.description}
        type={notification.type as 'success' | 'error' | 'info'}
        onClose={handleClose}
      />
    </NotificationContext.Provider>
  );
};

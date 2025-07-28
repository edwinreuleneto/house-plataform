'use client';

//Dependencies
import { QueryClientProvider } from 'react-query';

//Context
import { queryClient } from '@/context/reactQuery';
import { AuthContextProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';

const TemplateRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )
}

export default TemplateRoot;
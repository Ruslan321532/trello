import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

import { ModalProvider } from '@/components/providers/modal';
import { QueryProvider } from '@/components/providers/query';
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster position="top-center" />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;

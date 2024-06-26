'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [query] = useState(() => new QueryClient());

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

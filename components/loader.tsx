'use client';
import React, { useEffect, useState } from 'react';

import ProvidersLoader from './providers/providers-loader';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-2 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <ProvidersLoader>{loading ? <Loader /> : children}</ProvidersLoader>;
};

export default Layout;

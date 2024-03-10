import React from 'react';

import { Navbar } from './_components/navbar';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Dashboardlayout;

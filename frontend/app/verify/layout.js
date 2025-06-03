import React, { Suspense } from 'react'

const Layout = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default Layout;


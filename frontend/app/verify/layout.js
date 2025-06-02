import React, { Suspense } from 'react'

export const Layout = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};



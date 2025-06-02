import React, { Suspense } from 'react'

export const Layout = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};



import React from 'react';
import HeaderNavbar from '../components/Navbar/index';
export default function Main({ children }) {
  return (
    <div className="main">
      <HeaderNavbar />

      {children}
    </div>
  );
}

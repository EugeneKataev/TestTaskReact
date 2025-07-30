'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <Link href="/" className="logo">
              <h1>Blog</h1>
            </Link>
            
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
              <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/post/create" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Create Post
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="main-container">
          {children}
        </div>
      </main>
      
    </div>
  );
}

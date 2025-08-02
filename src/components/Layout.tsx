'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <h1>Blog</h1>
            </Link>
            
            <button 
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <span className={`${styles.hamburger} ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
              <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/post/create" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                Create Post
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          {children}
        </div>
      </main>
      
    </div>
  );
}

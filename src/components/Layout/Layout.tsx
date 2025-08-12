'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutContainer,
  Header,
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  MobileMenuButton,
  Hamburger,
  Main,
  MainContainer,
} from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <LayoutContainer>
      <Header>
        <HeaderContainer>
          <HeaderContent>
            <Logo as={Link} href="/">
              <h1>Blog</h1>
            </Logo>
            
            <MobileMenuButton 
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Hamburger $isOpen={isMobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
              </Hamburger>
            </MobileMenuButton>

            <Nav $isOpen={isMobileMenuOpen}>
              <NavLink as={Link} href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink as={Link} href="/post/create" onClick={() => setIsMobileMenuOpen(false)}>
                Create Post
              </NavLink>
            </Nav>
          </HeaderContent>
        </HeaderContainer>
      </Header>
      
      <Main>
        <MainContainer>
          {children}
        </MainContainer>
      </Main>
    </LayoutContainer>
  );
}
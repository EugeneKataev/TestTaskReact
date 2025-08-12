import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { flexBetween, flexCenter, flexColumn, mediaQueries } from '../../styles/mixins';

interface HamburgerProps {
  $isOpen: boolean;
}

interface NavProps {
  $isOpen: boolean;
}

export const LayoutContainer = styled.div`
  min-height: 100vh;
  ${flexColumn}
`;

export const Header = styled.header`
  background-color: var(--background);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
`;

export const HeaderContainer = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;
`;

export const HeaderContent = styled.div`
  ${flexBetween}
  height: 4rem;
`;

export const Logo = styled.a`
  h1 {
    font-size: 1.5rem;
    font-weight: ${theme.fontWeight.bold};
    color: var(--primary-color);
  }

  &:hover h1 {
    color: var(--primary-hover);
  }
`;

export const Nav = styled.nav<NavProps>`
  display: flex;
  gap: 2rem;

  @media (max-width: 767px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--background);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 0;
    padding: 0;
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    z-index: ${theme.zIndex.dropdown};
  }
`;

export const NavLink = styled.a`
  font-weight: ${theme.fontWeight.medium};
  color: var(--text-secondary);
  padding: 0.5rem 0;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 767px) {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: block;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    font-weight: ${theme.fontWeight.medium};
    color: var(--text-primary);
    background-color: var(--background);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--background-secondary);
      color: var(--primary-color);
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none !important;
  ${flexCenter}
  flex-direction: column;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;

  @media (max-width: 767px) {
    display: flex !important;
  }
`;

export const Hamburger = styled.span<HamburgerProps>`
  display: flex;
  flex-direction: column;
  width: 1.5rem;
  height: 1.2rem;
  position: relative;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: var(--text-primary);
    transition: all 0.3s ease;
  }

  ${props => props.$isOpen && css`
    span:nth-child(1) {
      transform: rotate(45deg);
      background-color: ${theme.colors.danger};
      position: absolute;
      top: 50%;
      left: 0;
      transform-origin: center;
    }

    span:nth-child(2) {
      display: none;
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
      background-color: ${theme.colors.danger};
      position: absolute;
      top: 50%;
      left: 0;
      transform-origin: center;
    }
  `}
`;

export const Main = styled.main`
  flex: 1;
  padding: 2rem 0;

  ${mediaQueries.tablet} {
    padding: 1rem 0;
  }
`;

export const MainContainer = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;

  ${mediaQueries.tablet} {
    padding: 0 0.75rem;
  }

  ${mediaQueries.mobile} {
    padding: 0 0.5rem;
  }
`;
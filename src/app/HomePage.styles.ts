import styled from 'styled-components';
import { theme } from '../styles/theme';
import { buttonDanger, mediaQueries } from '../styles/mixins';

export const HomePage = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.backgroundSecondary};
`;

export const HomeHeader = styled.div`
  background-color: white;
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

  h1 {
    color: #212529;
    font-size: 2.5rem;
    font-weight: ${theme.fontWeight.bold};
    margin: 0 0 ${theme.spacing.lg} 0;
    line-height: 1.2;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.xl};
    margin: 0 0 ${theme.spacing['3xl']} 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }

  ${mediaQueries.largeDesktop} {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: ${theme.fontSize.lg};
    }
  }

  ${mediaQueries.tablet} {
    padding: ${theme.spacing['2xl']} ${theme.spacing.md};

    h1 {
      font-size: 1.8rem;
      margin-bottom: ${theme.spacing.md};
    }

    p {
      font-size: ${theme.fontSize.base};
      margin-bottom: ${theme.spacing['2xl']};
    }
  }

  ${mediaQueries.mobile} {
    padding: ${theme.spacing.xl} ${theme.spacing.sm};

    h1 {
      font-size: 1.6rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
`;

export const CreatePostButton = styled.a`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: white;
  text-decoration: none;
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.medium};

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }

  &:active {
    background-color: ${theme.colors.primaryHover};
  }

  ${mediaQueries.tablet} {
    padding: 10px ${theme.spacing.xl};
    font-size: ${theme.fontSize.base};
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing.xl};
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: ${theme.borderRadius.md};
  color: #721c24;
`;

export const RetryButton = styled.button`
  ${buttonDanger}
  margin-top: 10px;
`;
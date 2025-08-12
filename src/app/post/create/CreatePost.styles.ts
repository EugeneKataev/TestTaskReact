import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { flexBetween, flexCenter, mediaQueries } from '../../../styles/mixins';

export const CreatePostPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  ${mediaQueries.tablet} {
    padding: ${theme.spacing.lg};
  }

  @media (min-width: calc(${theme.breakpoints.md} + 1px)) and (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['2xl']};
  }

  ${mediaQueries.largeDesktop} {
    padding: ${theme.spacing['3xl']};
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};

  ${mediaQueries.tablet} {
    margin-bottom: ${theme.spacing['3xl']};
  }

  @media (min-width: calc(${theme.breakpoints.md} + 1px)) and (max-width: ${theme.breakpoints.lg}) {
    margin-bottom: 36px;
  }

  ${mediaQueries.largeDesktop} {
    margin-bottom: ${theme.spacing['5xl']};
  }
`;

export const PageTitle = styled.h1`
  font-size: ${theme.spacing['3xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing.md} 0;

  ${mediaQueries.tablet} {
    font-size: 28px;
  }

  @media (min-width: calc(${theme.breakpoints.md} + 1px)) and (max-width: ${theme.breakpoints.lg}) {
    font-size: 30px;
  }

  ${mediaQueries.largeDesktop} {
    font-size: 36px;
  }
`;

export const ErrorBanner = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  ${flexBetween}

  ${mediaQueries.tablet} {
    padding: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
  }
`;

export const ErrorText = styled.p`
  color: #721c24;
  margin: 0;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};

  ${mediaQueries.tablet} {
    font-size: 13px;
  }
`;

export const ErrorDismiss = styled.button`
  background: none;
  border: none;
  color: #721c24;
  font-size: ${theme.spacing.xl};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  padding: 0;
  width: ${theme.spacing['2xl']};
  height: ${theme.spacing['2xl']};
  ${flexCenter}
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(114, 28, 36, 0.1);
  }
`;
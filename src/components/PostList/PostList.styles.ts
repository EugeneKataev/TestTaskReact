import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { flexCenter, flexColumn, buttonPrimary, mediaQueries } from '../../styles/mixins';

interface PostListProps {
  $loading?: boolean;
  $hasError?: boolean;
}

export const PostListContainer = styled.div<PostListProps>`
  width: 100%;
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  opacity: ${props => props.$loading ? 0.6 : 1};

  ${mediaQueries.tablet} {
    padding: ${theme.spacing.md};
  }

  ${mediaQueries.mobile} {
    padding: ${theme.spacing.sm};
  }

  ${mediaQueries.largeDesktop} {
    padding: ${theme.spacing.lg};
  }
`;

export const LoadingState = styled.div`
  ${flexCenter}
  ${flexColumn}
  padding: 60px ${theme.spacing.xl};
  text-align: center;

  p {
    color: #5a6c7d;
    font-size: ${theme.fontSize.lg};
    margin: 0;
  }
`;

export const ErrorState = styled.div`
  ${flexCenter}
  ${flexColumn}
  padding: 60px ${theme.spacing.xl};
  text-align: center;
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};

  h3 {
    margin: 0 0 10px 0;
    font-size: ${theme.fontSize['2xl']};
    color: ${theme.colors.danger};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.base};
    margin: 0 0 ${theme.spacing.xl} 0;
  }
`;

export const EmptyState = styled.div`
  ${flexCenter}
  ${flexColumn}
  padding: 60px ${theme.spacing.xl};
  text-align: center;
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};

  h3 {
    margin: 0 0 10px 0;
    font-size: ${theme.fontSize['2xl']};
    color: #495057;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.base};
    margin: 0;
  }
`;

export const RetryButton = styled.button`
  ${buttonPrimary}
`;

export const PostListGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  grid-template-columns: repeat(3, 1fr);

  ${mediaQueries.largeDesktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.lg};
  }

  ${mediaQueries.tablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }

  ${mediaQueries.mobile} {
    gap: 10px;
  }
`;
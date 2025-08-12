import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { flexCenter, flexColumn, flexBetween, buttonPrimary, buttonSecondary, mediaQueries } from '../../../../styles/mixins';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  ${mediaQueries.tablet} {
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

  h2 {
    color: ${theme.colors.danger};
    margin: 0 0 10px 0;
    font-size: 1.5rem;
  }

  p {
    color: ${theme.colors.textSecondary};
    margin: 0 0 ${theme.spacing.xl} 0;
    font-size: ${theme.fontSize.base};
  }
`;

export const BackButton = styled.button`
  ${buttonPrimary}
`;

export const PageHeader = styled.div`
  ${flexBetween}
  margin-bottom: 30px;
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 2px solid ${theme.colors.border};

  h1 {
    color: ${theme.colors.textPrimary};
    font-size: 2rem;
    font-weight: ${theme.fontWeight.bold};
    margin: 0;
  }

  ${mediaQueries.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing['2xl']};

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const HeaderBackButton = styled.button`
  ${buttonSecondary}
  padding: 10px ${theme.spacing.lg};
  font-size: ${theme.fontSize.sm};

  ${mediaQueries.tablet} {
    align-self: flex-start;
  }
`;
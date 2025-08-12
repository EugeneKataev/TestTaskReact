import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { flexCenter, flexColumn, buttonPrimary } from '../../../styles/mixins';

export const PageContainer = styled.div`
  min-height: 80vh;
  padding: ${theme.spacing.xl} 0;
`;

export const LoadingState = styled.div`
  ${flexCenter}
  ${flexColumn}
  padding: 60px ${theme.spacing.xl};
  text-align: center;

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.lg};
    margin: 0;
  }
`;

export const ErrorState = styled.div`
  ${flexCenter}
  ${flexColumn}
  padding: 60px ${theme.spacing.xl};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    color: ${theme.colors.danger};
    font-size: ${theme.fontSize['2xl']};
    margin: 0 0 ${theme.spacing.lg} 0;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.base};
    margin: 0 0 ${theme.spacing.xl} 0;
    line-height: 1.5;
  }
`;

export const BackButton = styled.button`
  ${buttonPrimary}
  padding: ${theme.spacing.md} ${theme.spacing.xl};
`;

export const CommentsSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing['3xl']};
`;
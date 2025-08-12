import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { flexColumn, flexBetween, buttonBase, buttonSuccess, buttonDanger, mediaQueries } from '../../styles/mixins';

interface PostDetailProps {
  $loading?: boolean;
}

export const PostDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']};

  ${mediaQueries.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

export const PostDetail = styled.article<PostDetailProps>`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['3xl']};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.$loading ? 0.6 : 1};

  ${mediaQueries.tablet} {
    padding: ${theme.spacing.xl};
    border-radius: 0;
    box-shadow: none;
  }
`;

export const PostHeader = styled.header`
  margin-bottom: ${theme.spacing['2xl']};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 2px solid #f0f0f0;
`;

export const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing.lg} 0;
  line-height: 1.2;

  ${mediaQueries.tablet} {
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.md};
  }

  @media (min-width: calc(${theme.breakpoints.md} + 1px)) and (max-width: ${theme.breakpoints.lg}) {
    font-size: 2.2rem;
  }
`;

export const PostMeta = styled.div`
  ${flexColumn}
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.sm};

  ${mediaQueries.tablet} {
    font-size: 13px;
  }

  ${mediaQueries.largeDesktop} {
    flex-direction: row;
    gap: ${theme.spacing.lg};

    span:not(:last-child)::after {
      content: '•';
      margin-left: ${theme.spacing.lg};
      color: #ccc;
    }
  }
`;

export const PostAuthor = styled.span`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
`;

export const PostDate = styled.span`
  font-style: italic;
`;

export const PostUpdated = styled.span`
  font-style: italic;
`;

export const PostActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['2xl']};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};

  ${mediaQueries.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }

  ${mediaQueries.largeDesktop} {
    justify-content: flex-start;
  }
`;

export const ActionButton = styled.button`
  ${buttonBase}
  padding: 10px ${theme.spacing.xl};
  font-weight: ${theme.fontWeight.semibold};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${mediaQueries.tablet} {
    width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
  }
`;

export const EditButton = styled(ActionButton)`
  ${buttonSuccess}
`;

export const DeleteButton = styled(ActionButton)`
  ${buttonDanger}
`;

export const PostContent = styled.div`
  margin-bottom: ${theme.spacing['4xl']};
`;

export const ContentText = styled.div`
  font-size: ${theme.fontSize.base};
  line-height: 1.7;
  color: ${theme.colors.textPrimary};

  ${mediaQueries.tablet} {
    font-size: 15px;
  }
`;

export const ContentParagraph = styled.p`
  margin: 0 0 ${theme.spacing.lg} 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentsSection = styled.section`
  border-top: 2px solid #f0f0f0;
  padding-top: ${theme.spacing['3xl']};
`;

export const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing['2xl']} 0;

  ${mediaQueries.tablet} {
    font-size: ${theme.fontSize['2xl']};
  }
`;

export const NoComments = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  font-style: italic;
`;

export const CommentsList = styled.div`
  ${flexColumn}
  gap: ${theme.spacing.xl};
`;

export const CommentItem = styled.div`
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  border-left: 4px solid ${theme.colors.primary};
`;

export const CommentHeader = styled.div`
  ${flexBetween}
  margin-bottom: ${theme.spacing.sm};

  ${mediaQueries.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }

  ${mediaQueries.largeDesktop} {
    align-items: center;
  }
`;

export const CommentAuthor = styled.span`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};

  ${mediaQueries.tablet} {
    font-size: 13px;
  }
`;

export const CommentDate = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textSecondary};
  font-style: italic;

  ${mediaQueries.tablet} {
    font-size: 11px;
  }
`;

export const CommentText = styled.div`
  color: ${theme.colors.textPrimary};
  line-height: 1.5;
  font-size: ${theme.fontSize.sm};

  ${mediaQueries.tablet} {
    font-size: 13px;
  }
`;

// Print styles
export const PrintHidden = styled.div`
  @media print {
    display: none;
  }
`;
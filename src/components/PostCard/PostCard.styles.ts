import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { cardHover, buttonBase, buttonPrimary, buttonDanger } from '../../styles/mixins';

interface PostCardProps {
  $loading?: boolean;
}

interface ButtonProps {
  $loading?: boolean;
}

export const PostCardContainer = styled.article<PostCardProps>`
  ${cardHover}
  margin-bottom: ${theme.spacing.lg};
  opacity: ${props => props.$loading ? 0.6 : 1};
  pointer-events: ${props => props.$loading ? 'none' : 'auto'};
`;

export const PostCardContent = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const PostCardTitle = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const PostCardExcerpt = styled.p`
  color: ${theme.colors.textSecondary};
  margin: 0 0 ${theme.spacing.md} 0;
`;

export const PostCardMeta = styled.div`
  font-size: ${theme.fontSize.sm};
  color: #888;
`;

export const PostCardAuthor = styled.span`
  font-weight: ${theme.fontWeight.medium};
`;

export const PostCardDate = styled.div`
  margin-top: ${theme.spacing.xs};
`;

export const PostCardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const PostCardButton = styled.button<ButtonProps>`
  ${buttonBase}
  font-size: ${theme.fontSize.sm};
  flex: 1;
  
  ${props => props.$loading && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

export const EditButton = styled(PostCardButton)`
  ${buttonPrimary}
`;

export const DeleteButton = styled(PostCardButton)`
  ${buttonDanger}
`;
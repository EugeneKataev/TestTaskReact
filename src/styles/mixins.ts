import { css } from 'styled-components';
import { theme } from './theme';

export const mediaQueries = {
  mobile: `@media (max-width: ${theme.breakpoints.sm})`,
  tablet: `@media (max-width: ${theme.breakpoints.md})`,
  desktop: `@media (min-width: calc(${theme.breakpoints.md} + 1px))`,
  largeDesktop: `@media (min-width: calc(${theme.breakpoints.lg} + 1px))`,
};

export const buttonBase = css`
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-family: inherit;
  font-weight: ${theme.fontWeight.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  transition: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const buttonPrimary = css`
  ${buttonBase}
  background-color: ${theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primaryHover};
  }
`;

export const buttonSuccess = css`
  ${buttonBase}
  background-color: ${theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.successHover};
  }
`;

export const buttonDanger = css`
  ${buttonBase}
  background-color: ${theme.colors.danger};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.dangerHover};
  }
`;

export const buttonSecondary = css`
  ${buttonBase}
  background-color: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background-color: #5a6268;
  }
`;

export const formInput = css`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.sm};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const card = css`
  background: white;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.lg};
`;

export const cardHover = css`
  ${card}
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const textTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
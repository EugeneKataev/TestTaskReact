import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { flexCenter, buttonBase, buttonSecondary, buttonDanger } from '../../styles/mixins';

interface DialogProps {
  $loading?: boolean;
}

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.xl};
`;

export const DialogContent = styled.div<DialogProps>`
  background: white;
  border-radius: ${theme.borderRadius.sm};
  max-width: 400px;
  width: 100%;
  opacity: ${props => props.$loading ? 0.8 : 1};
`;

export const DialogHeader = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg};
  border-bottom: 1px solid #eee;
`;

export const DialogTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const DialogBody = styled.div`
  padding: ${theme.spacing.lg};
`;

export const DialogMessage = styled.p`
  margin: 0;
  color: ${theme.colors.textSecondary};
`;

export const DialogActions = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg};
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
`;

export const DialogButton = styled.button`
  ${buttonBase}
`;

export const CancelButton = styled(DialogButton)`
  ${buttonSecondary}
`;

export const ConfirmButton = styled(DialogButton)`
  ${buttonDanger}
`;
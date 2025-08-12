import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { card, formInput, buttonSuccess } from '../../styles/mixins';

interface FormInputProps {
  $hasError?: boolean;
}

interface FormProps {
  $loading?: boolean;
}

export const CommentFormContainer = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.border};
`;

export const FormTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const CommentForm = styled.form<FormProps>`
  ${card}
  opacity: ${props => props.$loading ? 0.6 : 1};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSize.sm};
`;

export const FormInput = styled.input<FormInputProps>`
  ${formInput}
  
  ${props => props.$hasError && css`
    border-color: ${theme.colors.danger};
  `}
`;

export const FormTextarea = styled.textarea<FormInputProps>`
  ${formInput}
  resize: vertical;
  min-height: 80px;
  
  ${props => props.$hasError && css`
    border-color: ${theme.colors.danger};
  `}
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSize.xs};
  margin-top: ${theme.spacing.xs};
`;

export const GeneralError = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: #721c24;
`;

export const FormActions = styled.div`
  margin-top: ${theme.spacing.lg};
`;

export const SubmitButton = styled.button`
  ${buttonSuccess}
`;
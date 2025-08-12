import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { card, formInput, buttonPrimary } from '../../styles/mixins';

interface FormInputProps {
  $hasError?: boolean;
}

interface FormProps {
  $loading?: boolean;
}

export const PostFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

export const PostForm = styled.form<FormProps>`
  ${card}
  padding: ${theme.spacing['2xl']};
  opacity: ${props => props.$loading ? 0.6 : 1};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
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
  min-height: 100px;
  
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
  margin-bottom: ${theme.spacing.lg};
  color: #721c24;
`;

export const FormActions = styled.div`
  margin-top: ${theme.spacing.xl};
`;

export const SubmitButton = styled.button`
  ${buttonPrimary}
  padding: 10px ${theme.spacing.xl};
`;
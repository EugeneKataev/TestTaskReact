'use client';

import React from 'react';
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogMessage,
  DialogActions,
  CancelButton,
  ConfirmButton,
} from './ConfirmDialog.styles';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  hasError?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  hasError = false
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  return (
    <DialogOverlay onClick={handleOverlayClick}>
      <DialogContent $loading={loading}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          <DialogMessage>{message}</DialogMessage>
        </DialogBody>
        
        <DialogActions>
          <CancelButton
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </CancelButton>
          <ConfirmButton
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : confirmText}
          </ConfirmButton>
        </DialogActions>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ConfirmDialog;
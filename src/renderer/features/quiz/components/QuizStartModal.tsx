import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface Props {
  visible: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
}

export const QuizStartModal = ({ visible, onAccept, onCancel }: Props) => {
  return (
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle>{'Сіз сұрақ-жауап ойынын бастағыңыз келе ме?'}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Жоқ</Button>
        <Button onClick={onAccept} autoFocus>
          Иә
        </Button>
      </DialogActions>
    </Dialog>
  );
};

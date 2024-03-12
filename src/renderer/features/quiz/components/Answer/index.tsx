import React from 'react';
import './styles.css';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import classNames from 'classnames';
import { useTheme } from '@mui/material';

interface Props {
  id: string;
  title: string;
  type?: string;
  onSelect: (answerId: string) => void;
  disabled?: boolean;
}

export const Answer = ({ id, title, type, onSelect, disabled }: Props) => {
  const { palette } = useTheme();
  return (
    <button
      className={classNames('answer', type)}
      onClick={() => onSelect(id)}
      disabled={disabled}
    >
      {title}
      {type === 'correct' ? (
        <CheckCircleRoundedIcon htmlColor="white" sx={{ fontSize: 42 }} />
      ) : type === 'selected' ? (
        <CheckCircleRoundedIcon htmlColor="green" sx={{ fontSize: 42 }} />
      ) : type === 'wrong' ? (
        <CancelRoundedIcon htmlColor="white" sx={{ fontSize: 42 }} />
      ) : (
        <RadioButtonUncheckedRoundedIcon
          htmlColor={palette.grey[300]}
          sx={{ fontSize: 42 }}
        />
      )}
    </button>
  );
};

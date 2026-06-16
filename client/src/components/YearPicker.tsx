import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';

interface YearPickerProps {
  value?: number;
  onChange?: (year: number) => void;
  disableFuture?: boolean;
}

export const YearPicker = ({
  value = new Date().getFullYear(),
  onChange,
  disableFuture,
}: YearPickerProps) => {
  return (
    <div className="year-picker">
      <IconButton onClick={() => onChange?.(value - 1)}>
        <ArrowBack
          style={{ color: 'white' }}
          fontSize={'small'}
          color="primary"
        />
      </IconButton>
      <div> {value} </div>
      <IconButton
        disabled={disableFuture && value >= new Date().getFullYear()}
        onClick={() => onChange?.(value + 1)}
      >
        <ArrowForward style={{ color: 'white' }} fontSize={'small'} />
      </IconButton>
    </div>
  );
};

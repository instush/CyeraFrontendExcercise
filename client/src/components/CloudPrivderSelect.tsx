import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Option {
  displayName: string;
  value: string;
}

interface SelectProps {
  options?: Option[];
  onChange?: (values: string[]) => void;
  selectedOptions?: string[];
}

export const CloudPrivderSelect = ({
  options = [],
  onChange,
  selectedOptions = [],
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange?.(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div className={'select'}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">
          <div style={{ color: 'white' }}> Cloud Providers </div>
        </InputLabel>
        <Select
          style={{ color: 'white' }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

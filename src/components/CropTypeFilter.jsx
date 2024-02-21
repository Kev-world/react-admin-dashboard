import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function CropTypeFilter({ changeCropType }) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    changeCropType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Crop Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'rice'}>{t('rice')}</MenuItem>
          <MenuItem value={'corn'}>{t('corn')}</MenuItem>
          <MenuItem value={'bean'}>{t('bean')}</MenuItem>
          <MenuItem value={'potato'}>{t('potato')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
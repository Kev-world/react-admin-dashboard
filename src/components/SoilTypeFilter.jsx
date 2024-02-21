import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function SoilTypeFilter({ changeSoilType }) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    changeSoilType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Soil Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'bsc'}>{t('bsc')}</MenuItem>
          <MenuItem value={'nfs'}>{t('nfs')}</MenuItem>
          <MenuItem value={'sand'}>{t('Sand')}</MenuItem>
          <MenuItem value={'gravel'}>{t('gravel')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
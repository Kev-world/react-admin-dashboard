import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function EquipmentFilter({ changeEquipType }) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    changeEquipType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Equipment Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'NO_TILL_PLANTER'}>{t('NO_TILL_PLANTER')}</MenuItem>
          <MenuItem value={'LAND_LEVELER'}>{t('LAND_LEVELER')}</MenuItem>
          <MenuItem value={'SOIL_RIDGING_EQUIPMENT'}>{t('SOIL_RIDGING_EQUIPMENT')}</MenuItem>
          <MenuItem value={'CASSAVA_ROOT_HARVESTER'}>{t('CASSAVA_ROOT_HARVESTER')}</MenuItem>
          <MenuItem value={'DISC_PLOUGH_3'}>{t('DISC_PLOUGH_3')}</MenuItem>
          <MenuItem value={'DISC_PLOUGH_6'}>{t('DISC_PLOUGH_6')}</MenuItem>
          <MenuItem value={'ROTAVATOR_DRIED'}>{t('ROTAVATOR_DRIED')}</MenuItem>
          <MenuItem value={'ROTAVATOR_WET'}>{t('ROTAVATOR_WET')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
import AdminService from '../../Services/AdminService';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

const UserDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  const handleEdit = () => {
    console.log('edut', data)
    navigate(`/editUserProfile/${data.id}`, { state: data });
  };

  const getUser = async () => {
    try {
        const data = await AdminService.get(`/user/${userId}`);
        if (data) {
            setData(data.data);
        }
    }
    catch (e) {
        console.error(e);
    }
  }
useEffect(() => {
    getUser();
}, [])

  return (
    <>
    {data && (
      <Stack direction={'column'}>
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">User Details</Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">User ID:</Typography>
          <Typography>{data.id}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Service Type:</Typography>
          <Chip label={t(`${data.serviceType}`)} color={data.serviceType === 'admin' ? 'warning' : data.serviceType === 'farmer'? 'succes' : 'warning'} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">User Phone Number:</Typography>
          <Typography>(+855) {data.phoneNumber}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Username:</Typography>
          <Typography>{data.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Gender:</Typography>
          <Chip label={t(`${data.gender}`)} color={data.gender === 'male' ? 'info' : 'error'} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Farm Address:</Typography>
          <Typography>{data.farmAddress}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Service Options:</Typography>
          {data.serviceProviderOptions.map((sp) => 
            <Chip label={t(`${sp}`)} color='success'/>
          )}
        </Stack>
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
      </Stack>
    </Paper>
  </Stack>
    )}
    </>
  );
};

export default UserDetails;

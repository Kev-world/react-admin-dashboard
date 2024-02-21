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

const BookingDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [accUser, setAccUser] = useState(null);
  const [cusUser, setCusUser] = useState(null);
  const { t } = useTranslation();
  const [serviceType, setServiceType] = useState('');

  const handleEdit = () => {
    console.log('edut', data)
    navigate(`/editBooking/${data.id}`, { state: data });
  };

  const handleUserEdit = () => {
    console.log('hi')
  }


  const getBooking = async () => {
    try {
        const data = await AdminService.get(`/booking/${bookingId}`);
        if (data) {
            setData(data.data);
            if (data.data.acceptanceID !== '') {
              try {
                const au = await AdminService.get(`/user/${data.data.acceptanceID}`)
                const cu = await AdminService.get(`/user/${data.data.customerId}`)
                if (au) {
                  setAccUser(au.data);
                }
                if (cu) {
                  setCusUser(cu.data);
                }
              }
              catch (e) {
                console.error(e);
              }
            }
        }
    }
    catch (e) {
        console.error(e);
    }
  }
useEffect(() => {
    getBooking();
}, [])

  return (
    <>
    {data && (
      <Stack direction={'column'}>
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Booking Details</Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Booking ID:</Typography>
          <Typography>{data.id}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Customer Phone Number:</Typography>
          <Typography>(+855) {data.customerPhoneNumber}</Typography>
        </Stack>
        {/* Repeat the structure for other details */}
        {/* Example for Booking Confirmed with Chip */}
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Booking Confirmed:</Typography>
          {data.bookingConfirmed ? (
            <Chip label="True" color="primary" />
          ) : (
            <Chip label="False" color="warning" />
          )}
        </Stack>
        {/* Continue for other details */}
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Farm Address:</Typography>
          <Typography>{data.farmAddress}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Preferred Date:</Typography>
          <Typography>{data.preferredDate}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Number of Hectare:</Typography>
          <Typography>{data.numberOfHectare} Hectare</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Estimated Cost:</Typography>
          <Typography>{data.estimatedCost} KHR</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Service Type:</Typography>
          <Typography>{t(`${data.serviceType}`)}</Typography>
        </Stack>
        {/* Example for conditional rendering of the Edit button */}
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
      </Stack>
    </Paper>

    <Stack direction={'row'}>
    {cusUser && (<Paper elevation={3} sx={{ p: 2, m: 2 }}>
    <Stack spacing={2}>
      <Typography variant="h5">Customer Details</Typography>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">ID:</Typography>
        <Typography>{data.customerId}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Name:</Typography>
        <Typography>{cusUser.name}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Phone Number:</Typography>
        <Typography>(+855) {cusUser.phoneNumber}</Typography>
      </Stack>
      {/* Repeat the structure for other details */}
      {/* Example for Booking Confirmed with Chip */}
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Farm Address:</Typography>
        <Typography>{cusUser.farmAddress}</Typography>
      </Stack>
      {/* Example for conditional rendering of the Edit button */}
        <Button variant="contained" onClick={handleUserEdit}>Edit</Button>
    </Stack>
  </Paper>)}

  {accUser && (<Paper elevation={3} sx={{ p: 2, m: 2 }}>
    <Stack spacing={2}>
      <Typography variant="h5">Acceptance Details</Typography>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">ID:</Typography>
        <Typography>{data.acceptanceID}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Name:</Typography>
        <Typography>{accUser.name}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Phone Number:</Typography>
        <Typography>(+855) {accUser.phoneNumber}</Typography>
      </Stack>
      {/* Repeat the structure for other details */}
      {/* Example for Booking Confirmed with Chip */}
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Farm Address:</Typography>
        <Typography>{accUser.farmAddress}</Typography>
      </Stack>
      {/* Example for conditional rendering of the Edit button */}
        <Button variant="contained" onClick={handleUserEdit}>Edit</Button>
    </Stack>
  </Paper>)}
  </Stack>
          
  </Stack>
    )}
    </>
  );
};

export default BookingDetails;

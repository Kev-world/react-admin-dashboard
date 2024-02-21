import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
  Box,
  Typography,
  Modal
} from "@mui/material";
import GoogleMaps from "../../components/GoogleMap";
import GetAddress from "../../Utilities/CustomFunctions/geoCode";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../../Utilities/LocalStorage";
import { decodeToken } from "../../Utilities/JsonDecode";
import AdminService from "../../Services/AdminService";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

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

export default function EditUserProfile() {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const [name, setName] = useState(userData.name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [serviceType, setServiceType] = useState(userData.serviceType);
  const [gender, setGender] = useState(userData.gender);
  const [serviceProviderOptions, setServiceProviderOptions] = useState(userData.serviceProviderOptions);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      farmAddress: userData.farmAddress,
      coordinates: userData.coordinates,
      serviceType: userData.serviceType,
      serviceProviderOptions: userData.serviceProviderOptions,
      name: userData.name,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber
    },
  });

  const spos = [
    "LAND_LEVELER",
    "DISC_PLOUGH_6",
    "DISC_PLOUGH_3",
    "CASSAVA_ROOT_HARVESTER",
    "ROTAVATOR_DRIED",
    "NO_TILL_PLANTER",
    "SOIL_RIDGING_EQUIPMENT",
    "ROTAVATOR_WET"
];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [userLocation, setUserLocation] = useState({
    lat: 11.5642373,
    lng: 104.9111526,
  });

  const genders = ['male', 'female']

  useEffect(() => {
    Object.keys(userData).forEach((key) => {
      setValue(key, userData[key]);
    });
  }, [userData, setValue]);

  async function onSubmit(values) {
    const token = getToken();
    const userId = decodeToken(token);

    const { id, ...restOfUserData } = userData;
    const updateData = {
      ...restOfUserData,
      ...values,
    };
    try {
        await AdminService.patch(
          `/user/${userData.id}`,
          updateData
        );
        handleClose();
        navigate(-1);
    } catch (e) {
      console.log(e);
      navigate(-1);
    }
  }

  const handleModalSubmit = () => {
    handleSubmit(onSubmit)();
    handleClose();
  }

  const handleMarkerPositionChange = async (newPosition) => {
    setValue("coordinates", { lat: newPosition.lat, lng: newPosition.lng });
    const address = await GetAddress(newPosition.lat, newPosition.lng);
    setValue("farmAddress", address);
  };

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handlephoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleGender = (event) => {
    setGender(event.target.value)
  }

  const handleChangeSPO = (event) => {
    const {
      target: { value },
    } = event;
    // Set the serviceProviderOptions field
    setValue("serviceProviderOptions", 
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setServiceProviderOptions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }


  return (
    <Box m="20px">
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth error={errors.name} margin='normal'>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          placeholder="Username"
          value={name}
          {...register("name", {
            required: "This is required",
          })}
          onChange={handleName}
        />
        <FormHelperText>
          {errors.name && errors.name.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth error={errors.farmAddress} margin='normal'>
        <InputLabel htmlFor="farmAddress">Farm Address</InputLabel>
        <Input
          id="farmAddress"
          placeholder="Farm Address"
          {...register("farmAddress", {
            required: "This is required",
          })}
        />
        <FormHelperText>
          {errors.farmAddress && errors.farmAddress.message}
        </FormHelperText>
      </FormControl>
      <GoogleMaps
        center={userLocation}
        setUserLocation={handleMarkerPositionChange}
      />
      <FormControl fullWidth error={errors.phoneNumber} margin='normal'>
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input
          id="phoneNumber"
          placeholder="UserphoneNumber"
          value={phoneNumber}
          {...register("phoneNumber", {
            required: "This is required",
          })}
          onChange={handlephoneNumber}
        />
        <FormHelperText>
          {errors.phoneNumber && errors.phoneNumber.message}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Service Options</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={serviceProviderOptions}
          onChange={handleChangeSPO}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {spos.map((spo) => (
            <MenuItem
              key={spo}
              value={spo}
            >
              {spo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth error={errors.gender} margin='normal'>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          {...register("gender", {
            required: "This is required",
          })}
        onChange={handleGender}
        >
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {t(gender)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.cropType && errors.cropType.message}
        </FormHelperText>
      </FormControl>
      <Button
        mt={4}
        variant="contained"
        color="info"
        type="button"
        // disabled={isSubmitting}
        onClick={handleOpen}
        
        // type="submit"
        margin='normal'
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Booking Confirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                Are you sure you want to update this booking?
            </Typography>
            <Button
                mt={4}
                variant="contained"
                color="info"
                onClick={handleModalSubmit}
                margin='normal'
                fullWidth
            >
                Update!
            </Button>
        </Box>
        </Modal>
    </form>
    </Box>
  );
}

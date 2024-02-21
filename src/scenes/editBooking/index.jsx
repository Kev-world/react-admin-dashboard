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
  Slider,
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

export default function EditBooking() {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  const [costPerHectare, setCostPerHectare] = useState(0);
  const [serviceType, setServiceType] = useState(bookingData.serviceType);
  const [soilType, setSoilType] = useState(bookingData.soilType)
  const [cropType, setCropType] = useState(bookingData.cropType)
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
      farmAddress: bookingData.farmAddress,
      coordinates: bookingData.coordinates,
      preferredDate: bookingData.preferredDate,
      serviceType: bookingData.serviceType,
      cropType: bookingData.cropType,
      soilType: bookingData.soilType,
      numberOfHectare: bookingData.numberOfHectare,
      setPricing: bookingData.setPricing,
      estimatedCost: bookingData.estimatedCost,
    },
  });

  const soils = ["bsc", "nfs", "sand", "gravel"]
  const crops = ["rice", "corn", "bean", "potato"]

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

  const costRateConfig = {
    NO_TILL_PLANTER: {
      min: 140000,
      max: 160000,
    },
    LAND_LEVELER: {
      min: 140000,
      max: 150000,
    },
    SOIL_RIDGING_EQUIPMENT: {
      min: 180000,
      max: 220000,
    },
    CASSAVA_ROOT_HARVESTER: {
      min: 180000,
      max: 220000,
    },
    DISC_PLOUGH_6: {
      min: 120000,
      max: 160000,
    },
    DISC_PLOUGH_3: {
      min: 320000,
      max: 340000,
    },
    ROTAVATOR_DRIED: {
      min: 180000,
      max: 190000,
    },
    ROTAVATOR_WET: {
      min: 120000,
      max: 140000,
    },
  };

  const [userLocation, setUserLocation] = useState({
    lat: 11.5642373,
    lng: 104.9111526,
  });

  const validUser = () => {
    const token = getToken();
    const id = decodeToken(token);
    if (id !== bookingData.customerId) {
      navigate("/login");
    }
  };

  useEffect(() => {
    Object.keys(bookingData).forEach((key) => {
      setValue(key, bookingData[key]);
    });
    setCostPerHectare(bookingData.setPricing);
  }, [bookingData, setValue]);

  async function onSubmit(values) {
    const token = getToken();
    const userId = decodeToken(token);

    const { id, ...restOfBookingData } = bookingData;
    const updateData = {
      ...restOfBookingData,
      ...values,
      numberOfHectare: Number(values.numberOfHectare) || 0
    };
    try {
        await AdminService.patch(
          `/editBooking/${bookingData.id}`,
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

  const handleChangeEquipmentPrice = (event) => {
    const equ = event.target.value;
    console.log('ueiwiorue', typeof(equ))
    setServiceType(equ)
    setValue('serviceType', equ)
    setCostPerHectare(costRateConfig[equ].min);
    setValue("setPricing", costRateConfig[equ].min);
  };

  const handleCrop = (event) => {
    setCropType(event.target.value)
  }

  const handleSoil = (event) => {
    setSoilType(event.target.value)
  }

  const calculateEstimatedCost = () => {
    const estimatedCost = costPerHectare * getValues().numberOfHectare;
    setValue("estimatedCost", estimatedCost);
  };

  return (
    <Box m="20px">
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <FormControl fullWidth error={errors.preferredDate} margin='normal'>
        <InputLabel htmlFor="preferredDate">Preferred Date</InputLabel>
        <Input
          id="preferredDate"
          type="date"
          placeholder="preferredDate"
          {...register("preferredDate", {
            required: "This is required",
          })}
        />
        <FormHelperText>
          {errors.preferredDate && errors.preferredDate.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth error={errors.serviceType} margin='normal'>
        <InputLabel id="serviceType-label">Equipment Type</InputLabel>
        <Select
          labelId="serviceType-label"
          id="serviceType"
          value={serviceType}
          {...register("serviceType", {
            required: "This is required",
          })}
          onChange={handleChangeEquipmentPrice}
          onBlur={calculateEstimatedCost}
        >
          {Object.keys(costRateConfig).map((equ) => (
            <MenuItem key={equ} value={equ}>
              {t(equ)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.serviceType && errors.serviceType.message}
        </FormHelperText>
      </FormControl>
      <div className="m-3" >
        <Typography>{costPerHectare} KHR</Typography>
        <Slider
          color="success"
          defaultValue={costPerHectare}
          min={costRateConfig[serviceType].min}
          max={costRateConfig[serviceType].max}
          step={10000}
          onChange={(event, value) => {
            setCostPerHectare(value);
            setValue("setPricing", value);
          }}
          onBlur={calculateEstimatedCost}
          valueLabelDisplay="auto"
        />
      </div>
      <FormControl fullWidth error={errors.cropType} margin='normal'>
        <InputLabel id="cropType-label">Crop Type</InputLabel>
        <Select
          labelId="cropType-label"
          id="cropType"
          value={cropType}
          {...register("cropType", {
            required: "This is required",
          })}
        onChange={handleCrop}
        >
          {crops.map((crop) => (
            <MenuItem key={crop} value={crop}>
              {t(crop)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.cropType && errors.cropType.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth error={errors.soilType} margin='normal'>
        <InputLabel id="soilType-label">Soil Type</InputLabel>
        <Select
          labelId="soilType-label"
          id="soilType"
          value={soilType}
          {...register("soilType", {
            required: "This is required",
          })}
        onChange={handleSoil}
        >
          {soils.map((soil) => (
            <MenuItem key={soil} value={soil}>
              {t(soil)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.soilType && errors.soilType.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth error={errors.numberOfHectare} margin='normal'>
        <InputLabel htmlFor="numberOfHectare">Number of Hectare</InputLabel>
        <Input
          id="numberOfHectare"
          type="number"
          placeholder="numberOfHectare"
          {...register("numberOfHectare", {
            required: "This is required",
          })}
          onBlur={calculateEstimatedCost}
        />
        <FormHelperText>
          {errors.numberOfHectare && errors.numberOfHectare.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth error={errors.estimatedCost} margin='normal'>
        <InputLabel htmlFor="estimatedCost">Estimated Cost</InputLabel>
        <Input
          id="estimatedCost"
          placeholder="estimatedCost"
          disabled
          {...register("estimatedCost")}
        />
        <FormHelperText>
          {errors.estimatedCost && errors.estimatedCost.message}
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

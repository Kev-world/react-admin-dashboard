// import { Box, Typography, useTheme, Button, Container } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import { useEffect, useState } from "react";
// import AdminService from "../../Services/AdminService";
// import EquipmentFilter from "../../components/EquipmentFilter";
// import CropTypeFilter from "../../components/CropTypeFilter";
// import SoilTypeFilter from "../../components/SoilTypeFilter";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";



// const Booking = () => {
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const colors = tokens(theme.palette.mode);
//   const [booking, setBooking] = useState(null);
//   const [filter, setFilter] = useState({
//     serviceType: '',
//     cropType: '',
//     soilType: '',
//   })

//   const getBookings = async () => {
//     const data = await AdminService.get('/booking');
//     console.log(data)
//     if (data) {
//       console.log(data)
//       setBooking(data.data);
//     }
//   }

//   const handleEvent = (params) => {
//     navigate(`/bookingDetails/${params.row.id}`)
//   }

//   const handleEquipmentChange = (value) => {
//     filter.serviceType = value;
//   };

//   const handleCropChange = (value) => {
//     filter.cropType = value;
//   }

//   const handleSoilChange = (value) => {
//     filter.soilType = value;
//   }

//   const handleSubmit = () => {
//     console.log('formData', filter)
//   };

//   const columns = [
//     { 
//       field: "id", 
//       headerName: "ID",
//       cellClassName: "name-column--cell", 
//     },
//     {
//       field: "customerId",
//       headerName: "Customer ID",
//       flex: 1,
//     },
//     {
//       field: "customerPhoneNumber",
//       headerName: "Customer Phone Number",
//       flex: 1,
//     },
//     {
//       field: "acceptanceID",
//       headerName: "Acceptance ID",
//       flex: 1,
//     },
//     {
//       field: "bookingConfirmed",
//       headerName: "Booking Confirmed",
//       flex: 1,
//     },
//     {
//       field: "preferredDate",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "numberOfHectare",
//       headerName: "Number of Hectare",
//       flex: 1,
//     },
//     {
//       field: "estimatedCost",
//       headerName: "Estimated Cost",
//       flex: 1,
//     },
//     {
//       field: "serviceType",
//       headerName: "Service Type",
//       flex: 1,
//       renderCell: ({ row: { serviceType } }) => {
//         return (
//           <Box
//             width="60%"
//             m="0 auto"
//             p="5px"
//             display="flex"
//             justifyContent="center"
//             backgroundColor={colors.greenAccent[600]}
//             borderRadius="4px"
//           >
//             <Typography color={colors.grey[100]} sx={{ ml: "5px" }} fontSize='sm'>
//               {t(`${serviceType}`)}
//             </Typography>
//           </Box>
//         );
//       },
//     },
//   ];

//   useEffect(() => {
//     getBookings();
//   }, [])

//   return (
//     <>
//     <Container>
//         <EquipmentFilter changeEquipType={handleEquipmentChange} />
//         <CropTypeFilter changeCropType={handleCropChange} />
//         <SoilTypeFilter changeSoilType={handleSoilChange} />
//         <Button sx={{ ml: 1 }} onClick={handleSubmit} variant="contained">
//             Submit
//         </Button>
//     </Container>
//     {booking && (<Box m="20px">
//       <Header title="BOOKING" subtitle="Managing the Bookings" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid checkboxSelection rows={booking} columns={columns} onRowClick={handleEvent} />
//       </Box>
//     </Box>)}</>
//   );
// };

// export default Booking;

import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AdminService from "../../Services/AdminService";
import EquipmentFilter from "../../components/EquipmentFilter";
import CropTypeFilter from "../../components/CropTypeFilter";
import SoilTypeFilter from "../../components/SoilTypeFilter";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [booking, setBooking] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState({
    serviceType: '',
    cropType: '',
    soilType: '',
  });

  useEffect(() => {
    const getBookings = async () => {
      const data = await AdminService.get('/booking');
      if (data) {
        setBooking(data.data);
        setFilteredBookings(data.data); // Initialize filtered bookings
      }
    };
    getBookings();
  }, []);

  const handleEvent = (params) => {
    navigate(`/bookingDetails/${params.row.id}`);
  };

  const handleFilterChange = (name) => (value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const applyFilters = (bookings) => {
      return bookings.filter((item) => {
        return (!filter.serviceType || item.serviceType === filter.serviceType) &&
               (!filter.cropType || item.cropType === filter.cropType) &&
               (!filter.soilType || item.soilType === filter.soilType);
      });
    };
    setFilteredBookings(applyFilters(booking));
  };

//  Define your columns as before
    const columns = [
    { 
      field: "id", 
      headerName: "ID",
      cellClassName: "name-column--cell", 
    },
    {
      field: "customerPhoneNumber",
      headerName: "Customer Phone Number",
      flex: 1,
    },
    {
      field: "acceptanceID",
      headerName: "Acceptance ID",
      flex: 1,
    },
    {
      field: "bookingConfirmed",
      headerName: "Booking Confirmed",
      flex: 1,
    },
    {
      field: "preferredDate",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "numberOfHectare",
      headerName: "Number of Hectare",
      flex: 1,
    },
    {
      field: "estimatedCost",
      headerName: "Estimated Cost",
      flex: 1,
    },
    {
      field: "cropType",
      headerName: "Crop Type",
      flex: 1,
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: 1,
      renderCell: ({ row: { serviceType } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} fontSize='sm'>
              {t(`${serviceType}`)}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Container>
          <EquipmentFilter changeEquipType={handleFilterChange('serviceType')} />
          <CropTypeFilter changeCropType={handleFilterChange('cropType')} />
          <SoilTypeFilter changeSoilType={handleFilterChange('soilType')} />
          <Button sx={{ ml: 1 }} onClick={handleSubmit} variant="contained">
              Submit
          </Button>
      </Container>
      {filteredBookings.length > 0 && (
        <Box m="20px">
          <Header title="BOOKING" subtitle="Managing the Bookings" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": { color: colors.greenAccent[300] },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
              "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
              "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
              "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
            }}
          >
            <DataGrid checkboxSelection rows={filteredBookings} columns={columns} onRowClick={handleEvent} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Booking;


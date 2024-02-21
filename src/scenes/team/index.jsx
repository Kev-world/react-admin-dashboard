import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import AdminService from "../../Services/AdminService";
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState(null);

  const getUsers = async () => {
    const data = await AdminService.get('/user');
    console.log(data)
    if (data) {
      console.log(data)
      setUser(data.data.results);
    }
  }

  const handleEvent = (params) => {
    navigate(`/userDetails/${params.row.id}`)
  }

  const columns = [
    { 
      field: "id", 
      headerName: "ID",
      cellClassName: "name-column--cell", 
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
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
            backgroundColor={
              serviceType === "admin"
                ? colors.greenAccent[600]
                : serviceType === "farmer"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {serviceType === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {serviceType === "farmer" && <SecurityOutlinedIcon />}
            {serviceType === "serviceProvider" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {serviceType}
            </Typography>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
    {user && (<Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={user} columns={columns} onRowClick={handleEvent} />
      </Box>
    </Box>)}</>
  );
};

export default Team;

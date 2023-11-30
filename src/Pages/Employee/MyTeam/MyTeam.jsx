import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCurrentUser from "../../../hooks/useCurrentUser";
const MyTeam = () => {
  const axioxSecure = useAxiosSecure();
  const { data: currentUser } = useCurrentUser();
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const columns = [
    { id: "serial", label: "SL No", maxWidth: 10 },
    { id: "image", label: "Photo", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "type", label: "Member Type", minWidth: 170 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
  };
  const {
    data: teamMeats = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teammeats", currentUser?.email],
    queryFn: async () => {
      const res = await axioxSecure.get(
        `/admin/all-employees/${currentUser?.haveAdmin}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%", typography: "body1", paddingTop: "20px" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upcoming Events" value="1" />
              <Tab label="My Team Member" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">EVENTS here..</TabPanel>
          <TabPanel value="2">
            <>
              <Container maxWidth="md" sx={{ marginTop: "24px" }}>
                <Paper
                  sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}
                >
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              sx={{ fontWeight: "bold", fontSize: "20px" }}
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teamMeats?.map((employee, index) => (
                          <TableRow key={employee._id}>
                            <TableCell
                              sx={{ fontWeight: "500", fontSize: "18px" }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <img
                                className="h-14 w-12"
                                src={employee.profilePhoto}
                              />
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "500", fontSize: "18px" }}
                            >
                              {employee.name}
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "500", fontSize: "18px" }}
                            >
                              <PersonIcon sx={{ fontSize: "40px" }} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={teamMeats?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Container>
            </>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default MyTeam;

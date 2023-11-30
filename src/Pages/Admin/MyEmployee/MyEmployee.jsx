import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import useCurrentUser from "../../../hooks/useCurrentUser";
import toast from "react-hot-toast";

const MyEmployee = () => {
  const axioxSecure = useAxiosSecure();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: currentUser } = useCurrentUser();

  const columns = [
    { id: "serial", label: "SL No", maxWidth: 10 },
    { id: "image", label: "Photo", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "type", label: "Member Type", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
  };

  const {
    data: employeesWithAdmin = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employeeswithadmin", currentUser?.email],
    queryFn: async () => {
      const res = await axioxSecure.get(
        `/admin/all-employees/${currentUser?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  const handleTeamRemoved = async (id) => {
    const updatedEmployeeInfo = {
      haveAdmin: null,
      companylogo: null,
      team: false,
    };
    const updatedEmployeelimit = currentUser?.employeeLimitRemaining + 1;
    await axioxSecure
      .patch(`/admin/update-employeeInfo/${id}`, updatedEmployeeInfo)
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
          toast.success("Employee added!");
        }
      });
    await axioxSecure
      .patch(`/admin/update-employeelimit/${currentUser?.email}`, {
        updatedEmployeelimit,
      })
      .then((res) => {});
  };
  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "24px" }}>
        <Grid>
          <div>
            <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
              Add Employee From List
            </Typography>
          </div>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
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
                {employeesWithAdmin?.map((employee, index) => (
                  <TableRow key={employee._id}>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "18px",
                        height: "50px",
                        width: "50px",
                      }}
                    >
                      <img className="h-14 w-12" src={employee.profilePhoto} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {employee.name}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      <PersonIcon sx={{ fontSize: "80px" }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      <Button
                        onClick={() => {
                          handleTeamRemoved(employee._id);
                        }}
                        variant="contained"
                      >
                        Remove from Team
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={employeesWithAdmin?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
};

export default MyEmployee;

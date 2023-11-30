import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { capitalizeWords } from "../../../Utilitis/Utility";
import useCurrentUser from "../../../hooks/useCurrentUser";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

const AllCustomRequest = () => {
  <Helmet>
    <title>Admin | All Custom Request</title>
  </Helmet>;
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: currentUser } = useCurrentUser();
  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "image", label: "Image", minWidth: 100 },
    { id: "reason", label: "Request Reason", minWidth: 100 },
    { id: "info", label: "Additional Info", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
  };

  const {
    data: customRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allcustomrequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-custom-asset-request/${currentUser?.email}`
      );
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure
      .patch(`/admin/update-custom-request-asset-info/${id}`, {
        status: "Approved",
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  const handleReject = async (id) => {
    await axiosSecure
      .patch(`/admin/update-custom-request-asset-info/${id}`, {
        status: "Rejected",
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "24px" }}>
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
                {customRequests?.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.assetName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {capitalizeWords(request.price)}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {capitalizeWords(request.type)}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "18px",
                        height: "100px",
                        width: "100px",
                      }}
                    >
                      <img src={request.assetImage} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "18px",
                        maxWidth: "200px",
                        overflow: "hidden",
                      }}
                    >
                      {request.reason}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "18px",
                        maxWidth: "200px",
                        overflow: "hidden",
                      }}
                    >
                      {request.additionalInfo}
                    </TableCell>
                    {request.status === "Approved" ? null : request.status ===
                      "Rejected" ? null : (
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        <IconButton
                          onClick={() => handleApprove(request._id)}
                          aria-label="edit"
                          size="large"
                        >
                          <DoneIcon sx={{ color: "green" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleReject(request._id)}
                          aria-label="delete"
                          size="large"
                        >
                          <CancelIcon sx={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={customRequests?.length}
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

export default AllCustomRequest;

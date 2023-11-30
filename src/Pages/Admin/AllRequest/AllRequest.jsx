import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
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
import { capitalizeWords } from "../../../Utilitis/Utility";

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "date", label: "Request Date", minWidth: 100 },
    { id: "note", label: "Note", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 60 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearchValue(searchText);
    e.target.reset();
  };

  const {
    data: allRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allrequests", searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/employee-all-asset-request?q=${searchValue}`
      );
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure
      .patch(`/admin/update-request-asset-info/${id}`, { status: "Approved" })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  const handleReject = async (id) => {
    await axiosSecure
      .patch(`/admin/update-request-asset-info/${id}`, { status: "Rejected" })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };
  
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "24px" }}>
        <div className="mx-auto mt-5 w-screen-lg leading-6">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0"
          >
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search by name or email..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </form>
        </div>
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
                {allRequests?.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.assetName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {capitalizeWords(request.type)}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.userEmail}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.userName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.requestDate}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.note}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {request.status}
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
            count={allRequests?.length}
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

export default AllRequest;

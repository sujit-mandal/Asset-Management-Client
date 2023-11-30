import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  TableRow,
} from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { capitalizeWords } from "../../Utilitis/Utility";
import useCurrentUser from "../../hooks/useCurrentUser";

const APendingReq = () => {
  const axiosSecure = useAxiosSecure();
  const { data: currentUser} = useCurrentUser();

  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "date", label: "Requested Date", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 100 },
  ];
  const {
    data: allPendingRquests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allpendingrequests", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-pending-asset-request/${currentUser?.email}`
      );
      return res.data;
    },
  });
  return (
    <div className=" my-4">
      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4 px-5">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            All Pending Request.
          </h3>
          {/* <button
            onClick={() => handleToggleView()}
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
          >
            {showAll ? "View Less" : "View All"}
          </button> */}
        </div>
        <div className="flow-root">
          <>
            <Container maxWidth="xl" sx={{ marginTop: "24px" }}>
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
                      {allPendingRquests?.map((request) => (
                        <TableRow key={request._id}>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {request.assetName}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {request.requestDate}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {capitalizeWords(request.type)}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            <IconButton aria-label="delete" size="large">
                              <CancelIcon sx={{ color: "red" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
          </>
        </div>
      </div>
    </div>
  );
};

export default APendingReq;

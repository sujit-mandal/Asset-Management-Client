import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  TableRow,
} from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { capitalizeWords } from "../../Utilitis/Utility";
import useCurrentUser from "../../hooks/useCurrentUser";

const FreReqItem = () => {
  const axioxSecure = useAxiosSecure();
  const currentUser = useCurrentUser();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "date", label: "Requested Date", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 100 },
  ];
  const {
    data: myPendingRquests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mypendingrequests", currentUser?.email],
    queryFn: async () => {
      const res = await axioxSecure.get(
        `/employee/my-all-pending-asset-request/${currentUser?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className=" my-4">
      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4 px-5">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            Frequently Requested Item.
          </h3>
        </div>
        <div className="flow-root">
          {/* <>
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
                      {pendingRequests?.map((request) => (
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
          </> */}
        </div>
      </div>
    </div>
  );
};

export default FreReqItem;

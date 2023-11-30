import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddIcon from "@mui/icons-material/Add";
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
import { Link } from "react-router-dom";

const APendingReq = () => {
  const axiosSecure = useAxiosSecure();
  const { data: currentUser } = useCurrentUser();
  const [limitedItems, setLimitedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "quantity", label: "Quantity", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 100 },
  ];
  const {
    data: alllimitedItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alllimiteditems", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/limited-asset/${currentUser?.email}`
      );
      return res.data;
    },
  });
  useEffect(() => {
    setLimitedItems(alllimitedItems?.slice(0, 5));
  }, [alllimitedItems]);

  const handleToggleView = () => {
    if (showAll) {
      setLimitedItems(alllimitedItems?.slice(0, 5));
    } else {
      setLimitedItems(alllimitedItems);
    }
    setShowAll(!showAll);
  };
  return (
    <div className=" my-4">
      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4 px-5">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            Limited Items.
          </h3>
          <button
            onClick={() => handleToggleView()}
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
          >
            {showAll ? "View Less" : "View All"}
          </button>
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
                      {limitedItems?.map((request) => (
                        <TableRow key={request._id}>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {request.assetName}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {request.quantity}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            {capitalizeWords(request.type)}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "18px" }}
                          >
                            <Link to={"/admin/add-asset"}>
                              <IconButton aria-label="delete" size="large">
                                <AddIcon sx={{ color: "green" }} />
                              </IconButton>
                            </Link>
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

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { capitalizeWords } from "../../../Utilitis/Utility";
import {
  Button,
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
import useCurrentUser from "../../../hooks/useCurrentUser";
import RequestModal from "../../../Components/Shared/Modals/RequestModal";
import toast from "react-hot-toast";
import Spinner from "../../../Components/Spinner/Spinner";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedType, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [item, setItem] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: currentUser } = useCurrentUser();

  const handleOpen = () => {
    if (currentUser.team === false) {
      return toast.error("For request please contact with HR");
    }
    setOpen(true);
  };
  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "availability", label: "Availability", minWidth: 100 },
    { id: "button", label: "Action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearchValue(searchText);
    e.target.reset();
  };
  const {
    data: assets,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", selectedType, searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee/asset-list?type=${selectedType}&q=${searchValue}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "24px" }}>
        <div className="mx-auto mt-5 w-screen-lg leading-6">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0"
          >
            <div className="flex gap-5">
              <label className="focus-within:ring h-14 rounded-md bg-gray-200 px-2 ring-emerald-200">
                <select
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  className="bg-transparent px-6 py-4 outline-none"
                  name="category"
                  id="category"
                >
                  <option disabled selected>
                    Type
                  </option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-returnable</option>
                </select>
              </label>
              <input
                type="name"
                name="search"
                className="ml-1 h-14 w-full cursor-text rounded-md border py-4 pl-6 outline-none ring-emerald-200 sm:border-0 sm:pr-40 sm:pl-12 focus:ring"
                placeholder="Search by asset name..."
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 sm:absolute sm:right-0 sm:mt-0 sm:mr-1 sm:w-32 focus:ring"
            >
              Search
            </button>
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
                {assets?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {item.assetName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {capitalizeWords(item.type)}
                    </TableCell>
                    {item?.quantity > 0 ? (
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        Available
                      </TableCell>
                    ) : (
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        Out of Stock
                      </TableCell>
                    )}
                    {item?.quantity <= 0 ? (
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        <Button disabled variant="contained">
                          Request
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        <Button
                          onClick={() => handleOpen(setItem(item))}
                          variant="contained"
                        >
                          Request
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={assets?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <RequestModal
        open={open}
        handleClose={handleClose}
        item={item}
      ></RequestModal>
    </>
  );
};

export default RequestAsset;

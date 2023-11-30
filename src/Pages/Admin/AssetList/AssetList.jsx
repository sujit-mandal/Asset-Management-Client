import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { capitalizeWords } from "../../../Utilitis/Utility";
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
  TableSortLabel,
} from "@mui/material";
import useCurrentUser from "../../../hooks/useCurrentUser";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [orderBy, setOrderBy] = useState("quantity");
  const [order, setOrder] = useState("asc");
  const [selectedType, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { data: currentUser } = useCurrentUser();

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
        `/admin/asset-list/${currentUser?.email}?type=${selectedType}&q=${searchValue}`
      );
      return res.data;
    },
  });

  const columns = [
    { id: "assetName", label: "Asset Name", minWidth: 170 },
    { id: "type", label: "Asset Type", minWidth: 170 },
    { id: "quantity", label: "Quantity", minWidth: 100 },
    { id: "button", label: "Action", minWidth: 100 },
  ];

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  };
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedAssets = stableSort(assets, getComparator(order, orderBy));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                      {column.id !== "button" ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        <span>{column.label}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAssets
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        {item.assetName}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        {capitalizeWords(item.type)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        {item.quantity}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "500", fontSize: "18px" }}>
                        <IconButton aria-label="edit" size="large">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" size="large">
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={assets?.length}
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

export default AssetList;

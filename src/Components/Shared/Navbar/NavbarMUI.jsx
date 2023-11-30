import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import { Container } from "@mui/material";
import GridLoader from "react-spinners/GridLoader";
import Spinner from "../../Spinner/Spinner";
const drawerWidth = 240;
const navItems = [
  { title: "Home", path: "/" },
  { title: "Join As Employee", path: "/employee-signup" },
  { title: "Join As HR/Admin", path: "/hr-signup" },
];
const employeeNavItems = [
  { title: "Home", path: "/employee/dashboard" },
  { title: "My Team", path: "/employee/my-team" },
  { title: "My Assets", path: "/employee/my-assets" },
  { title: "Request for asset", path: "/employee/asset-request" },
  { title: "Make Custom Request", path: "/employee/create-custom-request" },
  { title: "Profile", path: "/profile" },
];
const adminNavItems = [
  { title: "Home", path: "/admin/dashboard" },
  { title: "My Employee", path: "/admin/all-employees" },
  { title: "Add Employee", path: "/admin/add-employee" },
  { title: "Assets", path: "/admin/asset-list" },
  { title: "Add Asset", path: "/admin/add-asset" },
  { title: "All Request", path: "/admin/all-asset-request" },
  { title: "Custom Request", path: "/admin/all-custom-request" },
  { title: "Profile", path: "admin/profile" },
];

const NavbarMUI = (props) => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { data: currentUser, isLoading } = useCurrentUser();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", color: "#000" }}
    >
      {!user ? (
        <img src={logo} alt="logo" className="w-28 h-20 p-1 rounded-md" />
      ) : currentUser?.role === "admin" ? (
        <img src={currentUser?.logo} alt="logo" className="w-28 h-20" />
      ) : currentUser?.role === "employee" ? (
        <img src={currentUser?.companylogo} alt="logo" className="w-28 h-20" />
      ) : currentUser?.haveAdmin == null ? (
        <img src={logo} alt="logo" className="w-20 h-10 pl-5" />
      ) : (
        <img src={logo} alt="logo" className="w-28 h-20" />
      )}
      <Divider />
      <List>
        {!user
          ? navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink key={item.title} to={item.path} sx={{}}>
                    {item.title}
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))
          : currentUser?.role === "admin"
          ? adminNavItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink key={item.title} to={item.path} sx={{}}>
                    {item.title}
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))
          : currentUser?.role === "employee"
          ? employeeNavItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink key={item.title} to={item.path} sx={{}}>
                    {item.title}
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))
          : ""}

        {user ? (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <button
                onClick={() => handleLogOut()}
                className="middle none center rounded-lg bg-gradient-to-tr from-[#144279] to-[#0d67d4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[green-500/80] transition-all hover:shadow-lg hover:shadow-green-500/50 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <span>Logout</span>
              </button>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 bg-black text-white rounded-lg"
              >
                Log In
              </button>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ background: "white" }} component="nav">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon sx={{ color: "#144279" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "none", lg: "block" },
              }}
            >
              {!user ? (
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 h-20 p-1 rounded-md"
                />
              ) : currentUser?.role === "admin" ? (
                <img src={currentUser?.logo} alt="logo" className="w-28 h-20" />
              ) : currentUser?.role === "employee" && currentUser?.haveAdmin ? (
                <img
                  src={currentUser?.companylogo}
                  alt="logo"
                  className="w-28 h-20"
                />
              ) : currentUser?.role === "employee" &&
                currentUser?.haveAdmin == null ? (
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 h-20 p-1 rounded-md"
                />
              ) : (
                <img src={logo} alt="logo" className="w-28 h-20" />
              )}
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                color: "#000",
                marginRight: "10px",
              }}
            >
              <div className="flex items-center justify-evenly gap-10">
                <ul className=" flex justify-between items-center gap-2 ">
                  {!user
                    ? navItems.map((item) => (
                        <li
                          className="pr-1 hover:text-[#144279]"
                          key={item.title}
                        >
                          <NavLink
                            to={item.path}
                            className={({ isActive, isPending }) =>
                              isPending ? "pending" : isActive ? "active" : ""
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))
                    : currentUser?.role === "admin"
                    ? adminNavItems.map((item) => (
                        <li
                          className="pr-1 hover:text-[#144279]"
                          key={item.title}
                        >
                          <NavLink
                            to={item.path}
                            className={({ isActive, isPending }) =>
                              isPending ? "pending" : isActive ? "active" : ""
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))
                    : currentUser?.role === "employee"
                    ? employeeNavItems.map((item) => (
                        <li
                          className="pr-1 hover:text-[#144279]"
                          key={item.title}
                        >
                          <NavLink
                            to={item.path}
                            className={({ isActive, isPending }) =>
                              isPending ? "pending" : isActive ? "active" : ""
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))
                    : ""}

                  {!user ? null : currentUser?.role === "admin" ? (
                    <div className="mx-auto">
                      <img
                        className="w-10 h-10 rounded-full mr-2 mx-auto"
                        src={currentUser?.logo}
                        alt="user photo"
                      />
                      <p className="text-sm font-medium text-center">
                        {currentUser?.name}
                      </p>
                    </div>
                  ) : currentUser?.role === "employee" ? (
                    <div className="mx-auto">
                      <img
                        className="w-10 h-10 rounded-full mr-2 mx-auto"
                        src={currentUser?.profilePhoto}
                        alt="user photo"
                      />
                      <p className="text-sm font-medium text-center">
                        {currentUser?.name}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* {!user ? null : (
                    <div className="mx-auto">
                      <img
                        className="w-10 h-10 rounded-full mr-2 mx-auto"
                        src={currentUser?.profilePhoto}
                        alt="user photo"
                      />
                      <p className="text-sm font-medium text-center">
                        {currentUser?.name}
                      </p>
                    </div>
                  )} */}
                </ul>

                <div className="flex items-center">
                  {user ? (
                    <button
                      onClick={() => handleLogOut()}
                      className="middle none center rounded-lg bg-gradient-to-tr from-[#144279] to-[#0d67d4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#00AFEF] transition-all hover:shadow-lg hover:shadow-[#00AFEF] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                      type="button"
                      data-ripple-light="true"
                    >
                      <span>Logout</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="px-3 py-1 bg-black text-white rounded-lg"
                    >
                      Log In
                    </button>
                  )}
                </div>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavbarMUI;

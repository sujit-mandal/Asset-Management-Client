import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { data: currentUser, refetch } = useCurrentUser();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        refetch()
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(currentUser);

  return (
    <nav className=" block w-full border border-white/80 bg-white bg-opacity-80 px-4 text-black shadow-md backdrop-blur-2xl backdrop-saturate-200">
      <div className="container max-w-screen-xl space-y-4 md:space-y-0 mx-auto flex flex-col md:flex-row items-center justify-between text-gray-900">
        <Link>
          <img src={logo} alt="logo" className="w-28 h-20" />
        </Link>
        <ul className="items-center gap-6 flex">
          {!user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee-signup"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Join As Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hr-signup"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Join As HR
                </NavLink>
              </li>
            </>
          )}
          {/* employee menubar */}
          {user && currentUser?.role === "employee" && (
            <>
              <li>
                <NavLink
                  to="/employee/dashboard"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee/my-team"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  My Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee/my-assets"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  My Assets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee/asset-request"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Request for an asset
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee/create-custom-request"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Make a Custom Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
          {user && currentUser?.role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/all-employees"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  My Employee List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/add-employee"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Add an Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/asset-list"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Asset List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/add-asset"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Add an Asset
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/all-asset-request"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  All Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/all-custom-request"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Custom Request List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="admin/profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {user ? (
          <button
            onClick={() => handleLogOut()}
            className="middle none center rounded-lg bg-gradient-to-tr from-[#10B981] to-[#078d60] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/80 transition-all hover:shadow-lg hover:shadow-green-500/50 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
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
    </nav>
  );
};

export default Navbar;

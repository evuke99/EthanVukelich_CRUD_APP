import SignInModal from "./SignInModal";
import RegisterModal from "./RegisterModal";
import LogoutButton from "./LogoutButton";
import Axios from "axios";
import { useState, useEffect } from "react";

Axios.defaults.withCredentials = true;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Username, setUsername] = useState("");
  const [_id, setID] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const logIn = () => {
    setIsLoggingIn(true);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    console.log("logged out");
    setIsLoggingIn(false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    Axios.get("/api/users/getCurrentUser")
      .then((res) => {
        setUsername(res.data.user.Username);
        setID(res.data.user._id);
      })
      .then(() => {
        console.log("Logged In");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggingIn]);

  // Changes Navbar based on if the user is logged in or not (need to add token validation here)
  const IsLoggedIn = () => {
    if (isLoggedIn) {
      return (
        <>
          <div className="navbar-center hidden  lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Create Item</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Create Item</a>
                    </li>
                    <li>
                      <a>Toggle Ownership</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Toggle: Your Items vs All Items</a>
              </li>
              <li>
                <a>Search Bar</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end" data-theme="dark">
            <LogoutButton logginOut={logOut} />
            <SignInModal logginIn={logIn} />
            <RegisterModal />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="navbar-center hidden  lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>
                  {/* <button onClick={handleOnClick}>Send Request</button> */}
                </a>
              </li>
              <li>
                <a>Search Bar</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end" data-theme="dark">
            <SignInModal logginIn={logIn} />
            <RegisterModal />
          </div>
        </>
      );
    }
  };

  return (
    <div className="navbar fixed rounded z-10 bg-base-100" data-theme="dark">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Inventory Management</a>
      </div>
      <IsLoggedIn />
    </div>
  );
};

export default Navbar;

import SignInModal from "./SignInModal";
import RegisterModal from "./RegisterModal";
import LogoutButton from "./LogoutButton";
import CreateItemModal from "./CreateItemModal";
import CreateItemForm from "./CreateItemForm";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useItemContext } from "../Hooks/useItemContext";

Axios.defaults.withCredentials = true;

const Navbar = ({ update, signedIn, newItem }) => {
  const { ITEMS, dispatch } = useItemContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [Username, setUsername] = useState("");
  // const [_id, setID] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [counter, setCounter] = useState(0);

  const logIn = () => {
    console.log("LOGIN");
    signedIn(true);
    setIsLoggedIn(true);
    localStorage.setItem("LOGGED_IN", JSON.stringify(true));
    // localStorage.setItem("UPDATE_OPTION", JSON.stringify("LOGIN"));
    // update("LOGIN");
    handleUpdate("LOGIN");
  };

  const logOut = () => {
    console.log("LOGOUT");
    signedIn(false);
    setIsLoggedIn(false);
    localStorage.setItem("LOGGED_IN", JSON.stringify(false));
    localStorage.removeItem("User");
    // update("LOGOUT");
    handleUpdate("LOGOUT");
  };

  const createItem = () => {
    console.log("CREATE_ITEM");
    // update("CREATEITEM");
    handleUpdate("CREATE_ITEM");
  };

  const handleUpdate = (data) => {
    console.log(data);
    localStorage.setItem("UPDATE_OPTION", JSON.stringify(data));
    update(data);
  };

  useEffect(() => {
    const data = localStorage.getItem("LOGGED_IN");
    if (data === null) {
      localStorage.setItem("LOGGED_IN", JSON.stringify(false));
    }
    setIsLoggedIn(JSON.parse(data));
    Axios.get("/api/users/getCurrentUser")
      .then((res) => {
        localStorage.setItem(
          "User",
          JSON.stringify({
            Username: res.data.user.Username,
            _id: res.data.user._id,
          })
        );
        // ITEM(JSON.parse(localStorage.getItem("User")));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  // Changes Navbar based on if the user is logged in or not (need to add token validation here)
  const IsLoggedIn = () => {
    const data = localStorage.getItem("LOGGED_IN");
    if (isLoggedIn) {
      return (
        <>
          <div className="navbar-center">
            <CreateItemModal creating={createItem} newItem={newItem} />
          </div>
          <div className="navbar-center hidden  lg:flex">
            <div className="form-control">
              <button
                className="text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
                onClick={() => handleUpdate("USER_ITEMS")}
              >
                Your Items
              </button>
            </div>
            <div className="form-control">
              <button
                className="text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
                onClick={() => handleUpdate("ALL_ITEMS")}
              >
                All Items
              </button>
            </div>
          </div>
          <div className="navbar-end">
            <LogoutButton logginOut={logOut} />
            <RegisterModal />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="navbar-end bg-base-300">
            {/* <SignInModal logginIn={() => setIsLoggedIn(true)} /> */}
            <SignInModal logginIn={logIn} />
            <RegisterModal />
          </div>
        </>
      );
    }
  };

  return (
    <div className="navbar fixed rounded z-10 bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Inventory Management</a>
      </div>
      {console.log("NAVBAR rendered")}

      <IsLoggedIn />
    </div>
  );
};

export default Navbar;

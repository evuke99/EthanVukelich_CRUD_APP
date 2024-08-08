// Components
import { useEffect, useState } from "react";
import InventoryList from "../Components/InventoryList";
import UserList from "../Components/UserList";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [update, setUpdate] = useState("");

  const Update = (data) => {
    console.log("update home");
    setUpdate(data);
  };

  useEffect(() => {
    console.log("Home update changed");
  }, [update]);

  return (
    <>
      <div>
        <Navbar update={Update} />
      </div>
      <div className="py-20 min-h-screen bg-base-300 ">
        <InventoryList update={update} />
      </div>
    </>
  );
};

export default Home;

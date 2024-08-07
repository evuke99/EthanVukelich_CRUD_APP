// Components
import InventoryList from "../Components/InventoryList";
import UserList from "../Components/UserList";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div data-theme="dark" className="py-20">
        <InventoryList />
      </div>
    </>
  );
};

export default Home;

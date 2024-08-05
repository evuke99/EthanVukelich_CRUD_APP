import { useEffect, useState } from "react";

// Components
import UserList from "../Components/UserList";
import UserForm from "../Components/UserForm";

const Home = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });

    // const fetchUsers = async () => {
    //   const response = await fetch("/api/users");
    //   const json = await response.json();

    //   if (response.ok) {
    //     setUsers(json);
    //   }
    // };

    // fetchUsers();
  }, []);

  return (
    <div className="home">
      <h2>Home</h2>
      <div className="users">
        {users && users.map((user) => <UserList key={user._id} user={user} />)}
      </div>
      <UserForm />
    </div>
  );
};

export default Home;

const { useState } = require("react");

const UserForm = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const workout = { FirstName, LastName, Username, Password };

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.json().error);
          throw new Error(res.status);
        } else {
          const json = res.json();
          setError(null);
          return json;
        }
      })
      .then((data) => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setError(null);
        console.log("new user added", data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new user</h3>
      <label>First Name</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={FirstName}
      />
      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={LastName}
      />
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={Username}
      />
      <label>Passoword</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
      />
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;

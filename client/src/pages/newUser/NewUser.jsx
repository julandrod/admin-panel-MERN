import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newUser.css";

const NewUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("auth/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log(res.data);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="John"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@email.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 234 5678" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="Other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select name="active" id="active" className="newUserSelect">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;

import { Visibility } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { selectUserState } from "../../store/userSlice";
import { useSelector } from "react-redux";

import "./widgetSm.css";
import { Link } from "react-router-dom";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  const { userInfo } = useSelector(selectUserState);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/users/?new=true", {
          headers: {
            "x-access-token": userInfo.token,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userInfo.token]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src="https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <Link to={`/users/${user._id}`} >
            <button className="widgetSmButton" >
              <Visibility className="widgetSmIcon" />
              Display
            </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;

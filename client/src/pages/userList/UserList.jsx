import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectUserState } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import "./userList.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";

const UserList = () => {
  const [data, setData] = useState([]);
  const { userInfo } = useSelector(selectUserState);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/users/", {
          headers: {
            "x-access-token": userInfo.token,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userInfo.token]);

  console.log(data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/${params.row._id}`}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {data.length > 0 ? (
        <div className="userList">
          <DataGrid
            rows={data}
            columns={columns}
            pagesize={10}
            getRowId={(row) => row._id}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      ) : (
        <h1 className="userListLoading">Loading...</h1>
      )}
    </>
  );
};

export default UserList;

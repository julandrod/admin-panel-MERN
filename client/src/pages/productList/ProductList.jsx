import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAllProducts,
  selectProductState,
} from "../../store/productSlice";
import { selectUserState } from "../../store/userSlice";
import "./productList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProductState);
  const { userInfo } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(getAllProducts({ token: userInfo.token }));
  }, [dispatch, userInfo.token]);

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id, token: userInfo.token }));
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/products/${params.row._id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {products.length > 0 ? (
        <div className="productList">
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      ) : (
        <h1 className="userListLoading">Loading...</h1>
      )}
    </>
  );
};

export default ProductList;

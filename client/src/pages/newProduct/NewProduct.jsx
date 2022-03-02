import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/productSlice";
import { selectUserState } from "../../store/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase";
import "./newProduct.css";

const NewProduct = () => {
  const [inputs, setInputs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUserState);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    const trimCategories = e.target.value.split(",").map((cat) => cat.trim());
    setCategories(trimCategories);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
          };
          dispatch(
            createProduct({ productInfo: product, token: userInfo.token })
          );
        });
      }
    );

    // dispatch(createProduct({ productInfo: inputs, token: userInfo.token }));
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Category 1, Category 2, etc"
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;

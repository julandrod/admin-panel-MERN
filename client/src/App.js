import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import { selectUserState } from "./store/userSlice";

function App() {
  const { userInfo } = useSelector(selectUserState);

  return (
    <Router>
      <>
        <Topbar />
        <div className="container">
          {userInfo && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />} />
            {!userInfo ? (
              <Route path="/login" element={<Login />} />
            ) : (
              <Route path="/login" element={<Navigate replace to="/" />} />
            )}
            <Route path="/users" element={<Home />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser/>} />
            <Route path="/userList" element={<UserList/>} />
            <Route path="/productList" element={<ProductList/>} />
            <Route path="/newProduct" element={<NewProduct/>} />
            <Route path="/products/:productId" element={<Product />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;

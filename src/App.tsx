import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import "./style.css";
import Header from "./templates/Header";
import Users from "./pages/Users";
import Events from "./pages/Events";
import AddUsers from "./pages/AddUsers";
import EditUsers from "./pages/EditUsers";
import AddEvents from "./pages/AddEvents";
import EditEvents from "./pages/EditEvents";
import VATs from "./pages/VATs";
import AddVATs from "./pages/AddVATs";
import EditVATs from "./pages/EditVATs";
import AddCategories from "./pages/AddCategories";
import Categories from "./pages/Categories";
import EditCategories from "./pages/EditCategories";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import EditProducts from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/users">
            <Route path="" element={<Users />} />
            <Route path="add" element={<AddUsers />} />
            <Route path="edit/:id" element={<EditUsers />} />
          </Route>
          <Route path="/events">
            <Route path="" element={<Events />} />
            <Route path="add" element={< AddEvents/>} />
            <Route path="edit/:id" element={<EditEvents />} />
          </Route>
          <Route path="/vats">
            <Route path="" element={<VATs />} />
            <Route path="add" element={< AddVATs/>} />
            <Route path="edit/:id" element={<EditVATs />} />
          </Route>
          <Route path="/categories">
            <Route path="" element={<Categories />} />
            <Route path="add" element={<AddCategories/>} />
            <Route path="edit/:id" element={<EditCategories />} />
          </Route>
          <Route path="/products">
            <Route path="" element={<Products />} />
            <Route path="add" element={<AddProducts/>} />
            <Route path="edit/:id" element={<EditProducts />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

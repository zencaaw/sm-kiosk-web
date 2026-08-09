import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router";
import './style.css';

import Header from "./templates/Header";
import Loader from "./components/Loader";
import Users from "./pages/Users";
import Events from "./pages/Events";
import VATs from "./pages/VATs";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

const Login = lazy(() => import("./pages/Login"));
const AddUsers = lazy(() => import("./pages/AddUsers"));
const EditUsers = lazy(() => import("./pages/EditUsers"));
const AddEvents = lazy(() => import("./pages/AddEvents"));
const EditEvents = lazy(() => import("./pages/EditEvents"));
const AddVATs = lazy(() => import("./pages/AddVATs"));
const EditVATs = lazy(() => import("./pages/EditVATs"));
const AddCategories = lazy(() => import("./pages/AddCategories"));
const EditCategories = lazy(() => import("./pages/EditCategories"));
const AddProducts = lazy(() => import("./pages/AddProducts"));
const EditProducts = lazy(() => import("./pages/EditProduct"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader isLoading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route element={<Header />}>
            <Route path="/users">
              <Route path="" element={<Users />} />
              <Route path="add" element={<AddUsers />} />
              <Route path="edit/:id" element={<EditUsers />} />
            </Route>

            <Route path="/events">
              <Route path="" element={<Events />} />
              <Route path="add" element={<AddEvents />} />
              <Route path="edit/:id" element={<EditEvents />} />
            </Route>

            <Route path="/vats">
              <Route path="" element={<VATs />} />
              <Route path="add" element={<AddVATs />} />
              <Route path="edit/:id" element={<EditVATs />} />
            </Route>

            <Route path="/categories">
              <Route path="" element={<Categories />} />
              <Route path="add" element={<AddCategories />} />
              <Route path="edit/:id" element={<EditCategories />} />
            </Route>

            <Route path="/products">
              <Route path="" element={<Products />} />
              <Route path="add" element={<AddProducts />} />
              <Route path="edit/:id" element={<EditProducts />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

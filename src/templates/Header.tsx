import { Menu, X} from "lucide-react";
import { LogOut as LogOutSVG } from "lucide-react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const title = useSelector((state: RootState) => state.HeaderSlice.title);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      <section className="fixed w-full bg-white backdrop-blur shadow h-15">
        <div
          onClick={() => {
            setMenuIsOpen(!menuIsOpen)
          }}
          className="absolute left-2 top-3 cursor-pointer"
        >
          <button className="border border-gray-200">{menuIsOpen ? <X color="black"/> : <Menu color="black"/> }</button>
          <div
            className={`absolute top-12 shadow border border-gray-200 bg-white p-2 w-fit text-center rounded-xl flex flex-col gap-1
              ${menuIsOpen ? "" : "opacity-0 pointer-events-none -translate-y-5"} duration-300`}
          >
            <p onClick={() => navigate("/users")} className="text-xl hover:bg-gray-100 p-1 rounded-lg select-none">Utilisateurs</p>
            <p onClick={() => navigate("/events")} className="text-xl hover:bg-gray-100 p-1 rounded-lg select-none">Évènements</p>
            <p onClick={() => navigate("/vats")} className="text-xl hover:bg-gray-100 p-1 rounded-lg select-none">TVA</p>
            <p onClick={() => navigate("/categories")} className="text-xl hover:bg-gray-100 p-1 rounded-lg select-none">Catégories</p>
            <p onClick={() => navigate("/products")} className="text-xl hover:bg-gray-100 p-1 rounded-lg select-none">Produits</p>
          </div>
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 top-3">{title}</h1>
        <div className="absolute right-2 top-2">
          <button onClick={() => {
            Cookies.remove("token");
            navigate("/login");
          }} className="bg-red-500 shadow">
            <LogOutSVG />
          </button>
        </div>
      </section>
      <div className="pt-15 h-full">
        <Outlet />
      </div>
    </>
  );
}

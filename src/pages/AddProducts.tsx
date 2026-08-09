import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDProducts from "../components/CRUDProducts";

export default function AddProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Ajouter un produit"));
  }, []);

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDProducts/>
    </main>
  )
}

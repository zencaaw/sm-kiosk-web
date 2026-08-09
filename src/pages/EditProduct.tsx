import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDProducts from "../components/CRUDProducts";

export default function EditProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Modifier un produit"));
  }, []);

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDProducts product={{ Id: 1, label: "Nourriture", isAvailable: true, exclVatPrice: 10, categoryId: 1}}/>
    </main>
  )
}

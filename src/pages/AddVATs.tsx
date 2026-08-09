import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDVATs from "../components/CRUDVATs";

export default function AddVATs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Ajouter un Évènement"));
  }, []);

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDVATs/>
    </main>
  )
}

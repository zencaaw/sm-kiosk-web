import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDVATs from "../components/CRUDVATs";

export default function EditVATs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Modifier un utilisateurs"));
  }, []);

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDVATs vat={{ type: "B", rate: 21}}/>
    </main>
  )
}

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDEvents from "../components/CRUDEvents";

export default function EditEvents() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Modifier un évènement"));
  }, []);

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDEvents event={{ name: "Bunker", location: "Rue de l'université", IsActive: true, IBAN: "BE12345"}}/>
    </main>
  )
}

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDEvents from "../components/CRUDEvents";
import type { event } from "../type";
import useData from "../hooks/useData";

export default function AddEvents() {
  const dispatch = useDispatch();
  const { createCategory, isLoading, errorMessage} = useData();

  useEffect(() => {
    dispatch(changeTitle("Ajouter un Évènement"));
  }, []);

  const submit = async (event: event) => {
    if (event !== undefined) {
      const isDone = await createCategory(category);
      if (isDone) {
        navigate("/categories");
      } else {
        setModalIsOpen(true);
      }
    }
  }

  return (
    <main className="p-2 flex justify-center items-center min-h-full">
      <CRUDEvents/>
    </main>
  )
}

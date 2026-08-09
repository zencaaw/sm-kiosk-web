import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDCategories from "../components/CRUDCategories";
import useData from "../hooks/useData";
import type { category } from "../type";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";

export default function AddCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createCategory, isLoading, errorMessage } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    dispatch(changeTitle("Ajouter une catégorie"));
  }, []);

  const submit = async (category: category) => {
    if (category !== undefined) {
      const isDone = await createCategory(category);
      if (isDone) {
        navigate("/categories");
      } else {
        setModalIsOpen(true);
      }
    }
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        <CRUDCategories submitFunc={submit}  isLoading={isLoading}/>
      </main>
    </>
  )
}

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDCategories from "../components/CRUDCategories";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import useData from "../hooks/useData";
import type { category } from "../type";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function EditCategories() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { category: getCategory, isLoading: isLoadingGet, errorMessage: errorMessageGet} = useData();
  const { editCategory, isLoading: isLoadingEdit, errorMessage: errorMessageEdit} = useData();
  const [category, setCategory] = useState<category>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Modifier une catégorie"));
    const categoryId = params.id;
    if (categoryId) {
      (async () => {
        setCategory(await getCategory(Number(categoryId)));
      })()
    } else {
      navigate("/categories");
    }
  }, []);

  const submit = async (category: category) => {
    const categoryId = params.id;
    if (category !== undefined && categoryId) {
      const isDone = await editCategory(Number(categoryId),category);
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
        <p>{errorMessageGet ?? errorMessageEdit}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        {
          category === undefined && errorMessageGet === undefined || isLoadingGet ? (
            <Loader isLoading/>
          ) : (
            <CRUDCategories category={category} submitFunc={submit} isLoading={isLoadingGet || isLoadingEdit}/>
          )
        }
      </main>
    </>
  )
}

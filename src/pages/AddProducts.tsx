import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDProducts from "../components/CRUDProducts";
import useData from "../hooks/useData";
import type { product } from "../type";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";

export default function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createProduct, isLoading, errorMessage } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Ajouter un produit"));
  }, []);

  const submit = async (product: product, picture: File | undefined) => {
    if (product !== undefined) {
      const isDone = await createProduct(product, picture);
      if (isDone) {
        navigate("/products");
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
        <CRUDProducts submitFunc={submit} isLoading={isLoading} />
      </main>
    </>
  )
}

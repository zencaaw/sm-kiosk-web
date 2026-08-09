import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDProducts from "../components/CRUDProducts";
import { useNavigate, useParams } from "react-router";
import useData from "../hooks/useData";
import type { product } from "../type";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function EditProducts() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { product: getProduct, isLoading: isLoadingGet, errorMessage: errorMessageGet } = useData();
  const { editProduct, isLoading: isLoadingEdit, errorMessage: errorMessageEdit } = useData();
  const [product, setProduct] = useState<product>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Modifier un produit"));
    const productId = params.id;
    if (productId) {
      (async () => {
        setProduct(await getProduct(Number(productId)));
      })()
    } else {
      navigate("/products");
    }
  }, []);

  const submit = async (product: product, picture: File | undefined) => {
    const productId = params.id;
    if (product !== undefined && productId) {
      const isDone = await editProduct(Number(productId), product, picture);
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
        <p>{errorMessageGet ?? errorMessageEdit}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        {
          product === undefined && errorMessageGet === undefined || isLoadingGet ? (
            <Loader isLoading/>
          ) : (
            <CRUDProducts product={product} submitFunc={submit} isLoading={isLoadingGet || isLoadingEdit}/>
          )
        }
      </main>
    </>
  )
}

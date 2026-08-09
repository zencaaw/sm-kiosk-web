import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDVATs from "../components/CRUDVATs";
import { useNavigate, useParams } from "react-router";
import useData from "../hooks/useData";
import type { vat } from "../type";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function EditVATs() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { vat: getVat, isLoading: isLoadingGet, errorMessage: errorMessageGet } = useData();
  const { editVat, isLoading: isLoadingEdit, errorMessage: errorMessageEdit } = useData();
  const [vat, setVat] = useState<vat>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Modifier une TVA"));
    const vatType = params.id;
    if (vatType) {
      (async () => {
        setVat(await getVat(vatType));
      })()
    } else {
      navigate("/vats");
    }
  }, []);

  const submit = async (vat: vat) => {
    const vatType = params.id;
    if (vat !== undefined && vatType) {
      const isDone = await editVat(vatType, vat);
      if (isDone) {
        navigate("/vats");
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
          vat === undefined && errorMessageGet === undefined || isLoadingGet ? (
            <Loader isLoading/>
          ) : (
            <CRUDVATs vat={vat} submitFunc={submit} isLoading={isLoadingGet || isLoadingEdit}/>
          )
        }
      </main>
    </>
  )
}

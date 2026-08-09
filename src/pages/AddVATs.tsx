import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDVATs from "../components/CRUDVATs";
import useData from "../hooks/useData";
import type { vat } from "../type";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";

export default function AddVATs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createVat, isLoading, errorMessage } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Ajouter une TVA"));
  }, []);

  const submit = async (vat: vat) => {
    if (vat !== undefined) {
      const isDone = await createVat(vat);
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
        <p>{errorMessage}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        <CRUDVATs submitFunc={submit} isLoading={isLoading} />
      </main>
    </>
  )
}

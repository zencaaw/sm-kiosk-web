import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDEvents from "../components/CRUDEvents";
import type { event } from "../type";
import useData from "../hooks/useData";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";

export default function AddEvents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createEvent, isLoading, errorMessage } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    dispatch(changeTitle("Ajouter un Évènement"));
  }, []);

  const submit = async (event: event) => {
    if (event !== undefined) {
      const isDone = await createEvent(event);
      if (isDone) {
        navigate("/events");
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
        <CRUDEvents submitFunc={submit} isLoading={isLoading}/>
      </main>
    </>
  )
}

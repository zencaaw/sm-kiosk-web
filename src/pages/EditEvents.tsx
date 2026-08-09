import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import CRUDEvents from "../components/CRUDEvents";
import { useParams, useNavigate } from "react-router";
import useData from "../hooks/useData";
import type { event } from "../type";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function EditEvents() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { event: getEvent, isLoading: isLoadingGet, errorMessage: errorMessageGet } = useData();
  const { editEvent, isLoading: isLoadingEdit, errorMessage: errorMessageEdit } = useData();
  const [event, setEvent] = useState<event>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Modifier un évènement"));
    const eventId = params.id;
    if (eventId) {
      (async () => {
        setEvent(await getEvent(Number(eventId)));
      })()
    } else {
      navigate("/events");
    }
  }, []);

  const submit = async (event: event, image: File | undefined) => {
    const eventId = params.id;
    if (event !== undefined && eventId) {
      const isDone = await editEvent(Number(eventId), event, image);
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
        <p>{errorMessageGet ?? errorMessageEdit}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        {
          event === undefined && errorMessageGet === undefined || isLoadingGet ? (
            <Loader isLoading/>
          ) : (
            <CRUDEvents event={event} submitFunc={submit} isLoading={isLoadingGet || isLoadingEdit}/>
          )
        }
      </main>
    </>
  )
}

import { useDispatch } from "react-redux";
import CRUDUsers from "../components/CRUDUsers";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import useData from "../hooks/useData";
import Modal from "../components/Modal";
import { type user } from "../type";
import { useNavigate } from "react-router";

export default function AddUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createUser, isLoading, errorMessage } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Ajouter un utilisateurs"));
  }, []);

  const submit = async (user: user, avatar: File | undefined) => {
    if (user !== undefined) {
      const isDone = await createUser(user, avatar);
      if (isDone) {
        navigate("/users");
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
        <CRUDUsers submitFunc={submit} isLoading={isLoading} />
      </main>
    </>
  )
}

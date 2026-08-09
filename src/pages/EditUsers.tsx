import { useDispatch } from "react-redux";
import CRUDUsers from "../components/CRUDUsers";
import { useEffect, useState } from "react";
import { changeTitle } from "../store/headerSlice";
import { useParams } from "react-router";
import type { user } from "../type";
import useData from "../hooks/useData";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

export default function EditUsers() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const {user: getUser, isLoading: isLoadingGet, errorMessage: errorMessageGet} = useData();
  const {editUser, isLoading: isLoadingEdit, errorMessage: errorMessageEdit} = useData();
  const [user, setUser] = useState<user>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Modifier un utilisateur"));
    const userId = params.id;
    if (userId) {
      (async () => {
        setUser(await getUser(Number(userId)));
      })()
    } else {
      navigate("/users");
    }
  }, []);

  const submit = async (user: user) => {
    const userId = params.id;
    if (user !== undefined && userId) {
      const isDone = await editUser(Number(userId),user);
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
        <p>{errorMessageGet ?? errorMessageEdit}</p>
      </Modal>
      <main className="p-2 flex justify-center items-center min-h-full">
        {
          user === undefined && errorMessageGet === undefined || isLoadingGet ? (
            <Loader isLoading/>
          ) : (
            <CRUDUsers user={user} submitFunc={submit} isLoading={isLoadingGet || isLoadingEdit}/>
          )
        }
      </main>
    </>
  )
}

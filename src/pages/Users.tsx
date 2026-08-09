import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../store/headerSlice";
import { Search, Plus, Image, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import type { user } from "../type";
import useData from "../hooks/useData";
import Modal from "../components/Modal";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading, errorMessage } = useData();
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState<Array<user>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Utilisateurs"));
  }, [])

  useEffect(() => {
    (async () => {
      const response = await users(search, 0);
      if (response) {
        setUsersList(response.users)
      } else {
        setModalIsOpen(true);
      }
    })();
  }, [search]);

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <main className="p-2 flex flex-col gap-3 min-h-full">
        <div className="flex justify-end items-center gap-2">
          <LoaderCircle className={`animate-spin ${isLoading ? "" : "hidden"}`} />
          <button onClick={() => navigate("add")} className="bg-blue-500"><Plus /></button>
          <IconInput Icon={<Search/>} onChange={(e) => setSearch(e.currentTarget.value)} type="text" placeholder="Recherche" className="w-fit"/>
        </div>
        <section className="flex-1">
          <div className="flex justify-around items-center p-3 border border-gray-300 mb-5 rounded-2xl font-bold text-xl">
            <p>ID</p>
            <p>Prénom</p>
            <p>Nom</p>
            <p>Email</p>
            <p>Avatar</p>
            <p>Est Admin</p>
          </div>
          <div className="flex flex-col gap-2">
            {usersList.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`edit/${user.id}`)}
                className="flex justify-around items-center p-3 border border-gray-200 rounded-xl cursor-pointer"
              >
                <p className="text-center">{user.id}</p>
                <p className="text-center">{user.first_name}</p>
                <p className="text-center">{user.last_name}</p>
                <p className="text-center">{user.email}</p>
                <button onClick={(event) => {
                  event.stopPropagation();
                  if (user.avatar)  window.open(user.avatar, '_blank');
                }} className="bg-blue-500"><Image/></button>
                <p className="text-center">{user.is_admin ? 'Oui' : 'Non'}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

import { Hash, Image, Key, Mail, User, Users, X } from "lucide-react";
import IconInput from "./IconInput";
import type { user } from "../type";
import { useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import { useNavigate, useParams } from "react-router";
import Modal from "./Modal";
import Loader from "./Loader";

export default function CRUDUsers({ user, submitFunc, isLoading }: { user?: user, submitFunc: (user: user) => void, isLoading: boolean}) {
  const { deleteUser, isLoading: isLoadingDelete, errorMessage } = useData();
  const params = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const isAdminRef = useRef<HTMLInputElement>(null);

  const onsubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const first_name = firstnameRef.current?.value;
    const last_name = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const avatar = avatarRef.current?.value;
    const is_admin = isAdminRef.current?.checked;
    if (user === undefined && !password) {
      return;
    }
    if (first_name && last_name && email && is_admin !== undefined) {
      submitFunc({ first_name, last_name, email, password, avatar, is_admin });
    }
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <div className="flex flex-col items-center">
        <form onSubmit={onsubmit} className="flex flex-col gap-4">
          <IconInput Icon={<Hash/>} hidden={user === undefined} defaultValue={user?.id} disabled className="w-full"/>
          <IconInput Icon={<User/>} ref={firstnameRef} placeholder="Prénom" defaultValue={user?.first_name} className="w-full"/>
          <IconInput Icon={<Users/>} ref={lastnameRef} placeholder="Nom de famille" defaultValue={user?.last_name} className="w-full"/>
          <IconInput Icon={<Mail/>} ref={emailRef} placeholder="Adresse Email" defaultValue={user?.email} type="email" className="w-full"/>
          <IconInput Icon={<Key />} ref={passwordRef} placeholder="Mot de passe" defaultValue={user?.password} type="password" minLength={6} className="w-full" hidden={ user !== undefined } />
          <div className="flex items-center gap-2">
            <p className="text-xl">Avatar</p>
            <IconInput Icon={<Image />} ref={avatarRef} type="file"/>
            <button type="button" className="bg-blue-500"><X/></button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl">Est admin</p>
            <IconInput type="checkbox" ref={isAdminRef} defaultChecked={user?.is_admin}/>
          </div>
          <button type="submit" disabled={isLoading} className="bg-blue-500">{user !== undefined ? "Modifier" : "Créer"}</button>
          <span className={`border border-gray-200 ${user !== undefined ? "" : "hidden"}`} />
          <button type="button" onClick={async () => {
            if (Number(params.id)) {
              const isDone = await deleteUser(Number(params.id));
              if (isDone) {
                navigate("/users");
              } else {
                setModalIsOpen(true);
              }
            };
          }} disabled={isLoading} className={`bg-red-500 ${user !== undefined ? "" : "hidden"}`}>Supprimer</button>
          <Loader isLoading={isLoadingDelete || isLoading} />
        </form>
      </div>
    </>
  )
}

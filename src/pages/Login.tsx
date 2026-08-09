import { Key, LoaderCircle, User } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import { useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import Modal from "../components/Modal";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, errorMessage } = useData();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const connection = async (event: SyntheticEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      const isDone =  await login(email, password);
      if (isDone) {
        navigate("/users");
      } else {
        setModalIsOpen(true);
      }
    };

  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <main className="min-h-full flex justify-center items-center">
        <div
          className={`flex flex-col justify-center items-center gap-6 p-5 rounded-2xl`}
        >
          <h1 className="text-center text-4xl">Connexion</h1>
          <form onSubmit={connection} className="flex flex-col gap-4 w-80">
            <IconInput Icon={<User/>} ref={emailRef} type="email" placeholder="Adresse Email" className="w-full"/>
            <IconInput Icon={<Key/>} ref={passwordRef} type="password" placeholder="Mot de passe" className="w-full"/>
            <button
              type="submit"
              className="bg-blue-500 flex justify-center items-center"
            >
              {
                isLoading ? <LoaderCircle className="animate-spin"/> : "Se connecter"
              }
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../store/headerSlice";
import { Image, LoaderCircle, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import type { event } from "../type";
import useData from "../hooks/useData";
import Modal from "../components/Modal";

export default function Events() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, isLoading, errorMessage } = useData();
  const [search, setSearch] = useState("");
  const [eventsList, setEventsList] = useState<Array<event>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("Évènement"));
  }, [])

  useEffect(() => {
    (async () => {
      const response = await events(search, 0);
      if (response) {
        setEventsList(response.events)
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
            <p>Nom</p>
            <p>localisation</p>
            <p>IBAN</p>
            <p>Image</p>
            <p>Est actif</p>
          </div>
          <div className="flex flex-col gap-2">
            {eventsList.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`edit/${event.id}`)}
                className="flex justify-around items-center p-3 border border-gray-200 rounded-xl cursor-pointer"
              >
                <p className="text-center">{event.id}</p>
                <p className="text-center">{event.name}</p>
                <p className="text-center">{event.location}</p>
                <p className="text-center">{event.iban}</p>
                <button onClick={(e) => {
                  e.stopPropagation();
                  if (event.image)  window.open(event.image, '_blank');
                }} className="bg-blue-500"><Image/></button>
                <p className="text-center">{event.is_active ? 'Oui' : 'Non'}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

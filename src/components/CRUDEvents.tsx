import { Hash, Image, MapPin, PiggyBank, SquarePen, X } from "lucide-react";
import IconInput from "./IconInput";
import type { event } from "../type";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import Loader from "./Loader";
import Modal from "./Modal";

export default function CRUDEvents({ event, submitFunc, isLoading }: { event?: event, submitFunc: (event: event) => void, isLoading: boolean }) {
  const { deleteEvent, isLoading: isLoadingDelete, errorMessage } = useData();
  const params = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const isActiveRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const ibanRef = useRef<HTMLInputElement>(null);

  const onsubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const location = locationRef.current?.value;
    const is_active = isActiveRef.current?.checked;
    const image = imageRef.current?.value;
    const iban = ibanRef.current?.value;

    if (name && location && is_active && iban) {
      submitFunc({ name, location, is_active, image ,iban });
    }
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <div className="flex flex-col items-center">
        <form onSubmit={onsubmit} className="flex flex-col gap-4">
          <IconInput Icon={<Hash />} hidden={event === undefined} defaultValue={event?.id} disabled className="w-full"/>
          <IconInput Icon={<SquarePen/>} ref={nameRef} placeholder="Nom" defaultValue={event?.name} className="w-full"/>
          <IconInput Icon={<MapPin/>} ref={locationRef} placeholder="Localisation" defaultValue={event?.location} className="w-full"/>
          <div className="flex items-center gap-2">
            <p className="text-xl">Est actif</p>
            <input type="checkbox" ref={isActiveRef} defaultChecked={event?.is_active} />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl">Avatar</p>
            <IconInput Icon={<Image />} ref={imageRef} type="file" />
            <button type="button" className="bg-blue-500"><X/></button>
          </div>
          <IconInput Icon={<PiggyBank/>} ref={ibanRef} placeholder="IBAN" defaultValue={event?.iban} className="w-full"/>
          <button type="submit" className="bg-blue-500">{event !== undefined ? "Modifier" : "Créer"}</button>
          <span className={`border border-gray-200 ${event !== undefined ? "" : "hidden"}`} />
          <button type="button" onClick={async () => {
            if (Number(params.id)) {
              const isDone = await deleteEvent(Number(params.id));
              if (isDone) {
                navigate("/events");
              } else {
                setModalIsOpen(true);
              }
            }
          }} disabled={isLoading} className={`bg-red-500 ${event !== undefined ? "" : "hidden"}`}>Supprimer</button>
          <Loader isLoading={isLoadingDelete || isLoading} />
        </form>
      </div>
    </>
  )
}

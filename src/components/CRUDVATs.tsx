import { Code, TrendingUp} from "lucide-react";
import IconInput from "./IconInput";
import type { vat } from "../type";
import { useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import Loader from "./Loader";
import Modal from "./Modal";
import { useNavigate, useParams } from "react-router";

export default function CRUDVATs({ vat, submitFunc, isLoading }: { vat?: vat, submitFunc: (vat: vat) => void, isLoading: boolean }) {
  const { deleteVat, isLoading: isLoadingDelete, errorMessage } = useData();
  const params = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const typeRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);

  const onsubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const type = typeRef.current?.value;
    const rate = rateRef.current?.value;

    if (type && rate) {
      submitFunc({ type, rate: Number(rate) });
    }
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <div className="flex flex-col items-center">
        <form onSubmit={onsubmit} className="flex flex-col gap-4">
          <IconInput Icon={<Code />} ref={typeRef} placeholder="Type" defaultValue={vat?.type} className="w-full" disabled={vat !== undefined} />
          <IconInput Icon={<TrendingUp/>} ref={rateRef} placeholder="Taux" type="number" defaultValue={vat?.rate} className="w-full"/>
          <button type="submit" className="bg-blue-500">{vat !== undefined ? "Modifier" : "Créer"}</button>
          <span className={`border border-gray-200 ${vat !== undefined ? "" : "hidden"}`} />
          <button type="button" onClick={async () => {
            if (params.id) {
              const isDone = await deleteVat(params.id);
              if (isDone) {
                navigate("/vats");
              } else {
                setModalIsOpen(true);
              }
            }
          }} className={`bg-red-500 ${vat !== undefined ? "" : "hidden"}`}>Supprimer</button>
          <Loader isLoading={isLoadingDelete || isLoading} />
        </form>
      </div>
    </>
  )
}

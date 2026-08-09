import { Edit, Hash, Image, X} from "lucide-react";
import IconInput from "./IconInput";
import { type category, type vat } from "../type";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import Loader from "./Loader";
import Modal from "./Modal";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function CRUDCategories({ category, submitFunc, isLoading }: { category?: category, submitFunc: (category: category, picture: File | undefined) => void, isLoading: boolean}) {
  const { vats, isLoading: isLoadingVats, errorMessage: errorMessageVats } = useData();
  const { deleteCateogry, isLoading: isLoadingDelete, errorMessage: errorMessageDelete } = useData();
  const params = useParams();
  const navigate = useNavigate();

  const labelRef = useRef<HTMLInputElement>(null);
  const vatRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const [vatsList, setVatsLists] = useState<Array<vat>>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onsubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const label = labelRef.current?.value;
    const vat_type = vatRef.current?.value;
    const picture = pictureRef.current?.files?.[0];

    if (label && vat_type) {
      submitFunc({ label, vat_type, picture: category?.picture }, picture);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await vats("", 0);
      setVatsLists(response?.vats);
    })()
  }, []);

  if (vatsList === undefined && errorMessageVats === undefined || isLoadingVats) return <Loader isLoading/>

  return (
    <>
      <Modal modalIsOpen={modalIsOpen || errorMessageVats !== undefined} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessageVats ?? errorMessageDelete}</p>
      </Modal>
      <div className="flex flex-col items-center">
        <form onSubmit={onsubmit} className="flex flex-col gap-4">
          <IconInput Icon={<Hash />} hidden={category === undefined} disabled defaultValue={category?.id} className={ `w-full`} />
          <IconInput ref={labelRef} Icon={<Edit />} placeholder="Label" defaultValue={category?.label} className="w-full" />
          <div className="flex items-center gap-2">
            <p className="text-xl">TVA</p>
            <select ref={vatRef} className="w-full">
              {
                vatsList?.map((vat) => <option key={vat.type} value={vat.type}>{vat.type} ({vat.rate})</option>)
              }
            </select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl">Image</p>
            <IconInput ref={pictureRef} Icon={<Image />} type="file" />
            <button type="button" onClick={() => {
              if (pictureRef.current?.value) {
                pictureRef.current.value = "";
              }
            }} className="bg-blue-500"><X/></button>
            <button type="button" onClick={() => {
              if (category?.picture) window.open(category.picture, '_blank');
            }} className={category?.picture ? 'bg-blue-500' : 'pointer-events-none'}><Image/></button>
          </div>
          <button type="submit" className="bg-blue-500">{category !== undefined ? "Modifier" : "Créer"}</button>
          <span className={`border border-gray-200 ${category !== undefined ? "" : "hidden"}`} />
          <button onClick={async () => {
            if (Number(params.id)) {
              const isDone = await deleteCateogry(Number(params.id));
              if (isDone) {
                navigate("/categories");
              } else {
                setModalIsOpen(true);
              }
            };
          }} type="button" className={`bg-red-500 ${category !== undefined ? "" : "hidden"}`}>Supprimer</button>
          <Loader isLoading={isLoading || isLoadingDelete} />
        </form>
      </div>
    </>
  )
}

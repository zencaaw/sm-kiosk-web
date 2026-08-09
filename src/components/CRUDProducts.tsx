import { Edit, Euro, Hash, Image, X} from "lucide-react";
import IconInput from "./IconInput";
import type { category, product } from "../type";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import useData from "../hooks/useData";
import Loader from "./Loader";

export default function CRUDProducts({ product, submitFunc, isLoading }: { product?: product, submitFunc: (product: product) => void, isLoading: boolean }) {
  const { categories, isLoading: isLoadingCategories } = useData();
  const [categoriesList, setCategoriesList] = useState<Array<category>>([]);

  const labelRef = useRef<HTMLInputElement>(null);
  const isAvailableRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const eventIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const response = await categories("", 0);
      if (response) {
        setCategoriesList(response.categories);
      }
    })();
  }, []);

  const onsubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const label = labelRef.current?.value;
    const is_available = isAvailableRef.current?.checked;
    const excl_vat_price = priceRef.current?.value;
    const categoryId = categoryRef.current?.value;
    const picture = imageRef.current?.value;
    const eventId = eventIdRef.current?.value;

    if (label && is_available !== undefined && excl_vat_price && categoryId && eventId) {
      submitFunc({
        label,
        is_available,
        excl_vat_price: Number(excl_vat_price),
        picture,
        event_id: Number(eventId),
        category: {
          id: Number(categoryId),
          vat: {
            type: ""
          }
        }
      });
    }
  }


  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onsubmit} className="flex flex-col gap-4">
        <IconInput Icon={<Hash />} defaultValue={product?.id} className="w-full" disabled hidden={product === undefined} />
        <IconInput Icon={<Edit />} ref={labelRef} placeholder="Label" type="text" defaultValue={product?.label} className="w-full" />
        <div className="flex items-center gap-2">
          <p className="text-xl">Est disponible</p>
          <input type="checkbox" ref={isAvailableRef} defaultChecked={product?.is_available} />
        </div>
        <IconInput Icon={<Euro />} ref={priceRef} placeholder="Prix hors taxe" type="number" step={0.01} defaultValue={product?.excl_vat_price} className="w-full" />
        <IconInput Icon={<Hash />} ref={eventIdRef} placeholder="Id évènement" type="number" defaultValue={product?.event_id} className="w-full" />
        <select ref={categoryRef} defaultValue={product?.category.id} className="w-full">
          {
            categoriesList.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))
          }
        </select>
        <div className="flex items-center gap-2">
          <p className="text-xl">Image</p>
          <IconInput Icon={<Image />} ref={imageRef} type="file" />
          <button type="button" className="bg-blue-500"><X/></button>
        </div>
        <button type="submit" className="bg-blue-500">{product !== undefined ? "Modifier" : "Créer"}</button>
        <span className={`border border-gray-200 ${product !== undefined ? "" : "hidden"}`} />
        <button type="button" className={`bg-red-500 ${product !== undefined ? "" : "hidden"}`}>Supprimer</button>
        <Loader isLoading={isLoadingCategories || isLoading} />
      </form>
    </div>
  )
}

import { Edit, Euro, Hash, Image, X} from "lucide-react";
import IconInput from "./IconInput";
import type { product } from "../type";

export default function CRUDProducts({ product }: { product?: product }) {


  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-4">
        <IconInput Icon={<Hash />} defaultValue={product?.id} className="w-full" disabled hidden={product === undefined} />
        <IconInput Icon={<Edit />} placeholder="Label" type="text" defaultValue={product?.label} className="w-full" />
        <div className="flex items-center gap-2">
          <p className="text-xl">Est disponible</p>
          <input type="checkbox" defaultChecked={product?.is_available} />
        </div>
        <IconInput Icon={<Euro />} placeholder="Prix hors taxe" type="number" step={0.01} defaultValue={product?.excl_vat_price} className="w-full" />
        <select>
          <option value={"1"}>nourriture</option>
        </select>
        <div className="flex items-center gap-2">
          <p className="text-xl">Image</p>
          <IconInput Icon={<Image />} type="file" defaultValue={product?.picture} />
          <button type="button" className="bg-blue-500"><X/></button>
        </div>
        <button type="button" className="bg-blue-500">{product !== undefined ? "Modifier" : "Créer"}</button>
        <span className={`border border-gray-200 ${product !== undefined ? "" : "hidden"}`} />
        <button type="button" className={`bg-red-500 ${product !== undefined ? "" : "hidden"}`}>Supprimer</button>
      </form>
    </div>
  )
}

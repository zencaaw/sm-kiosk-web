import { Code, TrendingUp} from "lucide-react";
import IconInput from "./IconInput";
import type { vat } from "../type";

export default function CRUDVATs({vat}: {vat?: vat}) {

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-4">
        <IconInput Icon={<Code />} placeholder="Type" defaultValue={vat?.type} className="w-full" disabled={vat !== undefined} />
        <IconInput Icon={<TrendingUp/>} placeholder="Taux" type="number" defaultValue={vat?.rate} className="w-full"/>
        <button type="button" className="bg-blue-500">{vat !== undefined ? "Modifier" : "Créer"}</button>
        <span className={`border border-gray-200 ${vat !== undefined ? "" : "hidden"}`} />
        <button type="button" className={`bg-red-500 ${vat !== undefined ? "" : "hidden"}`}>Supprimer</button>
      </form>
    </div>
  )
}

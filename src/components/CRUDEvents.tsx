import { Hash, Image, MapPin, PiggyBank, SquarePen, X } from "lucide-react";
import IconInput from "./IconInput";
import type { event } from "../type";

export default function CRUDEvents({event}: {event?: event}) {

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-4">
        <IconInput Icon={<Hash />} hidden={event === undefined} defaultValue={event?.id} disabled className="w-full"/>
        <IconInput Icon={<SquarePen/>} placeholder="Nom" defaultValue={event?.name} className="w-full"/>
        <IconInput Icon={<MapPin/>} placeholder="Localisation" defaultValue={event?.location} className="w-full"/>
        <div className="flex items-center gap-2">
          <p className="text-xl">Est actif</p>
          <input type="checkbox" defaultChecked={event?.is_active} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl">Avatar</p>
          <IconInput Icon={<Image />} type="file" defaultValue={event?.image} />
          <button type="button" className="bg-blue-500"><X/></button>
        </div>
        <IconInput Icon={<PiggyBank/>} placeholder="IBAN" defaultValue={event?.iban} className="w-full"/>
        <button type="button" className="bg-blue-500">{event !== undefined ? "Modifier" : "Créer"}</button>
        <span className={`border border-gray-200 ${event !== undefined ? "" : "hidden"}`} />
        <button type="button" className={`bg-red-500 ${event !== undefined ? "" : "hidden"}`}>Supprimer</button>
      </form>
    </div>
  )
}

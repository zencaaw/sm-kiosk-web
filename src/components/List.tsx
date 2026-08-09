import { useNavigate } from "react-router"
import type { category, event, product, user, vat } from "../type";

export default function List({ lhead, lrow }: { lhead: Array<string>, lrow: Array<(user | category | vat | product | event)> }) {
  const navigate = useNavigate();

  return (
    <section className="flex-1 text-xl">
      <div className="flex justify-around items-center p-3 border border-gray-300 mb-5 rounded-2xl">
        {lhead.map((lh, index) => <p key={index} className="font-bold text-center">{lh}</p>)}
      </div>
      <div className="flex flex-col gap-2 ">
        {lrow.map((lr, lrIndex) => <div
          key={lrIndex}
          onClick={() => navigate(`edit/${lr[0]}`)}
          className="flex justify-around border rounded-xl border-gray-200 p-3 cursor-pointer">{lr.map((ld, ldIndex) =>
          <p key={`${lrIndex}${ldIndex}`} className=" text-center">{ld}</p>
        )}</div>)}
      </div>
    </section>
  )
}

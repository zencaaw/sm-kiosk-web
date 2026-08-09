import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export default function Pagination({ total, offset, setOffset, pageSize = 20 }: 
    {total: number, offset: number, setOffset: Dispatch<SetStateAction<number>>, pageSize?: number}) {
  return (
    <div className="flex gap-2 justify-end">
      <button
        disabled={offset === 0}
        onClick={() => setOffset(offset - pageSize)}
        className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft />
      </button>
      <button
        disabled={total <= offset + pageSize}
        onClick={() => setOffset(offset + pageSize)}
        className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
import { X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import type { JSX } from "react/jsx-dev-runtime";

export default function Modal({ children, modalIsOpen, setModalIsOpen }:
  { children: JSX.Element, modalIsOpen: boolean, setModalIsOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    createPortal(
      <div className={`z-10 fixed w-full h-full top-0 left-0 bg-black/30 ${modalIsOpen ? "" : "opacity-0 pointer-events-none"} duration-300`}>
        <div className={`z-20 absolute left-1/2 top-1/2 -translate-1/2 shadow border border-gray-100 p-5 bg-white rounded-2xl ${modalIsOpen ? "" : "translate-y-5"} duration-300`}>
          <button onClick={() => setModalIsOpen(false)} className="bg-white absolute -right-15 top-1/2 -translate-y-1/2 border border-gray-100 shadow"><X color="black" /></button>
          {children}
        </div>
      </div>
      , document.body)
  )
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../store/headerSlice";
import { Search, Plus, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import type { vat } from "../type";
import useData from "../hooks/useData";
import Modal from "../components/Modal";

export default function VATs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vats, isLoading, errorMessage } = useData();
  const [search, setSearch] = useState("");
  const [vatsList, setVatsList] = useState<Array<vat>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeTitle("TVA"));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await vats(search, 0);
      if (response) {
        setVatsList(response.vats);
      } else {
        setModalIsOpen(true);
      }
    })();
  }, [search]);

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <main className="p-2 flex flex-col gap-3 min-h-full">
        <div className="flex justify-end items-center gap-2">
          <LoaderCircle className={`animate-spin ${isLoading ? "" : "hidden"}`} />
          <button onClick={() => navigate("add")} className="bg-blue-500"><Plus /></button>
          <IconInput Icon={<Search/>} onChange={(e) => setSearch(e.currentTarget.value)} type="text" placeholder="Recherche" className="w-fit"/>
        </div>
        <section className="flex-1">
          <div className="flex justify-around items-center p-3 border border-gray-300 mb-5 rounded-2xl font-bold text-xl">
            <p>Type</p>
            <p>Taux</p>
          </div>
          <div className="flex flex-col gap-2">
            {vatsList.map((vat) => (
              <div
                key={vat.type}
                onClick={() => navigate(`edit/${vat.type}`)}
                className="flex justify-around items-center p-3 border border-gray-200 rounded-xl cursor-pointer"
              >
                <p className="text-center">{vat.type}</p>
                <p className="text-center">{vat.rate}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="flex gap-2 justify-end">
          <button className="bg-blue-500"><ChevronLeft/></button>
          <button className="bg-blue-500"><ChevronRight/></button>
        </div>
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../store/headerSlice";
import { Search, Plus, LoaderCircle, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import useData from "../hooks/useData";
import type { category } from "../type";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isLoading, errorMessage } = useData();
  const [search, setSearch] = useState("");
  const [categoriesList, setCategoriesList] = useState<Array<category>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(changeTitle("Catégories"));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await categories(search, offset);
      if (response) {
        setCategoriesList(response.categories);
        setTotal(response.total);
      } else {
        setModalIsOpen(true);
      }
    })();
  }, [search, offset]);

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <p>{errorMessage}</p>
      </Modal>
      <main className="p-2 flex flex-col gap-3 min-h-full">
        <div className="flex justify-end items-center gap-2">
          <LoaderCircle className={`animate-spin ${isLoading ? "" : "hidden"}`} />
          <button onClick={() => navigate("add")} className="bg-blue-500"><Plus /></button>
          <IconInput Icon={<Search/>} onChange={(e) => { setSearch(e.currentTarget.value); setOffset(0); }} type="text" placeholder="Recherche" className="w-fit"/>
        </div>
        <section className="flex-1">
          <div className="flex justify-around items-center p-3 border border-gray-300 mb-5 rounded-2xl font-bold text-xl">
            <p>Id</p>
            <p>Label</p>
            <p>Image</p>
            <p>TVA</p>
          </div>
          <div className="flex flex-col gap-2">
            {categoriesList.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(`edit/${category.id}`)}
                className="flex justify-around items-center p-3 border border-gray-200 rounded-xl cursor-pointer"
              >
                <p className="text-center">{category.id}</p>
                <p className="text-center">{category.label}</p>
                <button onClick={(e) => {
                  e.stopPropagation();
                  if (category.picture)  window.open(category.picture, '_blank');
                }} className="bg-blue-500"><Image/></button>
                <p className="text-center">{category.vat_type}</p>
              </div>
            ))}
          </div>
        </section>
        <Pagination total={total} offset={offset} setOffset={setOffset} />
      </main>
    </>
  );
}

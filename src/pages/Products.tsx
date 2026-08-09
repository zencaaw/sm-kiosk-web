import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../store/headerSlice";
import { Image, LoaderCircle, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router";
import IconInput from "../components/IconInput";
import useData from "../hooks/useData";
import type { product } from "../type";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isLoading, errorMessage } = useData();
  const [search, setSearch] = useState("");
  const [productsList, setProductsList] = useState<Array<product>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(changeTitle("Produits"));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await products(search, offset);
      if (response) {
        setProductsList(response.products);
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
            <p>Prix hors taxe</p>
            <p>Est disponible</p>
            <p>Image</p>
            <p>Id catégorie</p>
            <p>Id évènement</p>
          </div>
          <div className="flex flex-col gap-2">
            {productsList.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`edit/${product.id}`)}
                className="flex justify-around items-center p-3 border border-gray-200 rounded-xl cursor-pointer"
              >
                <p className="text-center">{product.id}</p>
                <p className="text-center">{product.label}</p>
                <p className="text-center">{product.excl_vat_price}</p>
                <p className="text-center">{product.is_available ? 'Oui' : 'Non'}</p>
                <button onClick={(event) => {
                  event.stopPropagation();
                  if (product.picture)  window.open(product.picture, '_blank');
                }} className="bg-blue-500"><Image/></button>
                <p className="text-center">{product.category.id}</p>
                <p className="text-center">{product.event_id}</p>
              </div>
            ))}
          </div>
        </section>
        <Pagination total={total} offset={offset} setOffset={setOffset} />
      </main>
    </>
  );
}

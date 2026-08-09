import { useState } from "react"
import {
  getURL as getURLAPI,
  uploadImage as uploadImageAPI,
  login as loginAPI,
  createUser as createUserAPI,
  createEvent as createEventAPI,
  createCategory as createCategoryAPI,
  createVat as createVatAPI,
  createProduct as createProductAPI,
  users as usersAPI,
  user as userAPI,
  events as eventsAPI,
  event as eventAPI,
  vats as vatsAPI,
  vat as vatAPI,
  categories as categoriesAPI,
  category as categoryAPI,
  products as productsAPI,
  product as productAPI,
  deleteUser as deleteUserAPI,
  deleteEvent as deleteEventAPI,
  deleteVat as deleteVatAPI,
  deleteCategory as deleteCategoryAPI,
  deletProduct as deletProductAPI,
  editUser as editUserAPI,
  editEvent as editEventAPI,
  editVat as editVatAPI,
  editCategory as editCategoryAPI,
  editProduct as editProductAPI,
} from "../connect";
import Cookies from 'js-cookie'
import type { category, event, product, user, vat } from "../type";
import { useNavigate } from "react-router";
import axios from "axios";

export default function useData() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const checkError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status) {
        if (status === 400) {
          setErrorMessage("Requête invalide !");
        } else if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          setErrorMessage("Accès interdit !");
        } else if (status === 404) {
          setErrorMessage("Ressource non trouvée !");
        } else if (status === 409) {
          setErrorMessage("Conflit de données !");
        } else if (status === 422) {
          setErrorMessage("Données invalides !");
        } else if (status === 500) {
          setErrorMessage("Erreur serveur !");
        } else {
          setErrorMessage("Code erreur inconnue !");
        }
      } else {
        setErrorMessage("Erreur serveur !");
      }
    } else {
      setErrorMessage(`Erreur inconnue ! ${error}`);
    }
  }

  // CLOUDFLARE

  const getURL = async () => {
    try {
      setIsloading(true);
      const response = await getURLAPI(Cookies.get("token") ?? "");
      return response;
    } catch (error) {
      checkError(error);
    } finally {
      setIsloading(false);
    }
  }

  const uploadImage = async (formData: FormData) => {
    setIsloading(true);
    const res = await getURL();
    await uploadImageAPI(res?.data.uploadURL, formData);
    setIsloading(false);
    return res?.data.id;
  };

  // POST
  const login = async (email: string, password: string) => {
    try {
      setIsloading(true);
      const response = await loginAPI(email, password);
      if (response.data.user.is_admin === false) {
        setErrorMessage("Connexion non administrateur !");
        return false
      }

      Cookies.set("token", response.data.token, { expires: 7 });
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const createUser = async (user: user, avatar: File | undefined) => {
    try {
      setIsloading(true);
      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        const avatarId = await uploadImage(formData);
        user.avatar = avatarId;
      }
      await createUserAPI(Cookies.get("token") ?? "", user);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const createEvent = async (event: event, image: File | undefined) => {
    try {
      setIsloading(true);
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const imageId = await uploadImage(formData);
        event.image = imageId;
      }
      await createEventAPI(Cookies.get("token") ?? "", event);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const createCategory = async (category: category, picture: File | undefined) => {
    try {
      setIsloading(true);
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
        const pictureId = await uploadImage(formData);
        category.picture = pictureId;
      }
      await createCategoryAPI(Cookies.get("token") ?? "", category);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const createVat = async (vat: vat) => {
    try {
      setIsloading(true);
      await createVatAPI(Cookies.get("token") ?? "", vat);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const createProduct = async (product: product, picture: File | undefined) => {
    try {
      setIsloading(true);
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
        const pictureId = await uploadImage(formData);
        product.picture = pictureId;
      }
      await createProductAPI(Cookies.get("token") ?? "", product);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  // GET
  const users = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await usersAPI(Cookies.get("token") ?? "", search, offset);
      const users: Array<user> = response.data.data;
      const total: number = response.data.pagination.total
      return {users, total};
    } catch (error) {
      checkError(error);
      return null;
    } finally {
      setIsloading(false);
    }
  }

  const user = async (id: number) => {
    try {
      setIsloading(true);
      const response = await userAPI(Cookies.get("token") ?? "", id);
      const user: user = response.data;
      return user;
    } catch (error) {
      checkError(error);
      return undefined;
    } finally {
      setIsloading(false);
    }
  }

  const event = async (id: number) => {
    try {
      setIsloading(true);
      const response = await eventAPI(Cookies.get("token") ?? "", id);
      const event: event = response.data;
      return event;
    } catch (error) {
      checkError(error);
      return undefined;
    } finally {
      setIsloading(false);
    }
  }

  const vat = async (type: string) => {
    try {
      setIsloading(true);
      const response = await vatAPI(Cookies.get("token") ?? "", type);
      const vat: vat = response.data;
      return vat;
    } catch (error) {
      checkError(error);
      return undefined;
    } finally {
      setIsloading(false);
    }
  }

  const events = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await eventsAPI(Cookies.get("token") ?? "", search, offset);
      const events: Array<event> = response.data.data;
      const total: number = response.data.pagination.total
      return {events, total};
    } catch (error) {
      checkError(error);
      return null;
    } finally {
      setIsloading(false);
    }
  }

  const vats = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await vatsAPI(Cookies.get("token") ?? "", search, offset);
      const vats: Array<vat> = response.data.data;
      const total: number = response.data.pagination.total
      return {vats, total};
    } catch (error) {
      checkError(error);
      return null;
    } finally {
      setIsloading(false);
    }
  }

  const categories = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await categoriesAPI(Cookies.get("token") ?? "", search, offset);
      const categories: Array<category> = response.data.data;
      const total: number = response.data.pagination.total
      return {categories, total};
    } catch (error) {
      checkError(error);
      return null;
    } finally {
      setIsloading(false);
    }
  }

  const category = async (id: number) => {
    try {
      setIsloading(true);
      const response = await categoryAPI(Cookies.get("token") ?? "", id);
      const category: category = response.data;
      return category;
    } catch (error) {
      checkError(error);
      return undefined;
    } finally {
      setIsloading(false);
    }
  }

  const products = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await productsAPI(Cookies.get("token") ?? "", search, offset);
      const products: Array<product> = response.data.data;
      const total: number = response.data.pagination.total;
      return {products, total};
    } catch (error) {
      checkError(error);
      return null;
    } finally {
      setIsloading(false);
    }
  }

  const product = async (id: number) => {
    try {
      setIsloading(true);
      const response = await productAPI(Cookies.get("token") ?? "", id);
      const product: product = response.data;
      return product;
    } catch (error) {
      checkError(error);
      return undefined;
    } finally {
      setIsloading(false);
    }
  }

  // DELETE
  const deleteUser = async (id: number) => {
    try {
      setIsloading(true);
      await deleteUserAPI(Cookies.get("token") ?? "", id);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const deleteEvent = async (id: number) => {
    try {
      setIsloading(true);
      await deleteEventAPI(Cookies.get("token") ?? "", id);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const deleteVat = async (type: string) => {
    try {
      setIsloading(true);
      await deleteVatAPI(Cookies.get("token") ?? "", type);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const deleteCateogry = async (id: number) => {
    try {
      setIsloading(true);
      await deleteCategoryAPI(Cookies.get("token") ?? "", id);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setIsloading(true);
      await deletProductAPI(Cookies.get("token") ?? "", id);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  // PATCH
  const editUser = async (id: number, user: user, avatar: File | undefined) => {
    try {
      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        const avatarId = await uploadImage(formData);
        user.avatar = avatarId;
      }
      setIsloading(true);
      await editUserAPI(Cookies.get("token") ?? "", id, user);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const editEvent = async (id: number, event: event, image: File | undefined) => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const imageId = await uploadImage(formData);
        event.image = imageId;
      }
      setIsloading(true);
      await editEventAPI(Cookies.get("token") ?? "", id, event);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const editVat = async (type: string, vat: vat) => {
    try {
      setIsloading(true);
      await editVatAPI(Cookies.get("token") ?? "", type, vat);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const editCategory = async (id: number, category: category, picture: File | undefined) => {
    try {
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
        const pictureId = await uploadImage(formData);
        category.picture = pictureId;
      }
      setIsloading(true);
      await editCategoryAPI(Cookies.get("token") ?? "", id, category);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  const editProduct = async (id: number, product: product, picture: File | undefined) => {
    try {
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
        const pictureId = await uploadImage(formData);
        product.picture = pictureId;
      }
      setIsloading(true);
      await editProductAPI(Cookies.get("token") ?? "", id, product);
      return true;
    } catch (error) {
      checkError(error);
      return false;
    } finally {
      setIsloading(false);
    }
  }

  return {
    login,
    createUser,
    createEvent,
    createCategory,
    createVat,
    createProduct,
    users,
    user,
    event,
    vat,
    events,
    vats,
    categories,
    category,
    products,
    product,
    deleteUser,
    deleteEvent,
    deleteVat,
    deleteCateogry,
    deleteProduct,
    editUser,
    editEvent,
    editVat,
    editCategory,
    editProduct,
    isLoading,
    errorMessage
  }
}

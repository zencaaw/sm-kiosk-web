import { useState } from "react"
import {
  login as loginAPI,
  createUser as createUserAPI,
  createEvent as createEventAPI,
  createCategory as createCategoryAPI,
  users as usersAPI,
  user as userAPI,
  events as eventsAPI,
  vats as vatsAPI,
  categories as categoriesAPI,
  category as categoryAPI,
  products as productsAPI,
  deleteUser as deleteUserAPI,
  deleteCategory as deleteCategoryAPI,
  editUser as editUserAPI,
  editCategory as editCategoryAPI,
} from "../connect";
import Cookies from 'js-cookie'
import type { category, event, product, user, vat } from "../type";
import { useNavigate } from "react-router";

export default function useData() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  // POST
  const login = async (email: string, password: string) => {
    try {
      setIsloading(true);
      const response = await loginAPI(email, password);
      if (response.data.user.is_admin === false) {
        setErrorMessage("Connexion non administrateur !");
        return false
      }
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 7 });
        return true;
      }
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const createUser = async (user: user) => {
    try {
      setIsloading(true);
      const response = await createUserAPI(Cookies.get("token") ?? "", user);
      if (response.status === 201) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const createEvent = async (event: event) => {
    try {
      setIsloading(true);
      const response = await createEventAPI(Cookies.get("token") ?? "", event);
      if (response.status === 201) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const createCategory = async (category: category) => {
    try {
      setIsloading(true);
      const response = await createCategoryAPI(Cookies.get("token") ?? "", category);
      if (response.status === 201) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  // GET
  const users = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await usersAPI(Cookies.get("token") ?? "", search, offset);
      if (response.status === 401) {
        Cookies.remove("token");
        navigate("/login");
        return;
      }
      if (response.status === 200) {
        const users: Array<user> = response.data.data;
        const total: number = response.data.total
        return {users, total};
      }
      setErrorMessage(response.statusText);
      return null;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const user = async (id: number) => {
    try {
      setIsloading(true);
      const response = await userAPI(Cookies.get("token") ?? "", id);
      if (response.status === 200) {
        const user: user = response.data;
        return user;
      }
      setErrorMessage(response.statusText);
      return undefined;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const events = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await eventsAPI(Cookies.get("token") ?? "", search, offset);
      if (response.status === 200) {
        const events: Array<event> = response.data.data;
        const total: number = response.data.total
        return {events, total};
      }
      setErrorMessage(response.statusText);
      return null;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const vats = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await vatsAPI(Cookies.get("token") ?? "", search, offset);
      if (response.status === 200) {
        const vats: Array<vat> = response.data.data;
        const total: number = response.data.total
        return {vats, total};
      }
      setErrorMessage(response.statusText);
      return null;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const categories = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await categoriesAPI(Cookies.get("token") ?? "", search, offset);
      if (response.status === 200) {
        const categories: Array<category> = response.data.data;
        const total: number = response.data.total
        return {categories, total};
      }
      setErrorMessage(response.statusText);
      return null;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const category = async (id: number) => {
    try {
      setIsloading(true);
      const response = await categoryAPI(Cookies.get("token") ?? "", id);
      if (response.status === 200) {
        const category: category = response.data;
        return category;
      }
      setErrorMessage(response.statusText);
      return undefined;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const products = async (search: string, offset: number) => {
    try {
      setIsloading(true);
      const response = await productsAPI(Cookies.get("token") ?? "", search, offset);
      if (response.status === 200) {
        const products: Array<product> = response.data.data;
        const total: number = response.data.total
        return {products, total};
      }
      setErrorMessage(response.statusText);
      return null;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  // DELETE
  const deleteUser = async (id: number) => {
    try {
      setIsloading(true);
      const response = await deleteUserAPI(Cookies.get("token") ?? "", id);
      if (response.status === 200) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const deleteCateogry = async (id: number) => {
    try {
      setIsloading(true);
      const response = await deleteCategoryAPI(Cookies.get("token") ?? "", id);
      if (response.status === 200) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  // PATCH
  const editUser = async (id: number, user: user) => {
    try {
      setIsloading(true);
      const response = await editUserAPI(Cookies.get("token") ?? "", id, user);
      if (response.status === 200) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  const editCategory = async (id: number, category: category) => {
    try {
      setIsloading(true);
      const response = await editCategoryAPI(Cookies.get("token") ?? "", id, category);
      if (response.status === 200) return true;
      setErrorMessage(response.statusText);
      return false;
    } catch {
      setErrorMessage("Erreur serveur");
    } finally {
      setIsloading(false);
    }
  }

  return {
    login,
    createUser,
    createEvent,
    createCategory,
    users,
    user,
    events,
    vats,
    categories,
    category,
    products,
    deleteUser,
    deleteCateogry,
    editUser,
    editCategory,
    isLoading,
    errorMessage
  }
}

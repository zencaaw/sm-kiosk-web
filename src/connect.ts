import axios from "axios";
import type {
  user as userType,
  event as eventType,
  vat as vatType,
  category as categoryType,
  product as productType
} from "./type";

const url = "http://localhost:3001/v1/";

// CLOUDFLARE
export const getURL = async (token: string) => {
  const response = await axios.get(
    `${url}img-upload`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const uploadImage = async (url: string, formData: FormData) => {
  const response = await axios.post(url, formData, {
  });
  return response;
};

// POST
export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${url}login`,
    {
      email: email,
      password: password,
    }
  );
  return response;
};

export const createUser = async (token: string, user: userType) => {
  const response = await axios.post(`${url}interact/user`,
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      avatar: user.avatar === "" ? undefined : user.avatar
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createEvent = async (token: string, event: eventType) => {
  const response = await axios.post(`${url}interact/me/event`,
    {
      name: event.name,
      location: event.location,
      is_active: event.is_active,
      image: event.image,
      iban: event.iban,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createCategory = async (token: string, category: categoryType) => {
  const response = await axios.post(`${url}interact/category`,
    {
      label: category.label,
      vat_type: category.vat_type,
      picture: category.picture
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createVat = async (token: string, vat: vatType) => {
  const response = await axios.post(`${url}interact/vat`,
    {
      type: vat.type,
      rate: vat.rate,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createProduct = async (token: string, product: productType) => {
  const response = await axios.post(`${url}interact/product`,
    {
      label: product.label,
      is_available: product.is_available,
      excl_vat_price: product.excl_vat_price,
      picture: product.picture,
      category_id: product.category.id,
      event_id: product.event_id
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// GET

export const users = async (token: string, search: string, offset: number) => {
  const response = await axios.get(`${url}interact/user?search=${search}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const user = async (token: string, id: number) => {
  const response = await axios.get(`${url}interact/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const events = async (token: string, search: string, offset: number) => {
  const response = await axios.get(`${url}interact/event?search=${search}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const event = async (token: string, id: number) => {
  const response = await axios.get(`${url}interact/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const vats = async (token: string, search: string, offset: number) => {
  const response = await axios.get(`${url}interact/vat?search=${search}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const vat = async (token: string, type: string) => {
  const response = await axios.get(`${url}interact/vat/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const categories = async (token: string, search: string, offset: number) => {
  const response = await axios.get(`${url}interact/category?search=${search}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const category = async (token: string, id: number) => {
  const response = await axios.get(`${url}interact/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const products = async (token: string, search: string, offset: number) => {
  const response = await axios.get(`${url}interact/product?search=${search}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const product = async (token: string, id: number) => {
  const response = await axios.get(`${url}interact/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// DELETE
export const deleteUser = async (token: string, id: number) => {
  const response = await axios.delete(`${url}interact/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteEvent = async (token: string, id: number) => {
  const response = await axios.delete(`${url}interact/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteVat = async (token: string, type: string) => {
  const response = await axios.delete(`${url}interact/vat/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteCategory = async (token: string, id: number) => {
  const response = await axios.delete(`${url}interact/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletProduct = async (token: string, id: number) => {
  const response = await axios.delete(`${url}interact/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};


// PATCH
export const editUser = async (token: string, id: number, user: userType) => {
  const response = await axios.patch(`${url}interact/user/${id}`,
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
      avatar: user.avatar
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editEvent = async (token: string, id: number, event: eventType) => {
  const response = await axios.patch(`${url}interact/event/${id}`,
    {
      name: event.name,
      location: event.location,
      is_active: event.is_active,
      image: event.image,
      iban: event.iban,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editVat = async (token: string, type: string, vat: vatType) => {
  const response = await axios.patch(`${url}interact/vat/${type}`,
    {
      type: vat.type,
      rate: vat.rate,
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editCategory = async (token: string, id: number, category: categoryType) => {
  const response = await axios.patch(`${url}interact/category/${id}`,
    {
      label: category.label,
      vat_type: category.vat_type,
      picture: category.picture
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editProduct= async (token: string, id: number, product: productType) => {
  const response = await axios.patch(`${url}interact/product/${id}`,
    {
      label: product.label,
      is_available: product.is_available,
      excl_vat_price: product.excl_vat_price,
      picture: product.picture,
      category_id: product.category.id
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

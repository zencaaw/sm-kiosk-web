export type user = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  avatar?: string;
  is_admin: boolean;
}

export type event = {
  id?: number
  name: string;
  location: string;
  is_active: boolean;
  image?: string;
  iban: string;
}

export type vat = {
  type: string;
  rate: number;
}

export type category = {
  id?: number;
  label: string;
  vat_type: string;
  picture?: string
}

export type product = {
  id?: number;
  label: string;
  is_available: boolean;
  excl_vat_price: number;
  category: {
    id: number,
    vat: {
      type: string
    }
  };
  picture?: string;
  event_id?: number;
}

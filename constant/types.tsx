export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string,
  password_confirmation: string
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  coupon: string | null;
  created_at: string;
  date_of_birth: string | null;
  deleted_at: string | null;
  email: string;
  email_verified_at: string | null;
  id: string;
  is_active: number;
  is_verified: number;
  name: string;
  phone_number: string;
  profile_picture: string | null;
  referal_code: string | null;
  updated_at: string;
  verification_code: string | null;
}


export type Insight = {
  value: string,
  name: string,
  percent: string,
  color: any,
  icon: any,
  bad?: boolean
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type ServiceInput = {
  placeholder: string,
  label?: string,
  type?: string,
  value?: string,
  onChangeText?: (text: string) => void,
  multiline: boolean,
  numberOfLines?: number,
}

export type Category = {
  id: string | number;
  name: string;
}

export type ModalProp = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  id: string | number
}

export interface Service {
  description: string,
  price: number | string,
  image: any,
  service: number | string,
  official_phone_number: string,
  official_email: string,
  address: string
}
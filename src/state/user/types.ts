export interface UserState {
  email: string;
  isLogged: boolean;
  uid: string;
}

export interface User {
  email: string;
  uid: string;
}

export type UserForm = Omit<User, 'uid'> & {
  password: string;
};

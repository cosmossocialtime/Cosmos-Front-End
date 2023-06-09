export interface SignInData {
  email: string,
  password: string
}

export interface User {
  email: string;
  password: string,
  avatar_url: string,
}

export interface IContext {
  isAutenticate: boolean,
  user: User | null,
  signIn: (data: SignInData) => Promise<void>
}


export interface IAuthProvider {
  children: JSX.Element;
}


import http from "../http-common";
import ILoginData from "../types/login";

const Login = (data: ILoginData) => {
  data.action = "Login";
  return http.post<ILoginData>("/access/post.php", data);
};

const Recovery = (data: ILoginData) => {
  data.action = "recovery_form";
  return http.post<ILoginData>("/recovery/post.php", data);
};

const Create = (data: ILoginData) => {
  data.action = "Create";
  return http.post<ILoginData>("/register/post.php", data);
};

const ValidateToken = (data: any) => {
  return http.get<String>(`/token/validate.php?token=${data}`);
}

const EditPassword = (data: ILoginData) => {
  data.action = "passwords_form";
  return http.post<ILoginData>("/recovery/put.php", data);
}

const AccessService = {
    Login,
    Recovery,
    Create,
    EditPassword,
    ValidateToken
  };
export default AccessService;
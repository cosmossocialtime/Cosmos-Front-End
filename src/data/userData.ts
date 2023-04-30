import UserProfile from "../assets/user.jpg";
import BgPerfil from "../assets/bg-perfil.png";
import { StaticImageData } from "next/image";

type userProps = {
  profilePicture?: StaticImageData;
  backgroundPicture: StaticImageData;
  name: string;
  birthDate: string;
  genre: string;
  cep: string;
  companyCode: string;
  email: string;  
}

const userData : userProps = {
  profilePicture: UserProfile,
  backgroundPicture: BgPerfil,
  name: "Érick Henrique",
  birthDate: "2000-01-24",
  genre: "Masculino",
  cep: "62923-130",
  companyCode: "123abc",
  email: "erick.henrique@gmail.com",
};

export default userData;

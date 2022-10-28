import { createContext, ReactNode, useEffect, useState } from "react";

interface RegisterContextProps {
  SetGender: (gender: string) => void;
  setCEP: (cep: number) => void;
  setCompany: (code: string) => void;
  setBirthday: (day: number, month: number, year: number) => void;
}

export const RegisterContext = createContext<RegisterContextProps>(
  {} as RegisterContextProps
);

interface RegisterContextProviderProps {
  children: ReactNode;
}



export function RegisterContextProvider({
  children,
}: RegisterContextProviderProps) {
  const [gender, setGender] = useState("");
  function SetGender(gender: string) {
    setGender(gender);
  }

  const [userCEP, setUserCEP] = useState(0);
  function setCEP(cep: number) {
    setUserCEP(cep);
  }

  const [companyCode, setCompanyCode] = useState("");
  function setCompany(code: string) {
    setCompanyCode(code);
  }

  const [userDay, setUserDay] = useState(1);
  const [userMonth, setUserMonth] = useState(1);
  const [userYear, setUserYear] = useState(1990);

  function setBirthday(day: number, month: number, year: number) {
    setUserDay(day);
    setUserMonth(month);
    setUserYear(year);
  }

  const Birthday = {
    userDay,
    userMonth,
    userYear,
  };

  const UserData = {
    Gender: gender,
    CEP: userCEP,
    Birthday: Birthday,
    CompanyCode: companyCode,
  };


  return (
    <RegisterContext.Provider
      value={{ SetGender, setCEP, setCompany, setBirthday }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

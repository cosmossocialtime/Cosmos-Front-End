import { FormEvent, useContext, useState } from "react";


import { Container, Content, Input } from "./style";
import { BackButton } from "../BackButton";
import { RegisterContext } from "../../context/RegisterContext";
import { useRouter } from "next/router";



export function UserBirthday() {
  const router = useRouter();

  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1990);

  const { setBirthday } = useContext(RegisterContext);

  function submitBirthday(e: FormEvent) {
    e.preventDefault();
    setBirthday(day, month, year);
    router.push("/usuario/cep");
  }

  return (
    <>

      <BackButton link="/usuario/codigo-empresa" />
      <Container>

        <Content>
          <div>
            <strong>Data de chegada na Terra</strong>
            <p>Nos conte sua data de nascimento ;</p>
          </div>

          <form onSubmit={submitBirthday}>
            <Input>
              <label>Dia</label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                {Object.entries(optionsDays).map((item) => {
                  return (
                    <option key={item[0]} value={item[0]}>
                      {item[1]}
                    </option>
                  );
                })}
              </select>
            </Input>

            <Input>
              <label>Mês</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {Object.entries(optionsMonth).map((item) => {
                  return (
                    <option key={item[0]} value={item[0]}>
                      {item[1]}
                    </option>
                  );
                })}
              </select>
            </Input>

            <Input>
              <label>Ano</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {Object.entries(optionsYears).map((item) => {
                  return (
                    <option key={item[0]} value={item[0]}>
                      {item[1]}
                    </option>
                  );
                })}
              </select>
            </Input>

          </form>
          <button type="submit" onClick={submitBirthday} className="cBtn">
            Pousar
          </button>
        </Content>
      </Container>
    </>
  );
}

const optionsDays = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,
};

const optionsMonth = {
  1: "janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

const optionsYears = {
  1989: 1989,
  1990: 1990,
  1991: 1991,
  1992: 1992,
  1993: 1993,
  1994: 1994,
  1995: 1995,
  1996: 1996,
  1997: 1997,
  1998: 1998,
  1999: 1999,
  2000: 2000,
  2001: 2001,
  2002: 2002,
  2003: 2003,
  2004: 2004,
  2005: 2005,
  2006: 2006,
  2007: 2007,
  2008: 2008,
  2009: 2009,
  2010: 2010,
  2011: 2011,
  2012: 2012,
  2013: 2013,
  2014: 2014,
  2015: 2015,
  2016: 2016,
  2017: 2017,
  2018: 2018,
  2019: 2019,
  2020: 2020,
  2021: 2021,
  2022: 2022,
  2023: 2023
};

/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import { CaretRight } from "phosphor-react";
import { Container, Content, OtherGender, RadioBox } from "./style";
import { BackButton } from "../BackButton";
import { RegisterContext } from "../../context/RegisterContext";
import { useRouter } from "next/router";


export function GenderSelection() {
  const router = useRouter();

  const [genderSelect, setGenderSelect] = useState("");
  const [otherGenderActive, setOtherGenderActive] = useState(true);

  console.log(genderSelect);

  const { SetGender } = useContext(RegisterContext);

  function GenderSubmit(gender: string) {
    SetGender(gender);
    router.push("/usuario/codigo-empresa");
  }

  return (
    <>
      <BackButton link="/usuario/iniciar" />
      <Container>
        <Content>
          <img src="/images/astronauta.png" alt="Imagem de um astronauta" />
          <div>
            <h2>Com qual gênero você se identifica?</h2>
            <p>
              Utilizaremos esses dados para mapear o público da nossa
              plataforma!
            </p>

            <RadioBox onClick={() => GenderSubmit("Feminino")} type="button" >
              Feminino
            </RadioBox>

            <RadioBox
              onClick={() => GenderSubmit("Masculino")}
              type="button"
            >
              Masculino
            </RadioBox>

            {otherGenderActive ? (
              <RadioBox
                onClick={() => setOtherGenderActive(!otherGenderActive)}
                type="button"
              >
                Outro
              </RadioBox>
            ) : (

              <OtherGender>
                <input
                  required
                  onChange={(e) => setGenderSelect(e.target.value)}
                  placeholder="Digite seu gênero"
                />
                <button
                  className="button-carret-right"
                  type="button"
                  onClick={() => GenderSubmit(genderSelect)}
                >
                  <CaretRight weight="bold" />
                </button>
              </OtherGender>



            )}
          </div>
        </Content>
      </Container>
    </>
  );
}


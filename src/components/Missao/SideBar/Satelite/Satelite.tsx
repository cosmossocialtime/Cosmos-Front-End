import { ItemSatelite } from "../../../../app/dashboard/imagens-de-satelite/ItemSatelite";
import { Container, Content } from "../../../../app/dashboard/imagens-de-satelite/style";

export function Satelite() {
  return (
    <>
      <Container className="-ml-6 overflow-auto">
        <h3>
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          instituição que você irá mentorar
        </h3>

        <Content>
          <ItemSatelite
            sateliteImg="/images/satelites/recursos.png"
            imgAlt={"planeta roxo"}
            sateliteName={"Captação de Recursos"}
            width="52"
            margin="0 0 0 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/financas.png"
            imgAlt={"planeta azul"}
            sateliteName={"Finanças"}
            width="40"
            margin="0 0 3rem 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/juridico.png"
            imgAlt={"planeta vermelho"}
            sateliteName={"Jurídico"}
            width="55"
            margin="0 0 3rem 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/pessoas.png"
            imgAlt={"planeta amarelo"}
            sateliteName={"Gestão de Pessoas"}
            width="40"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/marketing.png"
            imgAlt={"planeta rosa"}
            sateliteName={"Marketing"}
            width="38"
            margin="0rem 0 5rem 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/instituto.png"
            imgAlt={"estrela branca"}
            sateliteName={"Instituto Dorina Nowill"}
            width="198"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/impacto.png"
            imgAlt={"planeta verde e azul"}
            sateliteName={"Avaliação de Impacto"}
            width="64"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/projetos.png"
            imgAlt={"planeta laranja"}
            sateliteName={"Gestão de Projetos"}
            width="41"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/sustentabilidade.png"
            imgAlt={"planeta verde claro"}
            sateliteName={"Sustentabilidade"}
            width="54"
            margin="3rem 0 0 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/estrategia.png"
            imgAlt={"planeta azul com roxo"}
            sateliteName={"Estratégia"}
            width="58"
            margin="5rem 0 0 0"
          />

          <ItemSatelite
            sateliteImg="/images/satelites/lideranca.png"
            imgAlt={"planeta azul"}
            sateliteName={"Liderança"}
            width="54"
          />
        </Content>
      </Container>
    </>
  );
}

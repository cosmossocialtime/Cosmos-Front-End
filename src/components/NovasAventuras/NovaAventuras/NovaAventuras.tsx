import Link from "next/link";
import { HeaderAventura } from "./HeaderAventura";
import { Container, DisplayText, InscricaoBtn } from "./style";

export default function NovaAventuras() {
  return (
    <>
      <HeaderAventura />
      <Container>
        <DisplayText>
          <p>
            No Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de
            uma organização social que atua na causa da educação ou da saúde.
            Você trabalhará em equipe com outros voluntários da Empresa X para
            apoiar o desenvolvimento da instituição e contribuir para aumentar o
            seu impacto social. Serão realizados encontros semanais de mentoria,
            em que a equipe de mentores aconselhará os líderes da organização
            mentorada em temas relacionados à gestão, como finanças, marketing,
            recursos humanos, estratégia, entre outros. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Quisque cursus ornare dignissim.
            Mauris et consectetur nibh. Sed nec sem ante. Phasellus faucibus
            scelerisque eleifend. Pellentesque sapien sem, elementum et blandit
            id, aliquet id ex. Para se inscrever, clique no botão a seguir. No
            Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de uma
            organização social que atua na causa da educação ou da saúde. Você
            trabalhará em equipe com outros voluntários da Empresa X para apoiar
            o desenvolvimento da instituição e contribuir para aumentar o seu
            impacto social. Serão realizados encontros semanais de mentoria, em
            que a equipe de mentores aconselhará os líderes da organização
            mentorada em temas relacionados à gestão, como finanças, marketing,
            recursos humanos, estratégia, entre outros. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Quisque cursus ornare dignissim.
            Mauris et consectetur nibh. Sed nec sem ante. Phasellus faucibus
            scelerisque eleifend. Pellentesque sapien sem, elementum et blandit
            id, aliquet id ex. Para se inscrever, clique no botão a seguir.
          </p>
        </DisplayText>
        <InscricaoBtn>
          <Link href="/termos">
            <button className="cBtn">Inscrever-me</button>
          </Link>
        </InscricaoBtn>
      </Container>
    </>
  );
}

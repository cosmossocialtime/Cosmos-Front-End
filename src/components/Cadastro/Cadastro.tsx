import styled from "styled-components";
import logoCosmos from "../../../assets/logotipoCosmos.svg";
import { Outlet } from "react-router-dom";

export function Cadastro(){
    return(
     <Container>
        <img src={logoCosmos} alt="Logo da cosmos" />
        <Outlet/>
     </Container>
    );

}

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    padding-top: 2rem;
    color: var(--gray-700);
    img{
        width: 12rem;
    }
`
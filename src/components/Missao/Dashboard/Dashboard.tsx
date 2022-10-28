import { Outlet } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";



import { Container, Content } from "./style";

export function Dashboard(){
    return(
     <> 
        <Container>
        <SideBar/>
        <Content>
            <Outlet/>
        </Content>
        </Container>
     
     </>
    );

}
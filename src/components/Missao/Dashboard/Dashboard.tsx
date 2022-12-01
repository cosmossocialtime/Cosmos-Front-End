import { SideBar } from "../SideBar/SideBar";

import { Container, Content } from "./style";

export function Dashboard(){
    return(
     <> 
        <Container>
        <SideBar/>
        <Content>
        </Content>
        </Container>
     
     </>
    );

}
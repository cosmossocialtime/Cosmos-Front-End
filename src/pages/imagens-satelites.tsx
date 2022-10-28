import { Satelite } from "../components/Missao/SideBar/Satelite/Satelite";
import { SideBar } from "../components/Missao/SideBar/SideBar";
import ModalSatelite from "../components/modalSatelite";



export default function ImagensSatelite() {

    return(
        <>
        <ModalSatelite />
            <div className="flex max-h-screen">
                <SideBar />
                <Satelite />
            </div>
        </>
    )
}


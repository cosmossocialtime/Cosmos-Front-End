import Menu from "./Menu";
import CosmosLogo from '../../assets/cosmos-logo-white.svg';
import Image from "next/image";

export default function Header() {
    return (
        <header className='py-6 px-20 bg-gray-800 flex items-center justify-between border-0 border-b border-solid border-gray-600'>
            <Image src={CosmosLogo} alt="logo do cosmos" className='h-6' />
            <Menu />
        </header>
    )
}
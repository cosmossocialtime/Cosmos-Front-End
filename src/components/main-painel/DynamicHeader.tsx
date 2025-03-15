import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Logo from '../../../public/images/logotipoCosmos.svg';
import styles from '../../components/instituition/heade.module.css';

interface HeaderProps {
    organizationName?: string;
    userName?: string;
}

export default function DynamicHeader({ organizationName, userName }: HeaderProps) {
    const router = useRouter();
    const [showFullHeader, setShowFullHeader] = useState(false);

    useEffect(() => {
        // Definir páginas onde apenas o logo deve ser exibido
        const minimalPages = [
            '/institutions/onboardingProgram/terms',
            '/institutions/onboardingProgram/finalization',
            '/institutions/onboardingProgram/focalPoint',
            '/institutions/onboardingProgram/aboutInstitution',
            '/institutions/onboardingProgram/descriptiveData',
        ];
        setShowFullHeader(!minimalPages.includes(router.pathname));
    }, [router.pathname]);

    return (
        <header className="w-screen bg-white shadow-md h-[68px] px-6 flex justify-between items-center">
            <div className="flex items-center">
            <Image className={styles.logo} src={Logo} alt="Logo cosmos" width={120} height={24} quality={100} />
            </div>

            {showFullHeader && (
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">{organizationName || 'Nome da organização'}</span>
                    <div className="relative group">
                        <span className="cursor-pointer font-medium text-gray-700">{userName || 'Usuário'}</span>
                        {/* Aqui pode ser adicionado um dropdown de menu futuramente */}
                    </div>
                </div>
            )}
        </header>
    );
}
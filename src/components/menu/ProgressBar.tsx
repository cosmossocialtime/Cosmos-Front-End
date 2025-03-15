import Image from 'next/image';
import { useRouter } from 'next/router';

interface ProgressBarProps {
    steps: { id: number; label: string }[];
    currentStep: number;
    onBack?: () => void;
    activeColor?: string;
    inactiveColor?: string;
    icons?: {
        backArrow: string;
        checked: string;
        active: string;
        inactive: string;
    };
}

export default function ProgressBar({
    steps,
    currentStep,
    onBack,
    icons = {
        backArrow: '/images/back-arrow.svg',
        checked: '/images/Checkedbox-icon.svg',
        active: '/images/Checkbox-active.svg',
        inactive: '/images/Checkbox-inativo.svg',
    },
}: ProgressBarProps) {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center w-full">
            {currentStep > 1 && (
                <button
                    onClick={onBack || (() => router.back())} 
                    className="mr-4 flex items-center"
                >
                    <Image src={icons.backArrow} alt="Voltar" width={24} height={24} />
                </button>
            )}
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className="relative w-8 h-8 flex items-center justify-center" style={{ fontSize: "16px" }} >
                        {currentStep > step.id ? (
                            <Image src={icons.checked} alt={`Etapa ${step.id} concluída`} width={32} height={32} />
                        ) : currentStep === step.id ? (
                            <>
                                <Image src={icons.active} alt={`Etapa ${step.id} ativa`} width={32} height={32} />
                                <span className="absolute text-white" style={{ fontSize: "16px" }}>{step.id}</span>
                            </>
                        ) : (
                            <>
                                <Image src={icons.inactive} alt={`Etapa ${step.id} pendente`} width={32} height={32} />
                                <span className="absolute text-gray-500" style={{ fontSize: "16px" }}>{step.id}</span>
                            </>
                        )}
                    </div>

                    <span
                        style={{ fontSize: '14px' }}
                        className={`pl-[10px] ${currentStep > step.id
                            ? 'text-black'
                            : currentStep === step.id
                                ? 'text-black font-bold'
                                : 'text-gray-400'
                            }`}
                    >
                        {step.label}
                    </span>

                    {index < steps.length - 1 && (
                        <div
                            className={`ml-[20px] mr-[20px] w-[40px] h-[1px]
                            ${currentStep > step.id ? "bg-gradient-to-r from-[#65BAFA] to-[#9D37F2]" : "bg-gray-300"}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
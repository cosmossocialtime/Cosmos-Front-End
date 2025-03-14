import Image from 'next/image';

interface ProgressBarProps {
    steps: { id: number; label: string }[];
    currentStep: number;
    activeColor?: string;
    inactiveColor?: string;
    icons?: {
        checked: string;
        active: string;
        inactive: string;
    };
}

export default function ProgressBar({
    steps,
    currentStep,
    icons = {
        checked: '/images/Checkedbox-icon.svg',
        active: '/images/Checkbox-active.svg',
        inactive: '/images/Checkbox-inativo.svg',
    },
}: ProgressBarProps) { 
    return (
        <div className="flex justify-between items-center w-full">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    {/* Ícone do passo */}
                    <div className="relative w-8 h-8 flex items-center justify-center" style={{fontSize: "16px"}} >
                        {currentStep > step.id ? (
                            <Image src={icons.checked} alt={`Etapa ${step.id} concluída`} width={32} height={32} />
                        ) : currentStep === step.id ? (
                            <>
                                <Image src={icons.active} alt={`Etapa ${step.id} ativa`} width={32} height={32} />
                                <span className="absolute text-white" style={{fontSize: "16px"}}>{step.id}</span>
                            </>
                        ) : (
                            <>
                                <Image src={icons.inactive} alt={`Etapa ${step.id} pendente`} width={32} height={32} />
                                <span className="absolute text-gray-500" style={{fontSize: "16px"}}>{step.id}</span>
                            </>
                        )}
                    </div>

                    {/* Nome do passo */}
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

                   {/* Linha de progresso entre os passos */}
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
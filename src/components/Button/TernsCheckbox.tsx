import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useCallback } from 'react';

interface TermsCheckboxProps {
    acceptTerms: boolean;
    setAcceptTerms: (value: boolean) => void;
    labelText: string; 
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ acceptTerms, setAcceptTerms, labelText }) => {
    const handleCheckedChange = useCallback((checked: boolean) => {
        setAcceptTerms(checked);
    }, [setAcceptTerms]);

    return (
        <div className="my-4 flex gap-2 items-end">
            <Checkbox.Root
                className={`flex h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms ? 'border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]' : ''
                    }`}
                id="checkbox"
                required
                checked={acceptTerms}
                onCheckedChange={handleCheckedChange}
                aria-labelledby="checkbox-label"
            >
                <Checkbox.Indicator>
                    <Check size={32} className="p-1 font-bold text-zinc-50"/>
                </Checkbox.Indicator>
            </Checkbox.Root>
            <label id="checkbox-label" htmlFor="checkbox" className="text-[16px] font-normal text-[#1B2031] leading-[20px] font-inter mt-2">
                {labelText}
            </label>
        </div>
    );
};

{/* <div className="my-4 flex gap-2 pt-[48px]">
                        <Checkbox.Root
                            className={`flex h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms && 'border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                                }`}
                            id="checkbox"
                            required
                            checked={acceptTerms}
                            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        >
                            <Checkbox.Indicator>
                                <Check size={32} className="p-1 font-bold text-zinc-50" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="checkbox">
                            <span className="text-[16px]  font-normal text-[#1B2031] leading-[20px] font-inter mt-2">
                               
                                Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas
                            </span>
                        </label>
                    </div> */}

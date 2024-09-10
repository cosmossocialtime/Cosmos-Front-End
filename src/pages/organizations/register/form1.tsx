import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { z } from "zod";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import  Router  from "next/router";

const styles: StylesConfig = {
    control: (styles) => {
        return {
            ...styles,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "4px",
            minHeight: "48px",
            maxHeight: "auto",
            borderColor: "#A2ABCC",
            ":focus": {
                borderColor: "#642BBB"
            }
        }
    },
    placeholder: (styles) => {
        return {
            ...styles,
            color: "#A2ABCC"
        }
    },
    multiValue: (styles) => {
        return {
            ...styles,
            height: "32px",
            backgroundColor: "#eaf7fc",
            display: "flex",
            alignItems: "center",
            borderRadius: "100px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "#0890F780"
        }
    }
}

const schema = z.object({
    companie: z.string().min(3, "A senha deve ter no mínimo 3 caracteres")
})

type formProps = z.infer<typeof schema>

export default function FormOne(){

    const [selected, setSelected] = useState<Array<Number>>([]);
    const [errorSelect, setErrorSelect] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<formProps>({ resolver: zodResolver(schema) })

    const [options, setOptions] = useState([
        {value: 2, label: "Combate à Violência Doméstica"},
        {value: 15, label: "Acesso à Saúde"},
        {value: 9, label: "Combate a Probreza"},
        {value: 2, label: "Combate a violência doméstica"},
        {value: 17, label: "Direitos dos Animais"},
        {value: 14, label: "Meio Ambiente e Sustentabilidade"},
        {value: 19, label: "Acessibilidade e Inclusão de PcDs"},
        {value: 20, label: "Acesso à Cultura"},
        {value: 22, label: "Acesso ao Esporte"},
        {value: 23, label: "Acesso à Moradia"},
        {value: 24, label: "Combate ao Tráfico de Pessoas"},
        {value: 25, label: "Direitos das Crianças e Adolescentes"},
        {value: 8, label: "Direito dos Idosos"},
        {value: 36, label: "Direitos dos Povos Indígenas"},
        {value: 28, label: "Direitos Humanos"},
        {value: 29, label: "Direitos LGBTQIA+"},
        {value: 30, label: "Equidade de Gênero"},
        {value: 31, label: "Justiça Econômica e Tributária"},
        {value: 32, label: "Justiça Racial"},
        {value: 33, label: "Segurança Alimentar"},
        {value: 34, label: "Outra"}
    ]);

    async function handleForm(data: formProps) {
        try{
            if(!errorSelect){
                await api.post("/socialOrganization/create", {
                    userId: localStorage.getItem("userId"),
                    causes: selected,
                    name: data.companie
                }).then(res => {
                    if(res.status === 201){
                        Router.push("/organizations/register/aboutYou");
                    }
                })
            }
        }catch(error: any){
            if (error.response.status === 404 || error.response.status === 500) {
                return toast.error(
                  'Não foi possivel criar sua conta, por favor tente novamente',
                )
              }
        }
    }

    const handleSelect = (e: Array<{value: number, label: string}>) => {

        if(e.length <= 3){
            e.forEach((item)=> {
                setSelected([...selected, item.value]);
            })
            setErrorSelect("");
        }else{
            setErrorSelect("Você pode selecionar no máximo 3 causas");
        }


    }

    useEffect(()=>{
        console.log(selected);
    }, [selected])



    return(
        <div>
            <Head>
                <title>Cadastrar Organização | Cosmos</title>
            </Head>
            <div className="h-screen w-screen flex flex-col" >
                <header className="w-full flex h-[105px] border-solid border-b border-gray-200" >
                    <section className="h-full w-2/5 pl-[45.93px] flex items-center" >
                        <img src="/images/logo-cosmos.png" className="w-[116.28px] h-[24px]" alt="" />
                    </section>
                    <section className="h-full w-4/5 flex items-center" >
                        <div className="flex items-center mr-[16px]" >
                            <div className="relative border-solid border flex justify-center items-center border-purple-300 w-[24px] h-[24px] mr-[6px] rounded-full" >
                                <Check size={18} className="text-purple-500" />
                            </div>
                            <p className="text-sm mr-[16px]" >Cadastro inicial</p>
                            <div className="w-[40px] h-[1px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-md bg-gray-400" ></div>
                        </div>
                        <div className="flex items-center mr-[16px]" >
                            <div className="relative w-[24px] h-[24px] flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 mr-[6px] rounded-full border-solid border border-gray-400" >
                                <p className="text-white text-[16px]" >2</p>
                            </div>
                            <p className="text-sm mr-[16px]" >Sobre a organização</p>
                            <div className="w-[40px] h-[1px] rounded-md bg-gray-300" ></div>
                        </div>
                        <div className="flex items-center" >
                            <div className="relative w-[24px] h-[24px] mr-[6px] flex justify-center items-center rounded-full bg-gray-200" >
                                <p className="text-base text-gray-500" >3</p>
                            </div>
                            <p className="text-sm mr-[16px] text-gray-500" >Sobre Você</p>
                        </div>
                    </section>   
                </header>
                <main className="w-full h-full flex items-center flex-col pt-[41px]" >
                    <h1 className="text-[20px] text-gray-800" >Sobre a organização</h1>

                    <form onSubmit={handleSubmit(handleForm)} className="w-[384px] h-auto mt-[40px]" >
                        <div className="w-full flex flex-col space-y-1" >
                            <label className="text-sm text-gray-600" >Nome da organização</label>
                            <input {...register("companie")} 
                                   placeholder="Ex: Amigos da Cosmos"
                                   type="text" 
                                   className={`h-[48px] pl-[12px] w-full border-solid border border-gray-400 rounded-[4px] transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                                   ${errors.companie ? 'border-rose-600' : 'border-gray-400'}`} />
                        </div>
                        {errors.companie && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.companie.message}
                            </span>
                        )}
                        <div className="w-full flex flex-col space-y-1 mt-[32px]" >
                            <label className="text-sm text-gray-600" >Causa(s) em que atua (até 3)</label>
                            <Select
                                isMulti
                                options={options}
                                placeholder="Escolha uma ou mais opções"
                                styles={styles}
                                onChange={(e)=>handleSelect(e as Array<{value: number, label: string}>)}
                            />
                        </div>
                        {errorSelect && (
                            <span className="text-sm text-rose-600 mt-3">
                            {errorSelect}
                            </span>
                        )}
                        <button type="submit" className="w-full h-[48px] rounded-md bg-purple-500 text-white mt-[32px]" >Continuar</button>
                    </form>
                </main>
            </div>
        </div>
        
    )
}
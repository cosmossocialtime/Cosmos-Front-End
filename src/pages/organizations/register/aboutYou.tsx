import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { Check } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

const schema = z.object({
    fullname: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    phone: z.string().min(13, "Telefone deve ser no formato 55 00 00000 0000").regex(/^55\s\d{2}\s\d{9}$/, "Telefone deve ser no formato 55 00 00000 0000"),
    workArea: z.string().refine((value) => value !== "0", {message: "O campo área de trabalho deve ser selecionado"}),
    role: z.string().min(3, "Cargo na organização deve ter no mínimo 3 caracteres")
})

type formProps = z.infer<typeof schema>

export default function AboutYou(){

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<formProps>({ resolver: zodResolver(schema) })

    const handleForm = async (data: formProps) => {
        try{
         await api.put("/user/aboutYou", {
            phone: data.phone,
            workArea: data.workArea,
            fullName: data.fullname,
            professionalRole: data.role,
            userId: localStorage.getItem("userId")
         }).then(res =>{
            if(res.status === 200){
                toast.success("Usuário adicionado com sucesso");
            }
         })
        }catch(error: any){
            if (error.response.status === 404 || error.response.status === 500) {
                return toast.error(
                  'Não foi possivel criar sua conta, por favor tente novamente',
                )
              }
        }
    }

    return(
        
    <div>
        <Head>
                <title>Sobre Você | Cosmos</title>
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
                            <div className="relative border-solid border flex justify-center items-center border-purple-300 w-[24px] h-[24px] mr-[6px] rounded-full" >
                                <Check size={18} className="text-purple-500" />
                            </div>
                            <p className="text-sm mr-[16px]" >Sobre a organização</p>
                            <div className="w-[40px] h-[1px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-md bg-gray-400" ></div>
                        </div>
                        <div className="flex items-center" >
                            <div className="relative w-[24px] h-[24px] mr-[6px] flex justify-center items-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-[6px]" >
                                <p className="text-base text-white" >3</p>
                            </div>
                            <p className="text-sm mr-[16px]" >Sobre Você</p>
                        </div>
                    </section>   
            </header>
            <main className="w-full h-full flex items-center flex-col pt-[41px]" >
                <h1 className="text-[20px] text-gray-800" >Sobre você</h1>

                <form onSubmit={handleSubmit(handleForm)} className="w-[384px] h-auto mt-[40px]" >

                    <div className="w-full flex flex-col space-y-1" >
                        <label className="text-sm text-gray-600" >Seu Nome</label>
                        <input placeholder="Ex.: Maria Gomes"
                               {...register("fullname")}
                               type="text" className={`h-[48px] pl-[12px] w-full border-solid border border-gray-400 rounded-[4px] transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                            ${errors.fullname ? 'border-rose-600' : 'border-gray-400'}`} />
                    </div>
                    {errors.fullname && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.fullname.message}
                            </span>
                        )}

                    <div className="w-full flex flex-col space-y-1 mt-[32px]" >
                        <label className="text-sm text-gray-600" >Celular</label>
                        <input placeholder="+55 (00) 00000-0000"
                               type="text"
                               {...register("phone")} 
                               className={`h-[48px] pl-[12px] w-full border-solid border border-gray-400 rounded-[4px] transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                            ${errors.phone ? 'border-rose-600' : 'border-gray-400'}`} />
                    </div>
                    {errors.phone && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.phone.message}
                            </span>
                        )}

                    <div className="w-full flex flex-col space-y-1 mt-[32px]" >
                        <label className="text-sm text-gray-600" >Área de trabalho</label>
                        <select 
                            defaultValue={0}
                            {...register("workArea")} 
                            className={`h-[48px] pl-[12px] w-full border-solid border border-gray-400 rounded-[4px] transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                            ${errors.workArea ? 'border-rose-600' : 'border-gray-400'}`}>
                            <option value={0}>Selecione uma opção</option>
                            <option value={1}>Recursos Humanos</option>
                            <option value={2}>Finanças</option>
                            <option value={3}>Marketing</option>
                            <option value={4}>Jurídico</option>
                            <option value={5}>Gestão de projetos</option>
                            <option value={6}>Sustentabilidade</option>
                            <option value={7}>Captação de Recursos</option>
                            <option value={8}>Estratégia</option>
                            <option value={9}>Avaliação de Impacto</option>
                            <option value={10}>Liderança</option>
                        </select>
                    </div>
                    {errors.workArea && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.workArea.message}
                            </span>
                        )}

                    <div className="w-full flex flex-col space-y-1 mt-[32px]" >
                        <label className="text-sm text-gray-600" >Seu cargo na organização</label>
                        <input placeholder="Ex.: Analista Financeiro" 
                               type="text"
                               {...register("role")} 
                               className={`h-[48px] pl-[12px] w-full border-solid border border-gray-400 rounded-[4px] transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                            ${errors.role ? 'border-rose-600' : 'border-gray-400'}`} />
                    </div>
                    {errors.role && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.role.message}
                            </span>
                        )}

                    <button type="submit" className="w-full h-[48px] rounded-md bg-purple-500 text-white mt-[32px]" >Continuar</button>
                </form>
            </main>
        </div>
    </div>
    )
}
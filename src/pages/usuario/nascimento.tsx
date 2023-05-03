import * as Select from "@radix-ui/react-select"
import InputSelect from "../../components/InputSelect";
import { BackButton } from "../../components/Welcome/BackButton";

export default function Nascimento() {
  return (
    <>
      <BackButton link="/usuario/codigo-empresa" />
      <main className="h-screen w-full bg-bgTerra bg-no-repeat bg-cover flex items-center justify-center">
        <form
          className="flex flex-col items-center justify-center gap-3 p-16 backdrop-blur-md bg-black/10 rounded-2xl ">
          <h1
            className="text-zinc-50 text-2xl font-semibold">Nos conte o dia em que você chegou à Terra</h1>
          <span
            className="text-zinc-50 text-xl font-extralight">Informe aqui sua data de nascimento ;)</span>


          <InputSelect>
            <Select.Trigger className="bg-zinc-50 w-full">
              <Select.Value />
              <Select.Icon />
            </Select.Trigger>
          </InputSelect>
        </form>
      </main>
    </>
  )
}
import dayjs from "dayjs";

export type stage = {
    title: string;
    completed: boolean;
    availabilityDate: dayjs.Dayjs;
}

export const stagesData: Array<stage> = [
    {
        title: "Introdução",
        completed: true,
        availabilityDate: dayjs("2023-03-01"),
    },
    {
        title: "Imagens de Satélite",
        completed: true,
        availabilityDate: dayjs("2023-03-04"),
    },
    {
        title: "Encontro da Tripulação",
        completed: true,
        availabilityDate: dayjs("2023-03-10"),
    },
    {
        title: "Encontro com a Estrela",
        completed: false,
        availabilityDate: dayjs("2023-03-15"),
    },
    {
        title: "O mapa da Navegação",
        completed: false,
        availabilityDate: dayjs("2023-03-27"),
    },
    {
        title: "Execução da Missão",
        completed: false,
        availabilityDate: dayjs("2023-04-04"),
    },
    {
        title: "Encontro Final",
        completed: false,
        availabilityDate: dayjs("2023-08-12"),
    },
]
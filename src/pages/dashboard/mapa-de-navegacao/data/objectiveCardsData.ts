const { v4: uuidv4 } = require('uuid');

export type TasksProps = {
    id: string;
    content: string;
    checked: boolean;
}

export type CardProps = {
    id: string,
    title: string;
    tasks: TasksProps[];
}

export const objectiveCardsData: Array<CardProps> = [
    {   
        id: uuidv4(),
        title: "Aumentar o número de doadores",
        tasks: [
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
        ],
    },
    {
        id: uuidv4(),
        title: "Economizar dinheiro",
        tasks: [
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
        ]
    },
    {
        id: uuidv4(),
        title: "Conseguir mais voluntários",
        tasks: [
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem imef k fgu vsdhvher",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem imef k fgu vsdhvher",
                checked: false,
            },
        ]
    },
    {
        id: uuidv4(),
        title: "Aumentar o número de pessoas ajudadas em 15%",
        tasks: [
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: true,
            },
            {
                id: uuidv4(),
                content: "lorem impsut fairente tururu",
                checked: false,
            },
        ]
    }
];

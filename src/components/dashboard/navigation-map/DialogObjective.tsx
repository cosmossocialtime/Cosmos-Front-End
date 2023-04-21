import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import ObjectiveCard from './Card/ObjectiveCard'
import { CardProps, TasksProps } from '../../../data/objectiveCardsData'
import ModalTask from './modalTask'

type DialogObjectiveProps = {
    cardData: CardProps
    index: number
    deleteObjective: (id: string) => void;
}

export default function DialogObjective({ cardData, index, deleteObjective }: DialogObjectiveProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [title, setTitle] = useState(cardData.title)
    const [tasks, setTasks] = useState(cardData.tasks)
    const [taskWithActiveEditing, setTaskWithActiveEditing] = useState<string>()

    const amount = tasks.length;
    const completed = tasks.filter(task => task.checked).length;

    function changeTitle(newTitle: string) {
        setTitle(newTitle)
    }

    function saveEditions(localTasks: TasksProps[]) {
        setTasks(localTasks)
    }

    function changeTaskCheck(id: string) {
        setTasks(prevTasks => {
            const index = prevTasks.findIndex(task => task.id === id)
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                checked: !updatedTasks[index].checked
            };

            return updatedTasks;
        })
    }

    function toggleTaskWithActiveEditing(id?: string) {
        // if(taskWithActiveEditing !== undefined) {           
        //     const task = tasks.find(task => task.id === taskWithActiveEditing) 

        //     if(task && task.content.trim() === "") {
        //         return;
        //     }
        // }

        setTaskWithActiveEditing(id)
    }

    return (
        <Dialog.Root
            open={modalOpen}
            onOpenChange={(open) => setModalOpen(open)}
        >
            <Dialog.Trigger >
                <ObjectiveCard
                    description={title}
                    index={index + 1}
                    amountTask={amount}
                    completedTask={completed}
                />
            </Dialog.Trigger>

            <ModalTask
                title={title}
                tasks={tasks}
                index={index}
                id={cardData.id}
                changeTitle={changeTitle}
                taskWithActiveEditing={taskWithActiveEditing}
                toggleTaskWithActiveEditing={toggleTaskWithActiveEditing}
                deleteObjective={deleteObjective}
                saveEditions={saveEditions}
                changeTaskCheck={changeTaskCheck}
                setModalOpen={setModalOpen}
            />
        </Dialog.Root>
    )
}
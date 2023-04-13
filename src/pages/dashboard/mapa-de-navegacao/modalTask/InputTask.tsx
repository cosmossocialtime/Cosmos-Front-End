import { useState, useEffect } from 'react';
import { Check, DotsSixVertical, Trash } from "phosphor-react";
import { TasksProps } from "../data/objectiveCardsData";

interface inputTasksProps {
    index: number;
    task: TasksProps;
    taskWithActiveEditing?: string;
    deleteTask: (id: string) => void;
    updateTaskContent: (content: string, id: string) => void;
    toggleTaskWithActiveEditing: (id?: string) => void;
}

export default function InputTask({
    index,
    task,
    taskWithActiveEditing,
    deleteTask,
    updateTaskContent,
    toggleTaskWithActiveEditing }: inputTasksProps) {
    const [inputContent, setInputContent] = useState(task.content);

    useEffect(() => {
        updateTaskContent(inputContent, task.id)
    }, [toggleTaskWithActiveEditing])

    return (
        <div
            className={`${taskWithActiveEditing === task.id ? "bg-blue-900/[15]" : "bg-blue-900/30"} p-3 text-gray-300 flex items-center gap-2 rounded-lg`}
            draggable
        >
            <DotsSixVertical size={24} weight="bold" className='cursor-pointer' />
            <div className={`${task.checked ? "bg-gradient-to-r from-blue-300 to-violet-400 border-none" : "bg-gray-300/20 border-solid border-gray-400"} w-6 h-6  rounded border `}>
                {task.checked &&
                    <Check size={24} weight="bold" className="p-[0.125rem]" />
                }
            </div>

            <input
                type="text"
                className='flex-1 text-gray-200 outline-none bg-transparent'
                value={inputContent}
                autoFocus={index === 0}
                onFocus={() => toggleTaskWithActiveEditing(task.id)}
                onChange={(event) => setInputContent(event.target.value)}
            />

            <div className='flex gap-4'>
                {taskWithActiveEditing === task.id && (
                    <Check
                        size={24}
                        weight="bold"
                        className="cursor-pointer"
                        onClick={() => toggleTaskWithActiveEditing(undefined)}
                    />
                )}

                <Trash
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                />
            </div>
        </div>
    )
}
import { DotsSixVertical, Trash } from 'phosphor-react'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '../../Input'

interface InputTaskProps {
  index: number
  completed: boolean
  deleteTask: (index: number) => void
}

export function InputTask({ index, completed, deleteTask }: InputTaskProps) {
  const { register, control } = useFormContext()

  return (
    <div
      className={`${'bg-blue-900/30'} flex items-center gap-2 rounded-lg p-3 text-gray-300 focus-within:bg-blue-900 `}
      draggable
    >
      <DotsSixVertical size={24} weight="bold" className="cursor-pointer" />
      <Controller
        name={`tasks.${index}.completed`}
        control={control}
        render={({ field }) => (
          <Input.CheckBox
            checked={field.value}
            onChangeChecked={field.onChange}
            disabled
          />
        )}
      />

      <input
        type="text"
        className="flex-1 bg-transparent text-gray-200 outline-none"
        autoFocus={index === 0}
        {...register(`tasks.${index}.name`)}
      />

      <div className="flex gap-4">
        <Trash
          size={24}
          className="cursor-pointer text-red-500"
          onClick={() => deleteTask(index)}
        />
      </div>
    </div>
  )
}

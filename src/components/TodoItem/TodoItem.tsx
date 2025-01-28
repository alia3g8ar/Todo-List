import { motion } from "framer-motion"
import { Todo } from "../../types"
import { FiTrash2 } from "react-icons/fi"
import { LuPencil } from "react-icons/lu"
import { useState } from "react"

type Props = {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText)
    }
    setIsEditing(!isEditing)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="p-1 border rounded w-full dark:bg-gray-600 dark:text-white"
          />
        ) : (
          <span
            className={`text-gray-700 dark:text-gray-100 ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 text-black hover:bg-gray-200 dark:hover:bg-gray-500 dark:text-white rounded-full transition-colors"
        >
          {isEditing ? "✔️" : <LuPencil size={18} />}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 hover:bg-red-200 dark:hover:bg-red-900 rounded-full transition-colors"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </motion.div>
  )
}

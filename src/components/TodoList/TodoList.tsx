import { useState, useEffect } from "react"
import { TodoItem } from "../TodoItem/TodoItem.tsx"
import { Todo } from "../../types"
import { AnimatePresence } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInput("")
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    )
  }

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className={`min-h-screen  ${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors relative">
        {/* دکمه تغییر تم */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`p-3 bg-gray-700 text-white fill-white dark:bg-yellow-500 rounded-full   transition-colors`}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Todo List
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105 active:scale-95"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

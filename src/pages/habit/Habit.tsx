import { TodoList } from "../../components/TodoList/TodoList.tsx"
import { useState } from "react"

export const Habit = () => {
  const [isDarkMode] = useState(false)



  return (
    <>
      <div
        className={`min-h-screen bg-gray-100 dark:bg-gray-800 z-10 py-8 ${isDarkMode ? "dark" : ""}`}
      >
        <TodoList />
      </div>
    </>
  )
}

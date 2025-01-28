import { TodoList } from "../../components/TodoList/TodoList.tsx"
import SplashCursor from "../../components/SplashCursor/SplashCursor.jsx"
import Waves from "../../components/Waves/Waves.jsx"
import { useState } from "react"

export const Habit = () => {
  const [isDarkMode, setIsDarkMode] = useState(false) // حالت دارک مود

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark") // اضافه یا حذف کلاس dark از HTML
  }

  return (
    <>
      <div
        className={`min-h-screen bg-gray-100 dark:bg-gray-800 z-10 py-8 ${isDarkMode ? "dark" : ""}`}
      >
        <TodoList />
      </div>
      {/*<SplashCursor />*/}
    </>
  )
}

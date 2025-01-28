import { Route, Routes } from "react-router-dom"
import { Habit } from "./pages/habit/Habit.tsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Habit />} />
      </Routes>
    </>
  )
}

export default App

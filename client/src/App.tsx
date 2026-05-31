import "./style.css"
import Header from "./components/Header"
import List from "./components/List"
import { useContext, useEffect } from "react"
import { TaskService } from "./service/task"
import { TaskContext } from "./context/task"
import Filter from "./components/Filter"
function App() {
  const {loadTasks} = useContext(TaskContext)
  useEffect(() => {
    TaskService.getAll()
      .then(response => {
        loadTasks(response.data.reverse())
      })
      .catch(error => console.error("Axios execution failed:", error.message));
  }, [])

  return (
    <div className="mx-auto max-w-5xl sm:py-6 py-10">
      <div className="todo">
        <Header />

        <Filter />

        <List />

      </div>
    </div>
  )
}

export default App
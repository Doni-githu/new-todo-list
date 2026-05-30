import "./style.css"
import Header from "./components/Header"
import List from "./components/List"
function App() {
  return (
    <div className="mx-auto max-w-5xl sm:py-6 py-10">
      <div className="todo">
        <Header />

        <List />

      </div>
    </div>
  )
}

export default App
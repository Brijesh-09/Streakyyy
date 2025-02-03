import Navbar from "./Components/Navbar"
import Todo from "./Components/Todo"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo_v2 from "./Components/Todo_v2";
import Home from "./pages/Home";

function App() {


  return (
    <><Router>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/todo" element={<Todo />} />
       <Route path="/todo_2" element={<Todo_v2 />} />
       </Routes>
    </Router>
    
    </>
  )
}

export default App

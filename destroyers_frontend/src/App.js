// import logo from './logo.svg';
import './App.css';
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";



function App() {
  return (
    <div style={{ height: "100vh", width: "100%"}}>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/ChatPage" element={<ChatPage/>} />
          </Routes>
    </div>
  );
}

export default App;

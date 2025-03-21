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






// function App() {
//   return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//               className="App-link"
//               href="https://reactjs.org"
//               target="_blank"
//               rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//   );
// }
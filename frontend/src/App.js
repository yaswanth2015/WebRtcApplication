
import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' element = {<Login />}/>
          {/* <Route path='/signup' element = {  }/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

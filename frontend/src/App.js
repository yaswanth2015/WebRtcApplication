
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/signup' element = { <SignUp /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

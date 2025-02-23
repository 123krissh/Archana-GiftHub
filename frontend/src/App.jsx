import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from './pages/Home';
import {Toaster} from "sonner";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      </Route>
      <Route>{/*Admin Layout */}</Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

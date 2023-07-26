import logo from "./logo.svg";
import "./App.css";
import DataProvider from "./context/DataProvider";
import Login from "./components/account/Login";
import Home from "./components/Home/Home";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import CreatePost from "./components/Create/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/Create/UpdatePost";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

const PrivateRoute = ({ isAuth, ...props }) => {
  return isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};
function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 65 }}>
          <Routes>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/create" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route path="/detail/:id" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/detail/:id" element={<DetailView />} />
            </Route>

            <Route path="/update/:id" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/update/:id" element={<UpdatePost />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuth={isAuth} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuth={isAuth} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

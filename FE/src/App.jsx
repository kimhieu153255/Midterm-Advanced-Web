import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ErrorPage from "./Pages/ErrorPage";
import Nav from "./Components/Layouts/Nav";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav></Nav>
              <Outlet></Outlet>
            </>
          }
        >
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </>
  );
}

export default App;

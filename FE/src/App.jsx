import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import NavLayout from './components/layouts/Nav';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import User from './pages/UserPage';

function App() {


    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <NavLayout />
                            <Outlet />
                            <Footer />
                        </>
                    }
                >
                    <Route path='/' element={<Dashboard></Dashboard>} />
                    <Route path='/login' element={<Login></Login>} />
                    <Route path='/register' element={<Register></Register>} />
                    <Route path='/user' element={<User></User>} />
                    <Route path='*' element={<ErrorPage></ErrorPage>} />
                </Route>
            </Routes>
        </>
    );
}
 
export default App;

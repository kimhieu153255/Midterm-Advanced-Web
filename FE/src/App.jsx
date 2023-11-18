import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/DashboardPage';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import NavLayout from './components/layouts/Nav';
import Footer from './components/layouts/Footer';
import ErrorPage from './Pages/ErrorPage';
import User from './Pages/UserPage';
import Layout from './components/layouts/Layout';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <div className='min-w-fit min-h-screen'>
                            <NavLayout />
                            <Outlet />
                            <Footer />
                        </div>
                    }
                >
                    <Route path='/' element={<Dashboard></Dashboard>} />
                    <Route path='/user' element={<User></User>}>
                        <Route path='' element={<User></User>} />
                    </Route>
                </Route>
                <Route path='*' element={<ErrorPage></ErrorPage>} />
                <Route path='/login' element={<Login></Login>} />
                <Route path='/register' element={<Register></Register>} />
            </Routes>
        </>
    );
}

export default App;

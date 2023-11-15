import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ErrorPage from './Pages/ErrorPage';
import NavLayout from './components/layouts/NavLayout';

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
                        </>
                    }
                >
                    <Route path='/' element={<Dashboard></Dashboard>} />
                    <Route path='/login' element={<Login></Login>} />
                    <Route path='/register' element={<Register></Register>} />
                    <Route path='*' element={<ErrorPage></ErrorPage>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;

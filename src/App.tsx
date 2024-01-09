import React from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from './style/theme';
import Loading from './components/Loading/Loading';
import UsernameForm from './views/UsernameForm/UsernameForm';
import ConfigurationForm from './views/ConfigurationForm/ConfigurationForm';
import Dashboard from './views/Dashboard/Dashboard';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route
                index
                element={
                    <Navigate
                        replace
                        to="/start"
                    />
                }
            />
            <Route
                path="start"
                lazy={() => import('./views/Start/Start')}
            />
            <Route
                path="quiz"
                lazy={() => import('./views/Quiz/Quiz')}
            />
            <Route
                path="classroom/:page"
                lazy={() => import('./views/Teacher/Teacher')}
            />
            <Route
                path="individual/:code"
                lazy={() => import('./views/Student/Student')}
            />
            <Route
                path="classroom"
                lazy={() => import('./views/Teacher/Teacher')}
            />
            <Route
                path="username"
                element={<UsernameForm />}
            />
            <Route
                path="configure"
                element={<ConfigurationForm />}
            />
            <Route
                path="dashboard"
                element={<Dashboard />}
            />
        </Route>
    )
);

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <RecoilRoot>
                    <React.Suspense
                        fallback={
                            <Loading
                                loading={true}
                                message="..."
                            />
                        }
                    >
                        <RouterProvider router={router} />
                    </React.Suspense>
                </RecoilRoot>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;

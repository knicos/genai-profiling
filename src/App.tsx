import React from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router';
import { Provider } from 'jotai';
import './App.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from '@genai-fi/base';
import Loading from './components/Loading/Loading';
import ConfigurationForm from './views/ConfigurationForm/ConfigurationForm';
import About from './views/About/About';
import { ProfileInformation } from './views/Create/ProfileInformation/ProfileInformation';
import { ClueCreation } from './views/Create/Clues/ClueCreation';
import ConfirmationView from './views/Create/Confirmation/ConfirmationView';
import Session from './views/Teacher/Session';
import CreateStart from './views/Create/CreateStart';

const routes = createRoutesFromElements(
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
            path="individual/:code"
            lazy={() => import('./views/Student/Student')}
        />
        <Route
            path="about"
            element={<About />}
        />
        <Route
            path="game"
            element={<Session />}
        >
            <Route
                index
                element={<Navigate replace to="/game/configure" />}
            />
            <Route
                path="configure"
                element={<ConfigurationForm />}
            />
            <Route
                path="classroom/:material/:lang"
                lazy={() => import('./views/Teacher/Teacher')}
            />
            <Route
                path="classroom/:material/:lang/:page"
                lazy={() => import('./views/Teacher/Teacher')}
            />
        </Route>
        <Route
            path="create"
        >
            <Route index element={<CreateStart />} />
            <Route
                path="editor"
                lazy={() => import('./views/Create/Create')}
            >
                <Route index element={<Navigate replace to="/create/editor/profile" />} />
                <Route
                    path="profile"
                    element={<ProfileInformation />}
                />
                <Route
                    path="clues"
                    element={<ClueCreation />}
                />
                <Route
                    path="preview"
                    element={<ConfirmationView />}
                />
            </Route>

        </Route>
    </Route>
)

const defaultRouter = createBrowserRouter(routes);

interface Props {
    router?: typeof defaultRouter;
}

function App({ router }: Props) {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Provider>
                    <React.Suspense
                        fallback={
                            <Loading
                                loading={true}
                                message="..."
                            />
                        }
                    >
                        <RouterProvider router={router || defaultRouter} />
                    </React.Suspense>
                </Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;

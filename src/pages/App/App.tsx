import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from 'src/components/Layout/Layout';
import { persistedStore, store } from 'src/config/redux/config';
import FavShows from 'src/pages/FavShows/FavShows';
import Home from 'src/pages/Home/Home';
import Cast from 'src/pages/Show/Cast/Cast';
import Episodes from 'src/pages/Show/Episodes/Episodes';
import Main from 'src/pages/Show/Main/Main';
import Seasons from 'src/pages/Show/Seasons/Seasons';
import Show from 'src/pages/Show/Show';
import { AppRoutes, ShowRoutes } from 'src/types/routes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.HOME} element={<Layout />}>
              <Route path={AppRoutes.HOME} element={<Home />} />
              <Route path={AppRoutes.SHOW} element={<Show />}>
                <Route path={ShowRoutes.MAIN} element={<Main />} />
                <Route path={ShowRoutes.EPISODES} element={<Episodes />} />
                <Route path={ShowRoutes.SEASONS} element={<Seasons />} />
                <Route path={ShowRoutes.CAST} element={<Cast />} />
              </Route>
              <Route path={AppRoutes.FAVSHOWLIST} element={<FavShows />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

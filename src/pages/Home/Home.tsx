import { useSelector } from 'react-redux';

import { RootState } from 'src/config/redux/config';
import { SearchedShows } from 'src/state/SearchedShowsReducer/types';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';
import StartingPage from 'src/pages/Home/StartingPage/StartingPage';
import Search from 'src/pages/Home/Search/Search';

const Home = (): JSX.Element => {
  const tvShowSearchList = useSelector<RootState, SearchedShows>((state) => state.search);
  const appIsLoadingState = useSelector<RootState, AppLoadingState>((state) => state.appLoading);

  return (
    <>
      {tvShowSearchList.searchedShowsList[0]?.name === undefined ? (
        <StartingPage />
      ) : (
        <Search tvShowSearchList={tvShowSearchList} appIsLoadingState={appIsLoadingState} />
      )}
    </>
  );
};
export default Home;

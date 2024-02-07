export enum AppRoutes {
  HOME = '/',
  SHOW = '/:showId',
  FAVSHOWLIST = '/user-shows',
  SEARCH = '/search/:searchId',
}
export enum ShowRoutes {
  MAIN = AppRoutes.SHOW + '/main',
  EPISODES = AppRoutes.SHOW + '/episodes',
  SEASONS = AppRoutes.SHOW + '/seasons',
  CAST = AppRoutes.SHOW + '/cast',
}

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  admin: state => state.user.admin,
  menu: state => state.user.menu,
  name: state => state.user.name,
  email: state => state.user.email,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  ebayEdit: state => state.user.ebayEdit,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters


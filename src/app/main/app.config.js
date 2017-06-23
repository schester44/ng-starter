export const otherwiseConfigBlock = ['$urlRouterProvider', $urlRouterProvider => { $urlRouterProvider.otherwise('/404'); }];
export const html5ModeConfigBlock = ['$locationProvider', $locationProvider => { $locationProvider.html5Mode(true); }];

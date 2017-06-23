import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngResource from 'angular-resource';

const importModules = [
  uiRouter,
  ngAnimate,
  ngResource
];

export const ngmodule = angular.module('app', importModules);

const BLANK_MODULE = {states: [], components: {}, directives: {}, services: {}, filters: {}, configBlocks: [], runBlocks: []};

export function loadNg1Module (ngModule, appModule) {
  let module = Object.assign({}, BLANK_MODULE, appModule);

  ngModule.config(['$stateProvider', $stateProvider => module.states.forEach(state => $stateProvider.state(state))]);

  Object.keys(module.components).forEach(name => ngModule.component(name, module.components[name]));
  Object.keys(module.directives).forEach(name => ngModule.directive(name, () => new module.directives[name]()));
  Object.keys(module.services).forEach(name => ngModule.service(name, module.services[name]));
  Object.keys(module.filters).forEach(name => ngModule.filter(name, module.filters[name]));
  
  module.configBlocks.forEach(configBlock => ngModule.config(configBlock));
  module.runBlocks.forEach(runBlock => ngModule.run(runBlock));

  return ngModule;
}

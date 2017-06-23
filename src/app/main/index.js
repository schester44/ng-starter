import { loadNg1Module, ngmodule } from '../bootstrap/ngmodule';

import { appState, fourOhFourState } from './app.states';

import { app } from './app.component';
import { fourOhFour } from './components/404';

import { otherwiseConfigBlock } from './app.config';

const mainAppModule = {
  components: { app, fourOhFour },
  states: [appState, fourOhFourState],
  configBlocks: [otherwiseConfigBlock],
  runBlocks: []
};

loadNg1Module(ngmodule, mainAppModule);

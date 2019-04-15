import { App } from './Components/App';
import { showChanges } from './devHelpers';

const app = new App(document.getElementById('app'));
app.run();

showChanges(document.getElementById('app'));

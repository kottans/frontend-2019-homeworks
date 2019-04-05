import 'normalize.css';
import '../sass/main.sass';
import '@babel/polyfill';
//import googleAutocomplete from "./googlePlaces"
//google.maps.event.addDomListener(window, 'load', googleAutocomplete);

import {App} from './Components/App';

new App(document.querySelector('.main'));

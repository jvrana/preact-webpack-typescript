import {h, render} from 'preact';
import {App} from './app/app';

import './styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
    render(<App/>, rootElement, rootElement.firstElementChild);
} else {
    render(<App/>, rootElement);
}

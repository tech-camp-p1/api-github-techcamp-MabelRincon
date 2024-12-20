import { getUser } from './script.js';

const $form = document.getElementById('form');

$form.addEventListener('submit', getUser);
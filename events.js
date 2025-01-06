import { getUserHandler } from './script.js';

const $form = document.getElementById('form');

$form.addEventListener('submit', getUserHandler);
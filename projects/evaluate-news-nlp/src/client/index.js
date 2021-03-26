import {handleSubmit} from './js/formHandler';
import checkForURL from './js/URLChecker';

import "./styles/_base.scss";
import "./styles/_header.scss";
import "./styles/_form.scss";
import "./styles/_footer.scss";
import 'bootstrap';


document.addEventListener('DOMContentLoaded', init, true);

function init(event){
  var button = document.getElementById('submit');
  button.addEventListener('click', handleSubmit, true);
};

export {handleSubmit, init}
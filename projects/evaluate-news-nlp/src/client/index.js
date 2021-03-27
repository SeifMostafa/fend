/// import function from js folder..
import {handleSubmit} from './js/formHandler';
/// import styles to be used for views.. and packed..
import "./styles/_base.scss";
import "./styles/_header.scss";
import "./styles/_form.scss";
import "./styles/_footer.scss";
import 'bootstrap';

// to create eventlistener on button to call handleSubmit function once doc. is loaded.
document.addEventListener('DOMContentLoaded', initListener, true);

/// setup event listners.. 
function initListener(event){
  // getting form button submit
  var button = document.getElementById('submit');
  // link handleSubmit function with user click trigger on button. 
  // bubbling handling is true..
  button.addEventListener('click', handleSubmit, true);
};
/// packed by webpack .. used on tests and generating main.js
export {handleSubmit, initListener}
import 'babel-polyfill'

/// import function from js folder..
import {handleFormSubmission} from './js/SubmissionFormHandler';
/// import styles to be used for views.. and packed..
import "./styles/_base.scss";
import "./styles/_header.scss";
import "./styles/_form.scss";
import "./styles/_footer.scss";
import 'bootstrap';

/// to fix regeneratorRuntime error and load babel-poly.
const regeneratorRuntime = require('regenerator-runtime');

// to create eventlistener on button to call handleFormSubmission function once doc. is loaded.
document.addEventListener('DOMContentLoaded', initListener, true);

/// setup event listners.. 
function initListener(event){
  // getting form button submit
  var button = document.getElementById('submit');
  // link handleFormSubmission function with user click trigger on button. 
  // bubbling handling is true..
  button.addEventListener('click', handleFormSubmission, true);
};
/// packed by webpack .. used on tests and generating main.js
export {handleFormSubmission, initListener}
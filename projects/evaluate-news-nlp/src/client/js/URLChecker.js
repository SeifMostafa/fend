/// reference https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
/*
/ to validate if URL is aligned with standard(return true) or not(return false)
*/
function isURLValid(inputText) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(inputText);
}
// to be imported by webpack and handleSubmit without {}
export default isURLValid

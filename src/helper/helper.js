/**
 * Function that escapes HTML
 * The api gives us a lot of encoded HTML and this helps us fix those problems
 * 
 * @param {String} html The String you want to 
 */
export const decodeHtml = (html)  =>{
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
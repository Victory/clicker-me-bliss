function ce(name) {
  return document.createElment(name);
}

function clickCheck (elm) {
  return true;
}

function bind(elm, evtName, callback) {
  elm.addEventListener(evtName, callback);
}

function gId(id) {
  return document.getElementById(id);
}

function num(id, val) {
  document.getElementById(id).innerText = val;
}
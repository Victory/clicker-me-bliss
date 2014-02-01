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
  document.getElementById(id).innerText = val.toFixed(0);
}

function forin(obj, callback) {
  var ii;
  for (ii in obj) {
    if (obj.hasOwnProperty(ii)) {
      callback(obj[ii], ii, obj);
    }
  }
}
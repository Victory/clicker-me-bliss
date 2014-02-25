function ce(name) {
  return document.createElement(name);
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
  try {
    text = document.createTextNode(val.toFixed(0).toString());
    elm = document.getElementById(id);
    elm.innerHTML = '';
    elm.appendChild(text);
  } catch (err) {
    console.log(err.message, id, val);
  }
}

function forin(obj, callback) {
  var ii;
  for (ii in obj) {
    if (obj.hasOwnProperty(ii)) {
      callback(obj[ii], ii, obj);
    }
  }
}
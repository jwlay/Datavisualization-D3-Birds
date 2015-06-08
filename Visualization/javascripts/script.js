var sql = window.SQL;
var db;
var contents;
var xhr = new XMLHttpRequest();
xhr.open('GET', './data/birdDatabase.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  db = new SQL.Database(uInt8Array);
  contents = db.exec("SELECT * FROM birdsTRY");
};
xhr.send();

var sunburstq = [];
var scatterq = [];

function runsql (query) {
  if (query[0] == scatter) {
    scatterq = [];
    for (var i = 1; i < query.length; i++) {
      scatterq.push(query[i]);
    }
  } else {
    sunburstq = [];
    for (var i = 1; i < query.length; i++) {
      sunburstq.push(query[i]);
    }
  }
  var sqlq = [];

  if (sunburstq.length != 0) {
    for (var i = 0; i < sunburstq.length; i++) {
      sqlq.push(sunburstq[i]);
    }
  }
  if (scatterq.length != 0) {
    for (var i = 0; i < scatterq.length; i++) {
      sqlq.push(scatterq[i]);
    }
  }

  var squery = sqlq.join(" AND ");

  contents = db.exec("SELECT * FROM birdsTRY WHERE " +squery);
  console.log(contents);
}

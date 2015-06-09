var sql = window.SQL;
var db;
var contents;
var xhr = new XMLHttpRequest();
xhr.open('GET', './data/withNRec.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  db = new SQL.Database(uInt8Array);
  contents = db.exec("SELECT * FROM withNRec");
  runsql(["empty"]);
};
xhr.send();

var sunburstq = [];
var scatterq = [];
var sunb;

function runsql (query) {
  if (query.length > 1) {
    if (query[0] == "scatter") {
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

    contents = db.exec("SELECT * FROM withNRec WHERE " +squery);
    sunb = db.exec("SELECT conservation, habitat, nesting, name FROM withNRec WHERE "+squery);
  } else {
    scatterq = [];
    sunburstq = [];
    contents = db.exec("SELECT * FROM withNRec");
    sunb = db.exec("SELECT conservation, habitat, nesting, name FROM withNRec");
  }
  suncsv = [];
  if (query[0] != "sunburst") {
    for (i = 0; i < sunb[0].values.length; i++) {
      var j = sunb[0].values[i].join("-");
      var jp = [j, 1];
      suncsv.push(jp);
    }
    createSunburst();
  }
}

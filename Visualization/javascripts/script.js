var sql = window.SQL;
var db;
var contents;
var xhr = new XMLHttpRequest();
xhr.open('GET', './data/withNRec.sqlite', true);
xhr.responseType = 'arraybuffer';
var newData;
xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  db = new SQL.Database(uInt8Array);
  contents = db.exec("SELECT * FROM withNRec");
  runsql(["empty"]);
  newData = JSON.stringify(contents);
};
xhr.send();

var newData;

var sunburstq = [];
var scatterq = [];
var barcsv = [];
var sunb;

function runsql (query) {
  if (query[0] != 'empty') {
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
    if (squery.length > 1) {
      contents = db.exec("SELECT * FROM withNRec WHERE " +squery);
      sunb = db.exec("SELECT conservation, habitat, nesting, name FROM withNRec WHERE "+squery);
    } else {
      contents = db.exec("SELECT * FROM withNRec");
      sunb = db.exec("SELECT conservation, habitat, nesting, name FROM withNRec");
  }
  } else {
    scatterq = [];
    sunburstq = [];
    contents = db.exec("SELECT * FROM withNRec");
    sunb = db.exec("SELECT conservation, habitat, nesting, name FROM withNRec");
  }
  suncsv = [];
  if (query[0] != "sunburst") {
    var no = " 1";
    for (i = 0; i < sunb[0].values.length; i++) {
      var j = sunb[0].values[i].join("++");
      var jp = [j+'-end', no];
      suncsv.push(jp);
    }
    createSunburst();
  }

  barcsv = [];
    for (i = 0; i < contents[0].values.length; i++) {
      barcsv.push(new Object(contents[0].values[i]));
    }
    newData = JSON.stringify(barcsv);
}

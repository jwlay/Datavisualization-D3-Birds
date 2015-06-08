/*var sql = window.SQL;
var db;
var contents;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'localhost/Visualization/data/birdDatabase.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  db = new SQL.Database(uInt8Array);
  contents = db.exec("SELECT * FROM birdsTRY");
  console.log(contents);
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
};
xhr.send();*/
var sql = window.SQL;
var fs = window.fs;
var dbFile = "data/birdDatabase.sqlite";
var fileBuffer = fs.readFileSync(dbFile);
var db = new SQL.Database(fileBuffer);
/*
// Execute some sql
sqlstr = "CREATE TABLE hello (a int, b char);";
sqlstr += "INSERT INTO hello VALUES (0, 'hello');"
sqlstr += "INSERT INTO hello VALUES (1, 'world');"
db.run(sqlstr); // Run the query without returning anything

var res = db.exec("SELECT * FROM hello");
console.log(res);
/*
[
    {columns:['a','b'], values:[[0,'hello'],[1,'world']]}
]
*/
/*
// Prepare an sql statement
var stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

// Bind values to the parameters and fetch the results of the query
var result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
console.log(result); // Will print {a:1, b:'world'}

// Bind other values
stmt.bind([0, 'hello']);
while (stmt.step()) console.log(stmt.get()); // Will print [0, 'hello']

// free the memory used by the statement
stmt.free();
*/

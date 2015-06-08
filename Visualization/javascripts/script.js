<<<<<<< HEAD
d3.json("data/birds.json",function(dataset){
                        
                            //var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                            //               11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
                            var h=200;
                            var w=5000;
                            var barPadding=1;
                     
                            var svg = d3.select("body")
                                .append("svg")
                                .attr("width",w)
                                .attr("height",h);
                                    
                            svg.selectAll("rect")
                                .data(dataset)
                                .enter()
                                .append("rect")
                                .attr("x",0)
                                .attr("y", function(d){
                                    return h-d.MaxLength;
                                })
                                .attr("width", w/dataset.length -barPadding)
                                .attr("x",function(d,i){
                                    return i* (w/ dataset.length);
                                })
                                .attr("height",function(d) {
                                    return d.MaxLength;
                                })
                                .attr("fill", function(d) {
                                    return "rgb(0, 0, " + (d.MaxLength * 10) + ")";
                                });
                        
                            svg.selectAll("text")
                                .data(dataset)
                                .enter()
                                .append("text")
                                .text(function(d) {
                                    return d.MaxLength;
                                })
                                .attr("x", function(d, i){
                                    return i * (w/dataset.length) + ((w/dataset.length-                                               barPadding)/2);
                                })
                                .attr("y", function(d){
                                    return h - (d.MaxLength) + 14;
                                })
                                .attr("font-family", "sans-serif")
                                .attr("font-size", "11px")
                                .attr("fill", "white")
                                .attr("text-anchor", "middle");
                        });
=======
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
>>>>>>> origin/Ina

d3.json(newData,function(dataset){

                            //var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                            //               11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

                            //var h=800;
                            //var w=dataset.length*10;

                            var barPadding=1;

                            var margin = {top: 20, right: 30, bottom: 30, left: 40},
                            w= 5000 - margin.left - margin.right,
                            h= 200 - margin.top - margin.bottom;

                            var cValue = function(d) { return d.conservation;},
                                color = d3.scale.category10();

                            var yScale = d3.scale.linear()
                                .domain([0, d3.max(DDa, function(d) { return d.numRecordings; })])
                                .range([h, 0]);

                            var yAxis = d3.svg.axis()
                                .scale(yScale)
                                .orient("left");

                            var svg = d3.select("#bar")
                                .append("svg")
                                .attr("width", w + margin.left +      margin.right)
                                .attr("height", h + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform",
                                        "translate(" + margin.left + "," + margin.top + ")");

                            svg.append("g")
                                .attr("class", "axis")
                                .attr("transform", "translate(" -30 + ",0)")
                                .style("opacity",1)
                                //.style("fill","none");
                                .call(yAxis)
                            .append("text")
                                .attr("class", "label")
                                .attr("transform", "rotate(-90)")
                                .attr("y", 6)
                                .attr("dy", ".71em")
                                .attr("x",0)
                                .style("text-anchor", "end")
                                .text("Nunber of Recordings");




                            svg.selectAll("rect")
                                .data(DDa)
                                .data(DDa.sort(function(a, b){return b.numRecordings-                                                               a.numRecordings}))
                                .enter()
                                .append("rect")
                                .attr("x",0)
                                .attr("y", function(d){
                                    return yScale(d.numRecordings);
                                })
                                .attr("width", w/DDa.length -barPadding)
                                .attr("x",function(d,i){
                                    return i* (w/DDa.length)+15;
                                })
                                .attr("height",function(d) {
                                    return h-yScale(d.numRecordings);
                                })
                                .style("fill", function(d) { return color(cValue(d));})
                                .on("mouseover", function(d) {
                                tooltip.transition()
                                    .duration(200)
                                    .style("opacity", .9);
                                tooltip.html("<h>"+d.name+"</h>" + "<br/>"  +"<p>"+ "Number of Recordings: " +                                               d.numRecordings+ "<br/>"+"Conservation Status: "+ d.conservation+"</p>")

                                    .style("left", (d3.mouse(this)[0]-document.getElementById("bar").scrollLeft) + "px")
                                    .style("top", (50 + d3.mouse(this)[1]) + "px");
                                })

                                .on("mouseout", function(d) {
                                tooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0);
                                });

                            /*svg.selectAll("text")
                                .data(dataset)
                                .enter()
                                .append("text")
                                .attr("class", "text")
                                .text(function(d) {
                                    return d.numRecordings;
                                })
                                .attr("x", function(d, i){
                                    return i * (w/dataset.length) + ((w/dataset.length-                                               barPadding)/2);
                                })
                                .attr("y", function(d){
                                    return h - (d.numRecordings) + 14;
                                })
                                .attr("font-family", "sans-serif")
                                .attr("font-size", "11px")
                                .attr("fill", "white")
                                .attr("text-anchor", "middle");*/

  function change() {
        var value = this.value;
        svg.selectAll("rect").value(function(d) { return d[value]; }); // change the value function
        svg.selectAll("rect").data(DDa); // compute the new angles
        svg.selectAll("rect").transition().duration(750).attrTween("d", arcTween); // redraw the arcs
      }
  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    }
  };

                var tooltip = d3.select("#bar").append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0);

                    });

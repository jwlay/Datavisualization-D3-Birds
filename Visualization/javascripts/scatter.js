d3.json("data/BirdsFinal.json",function(dataset){
    var h=500;
    var w=1000;
    var padding = 35;
    var xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d.AvgWingspan; })])
            .range([padding, w-padding]);
    
    var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d.AvgLength; })])
            .range([h-padding, padding]);
         
    var rScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d.AvgWeight; })])
            .range([2, 35]);
    
    var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
    
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
    
    var cValue = function(d) { return d.food;},
        color = d3.scale.category20();
    
    var tooltip = d3.select("#scatter").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);    
        
    var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
   
    svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .style("fill", function(d) { return color(cValue(d));})
            .attr("cx", function(d) {
                return xScale(d.AvgWingspan);
            })
            .attr("cy", function(d) {
                return yScale(d.AvgLength);
            })
            .attr("r", function(d){
                return rScale(d.AvgWeight);
            })
            .on("mouseover", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<h>"+d.name+"</h>" + "<br/>"  +"<p>"+ "Wingspan: " + d.AvgWingspan + "<br/>" +                                   "Length: " + d.AvgLength + "<br/>" + "Weight: " + d.AvgWeight + "                               <br/>" + "Food: " + d.food+"</p>")
                    .style("left", (d3.select(this).attr("cx")) + "px")
                    .style("top", (d3.select(this).attr("cy")) + "px");
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
            .text(function(d){
                return d.name;
            })
            .attr("x",function(d){
              return xScale(d.AvgWingspan);  
            })
            .attr("y",function(d){
              return yScale(d.AvgLength);  
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "red");*/
    
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
        .append("text")
            .attr("class", "label")
            .attr("x", w-padding)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Wingspan (cm)");
    
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
        .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .attr("x",-padding)
            .style("text-anchor", "end")
            .text("Length (cm)");
      
    // draw legend
    var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," +( 200 + i * 20) + ")";       });

    // draw legend colored rectangles
    legend.append("rect")
            .attr("x", w - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

    // draw legend text
    legend.append("text")
            .attr("x", w - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d;})
        
});
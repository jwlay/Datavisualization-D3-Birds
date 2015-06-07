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
    
        
    var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
   
    svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
    
            .attr("cx", function(d) {
                return xScale(d.AvgWingspan);
            })
            .attr("cy", function(d) {
                return yScale(d.AvgLength);
            })
            .attr("r", function(d){
                return rScale(d.AvgWeight);
            });
    
    svg.selectAll("text")
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
            .attr("fill", "red");
    
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
    
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
});
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
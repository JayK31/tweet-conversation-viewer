// m = margins, set height and width by subtracting from m(left, top, right, bottom)
// not sure what i is here
var m = [20, 120, 20, 120],
    w = 1280 - m[1] - m[3],
    h = 5000 - m[0] - m[2],
    i = 0,
    // add padding to offset increasing circle r 
    padding = 40,
    root;

// creates new tree layout with default settings except size
// the default sort order is null; the default children accessor assumes each input data is an object with a children array; the default separation function uses one node width for siblings, and two node widths for non-siblings;
// https://github.com/mbostock/d3/wiki/Tree-Layout
var tree = d3.layout.tree()
    .size([w, h]);

// Constructs a new diagonal generator with the default accessor functions (that assume the input data is an object with named attributes matching the accessors
// the projection converts the starting or ending point returned by the source and target accessors, returning a two-element array of numbers. The default accessor assumes that the input point is an object with x and y attributes
// https://github.com/mbostock/d3/wiki/SVG-Shapes
// https://github.com/mbostock/d3/wiki/SVG-Shapes#diagonal_projection
var diagonal = d3.svg.diagonal()
    // .projection(function(d) { return [d.y, d.x]; });
    // changing the projection to d.x, d.y to convert to vertical tree
    .projection(function(d) {return [d.x, d.y]; });

var vis = d3.select("#body").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
    .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")")

 

d3.json("conversation3.json", function(json) {
  root = json;
  // change x0,y0 values
  // not sure what this is doing, has no effect on orientation
  // root.x0 = h / 2;
  // root.y0 = 0;
  root.x0 = 0;
  root.y0 = w / 2;

  function toggleAll(d) {
    if (d.children) {
      d.children.forEach(toggleAll);
      toggle(d);
    }
  }

  // Initialize the display to show a few nodes.
  root.children.forEach(toggleAll);

  toggle(root)
  // toggle(root.children[1].children[2]);
  // toggle(root.children[9]);
  // toggle(root.children[9].children[0]);

  update(root);
});

function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  // depth of each node
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
      .on("click", function(d) { toggle(d); update(d); })
  

      // changing the source from y,x to x,y appends new nodes from top to bottom instead of left to right
      // setting parent node
      // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })



    
// sweet sweet code
  nodeEnter.append("rect")
      .attr("class", "rect")
      .attr("stroke", function(d) {
        if (d._children == null) {
          return "orange"
        } else {
          return "rgb(29,202,255)"
        }
      })
      .attr("stroke-width", 5)
      .attr("fill", "none")
      .attr("height", 75)
      .attr("width", 75)
  nodeEnter.append("image")
      .attr("xlink:href", function(d) {
        return d.image
      })
      .attr("width", 75)
      .attr("height", 75)
      .attr("class", "framed")
      .attr("preserveAspectRatio", "xMinYMin")
      .on("mouseover", function(d) {
        $("div[id^='tooltipsy']").remove()
        $(this).attr("title", d.name + " says: " + d.text).tooltipsy({
          // have to hardcode this offset for now
          offset: [-65, 30]
        })

  nodeEnter.append("svg:text")
      .attr("class", "tweet")
      .attr("x", function(d) { return d.children || d._children ? -5 : -75; })
      .attr("y", function(d) { return d.children || d._children ? 35 : 35; })
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .style("fill-opacity", 1e-6)
      })
  
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      // add padding so first node isnt off the svg
      .attr("transform", function(d) { return "translate(" + (d.x - 37.5) + "," + d.y + ")"; });  
      // above, switching the translate for node placement on svg
      // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + (source.x-padding) + "," + source.y + ")"; })
      .remove();
      // now switching x,y for exiting nodes
      // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  // #tree.links returns array of objects representing links from parent 
  // to child for each node
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; })


  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .style("stroke", function(d) {
        if (d.children == !null) {
          return "blue"
        } else {
          return "black"  
        }
      })
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        // sets where nodes arrives from
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children.
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
}


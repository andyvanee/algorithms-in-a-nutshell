//
// DEPTH-FIRST SEARCH
// Figure 7-5
//

var not = require('../lib').not;

//
// A cell is constructed from a string like "0-0"
//
function cell(str, optionalDepth) {
  var parts = str.split('-')
  ,   depth = optionalDepth ? optionalDepth : 0
  ;

  return {
    // The search depth, which is incremented each generation
    depth: function(){ return depth },
    // A string representation
    toString: function(){ return str },
    // The left-hand value
    x: function(){ return parseInt(parts[0]) },
    // The right-hand value
    y: function(){ return parseInt(parts[1]) },
    // Iterate the next available moves with the supplied callback
    moves: function(cb){
      return [
        cell([this.x()+1, this.y()  ].join('-'), this.depth()+1),
        cell([this.x()  , this.y()+1].join('-'), this.depth()+1)
      ].forEach(cb)
    },
    // Check if this cell is equivalent to another given cell
    eq: function(other) {
      return (other.toString() == this.toString())
    },
    // Check if the hash contains this cell
    in: function(hash) {
      return hash[this.toString()] !== undefined;
    }
  };
}

//
// The search algorithm (mostly) as presented in Figure 7-5
//
function depthFirstSearch(initial, goal){
  var open = [initial]
  ,   closed = {}
  ,   solution = false
  ,   maxDepth = 20
  ;

  if (initial.eq(goal)) { solution = goal }

  while (open.length && solution === false) {
    var n = open.shift();

    closed[n.toString()] = true;

    n.moves(function(next){
      if (not(next.in(closed))) {
        next.eq(goal) ? (solution = next) : false;
        (next.depth() < maxDepth) ? open.push(next) : false;
      }
    });
  }
  return solution ? solution : false;
}

module.exports = {
  cell: cell,
  depthFirstSearch: depthFirstSearch
};

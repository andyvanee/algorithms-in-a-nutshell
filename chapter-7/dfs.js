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
    depth: function(){ return depth },
    toString: function(){ return str },
    x: function(){ return parseInt(parts[0]) },
    y: function(){ return parseInt(parts[1]) },
    moves: function(cb){
      return [
        cell([this.x()+1, this.y()  ].join('-'), this.depth()+1),
        cell([this.x()  , this.y()+1].join('-'), this.depth()+1)
      ].forEach(cb)
    },
    eq: function(other) {
      return (other.toString() == str)
    },
    in: function(hash) {
      return hash[this.toString()] !== undefined;
    }
  };
}

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

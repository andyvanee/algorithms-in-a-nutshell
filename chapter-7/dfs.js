//
// DEPTH-FIRST SEARCH
// Figure 7-5
//

var set = require('../lib').set
,   stack = require('../lib').stack
;

//
// The search algorithm (mostly) as presented in Figure 7-5
//
function depthFirstSearch(initial, goal, _maxDepth) {
  var open     = stack(initial)
  ,   closed   = set()
  ,   solution = false
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ;

  if (initial.eq(goal)) { solution = goal }

  while (open.length() && solution === false) {
    var n = open.pop();

    closed.insert(n.toString());

    n.moves(function(next) {
      if (closed.contains(next.toString())) return;
      if (next.eq(goal)) solution = next;
      if (next.depth() < maxDepth) open.insert(next);
    });
  }
  return solution ? solution : false;
}

module.exports = depthFirstSearch;


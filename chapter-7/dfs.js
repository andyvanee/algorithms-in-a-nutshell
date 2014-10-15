//
// DEPTH-FIRST SEARCH
// Figure 7-5
//

var storage = require('../storage');

//
// The search algorithm (mostly) as presented in Figure 7-5
//
function depthFirstSearch(initial, goal, _maxDepth) {
  var open     = storage.stack(initial)
  ,   closed   = storage.set()
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


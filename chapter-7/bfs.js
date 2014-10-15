//
// BREADTH-FIRST SEARCH
// Figure 7-8
//

var storage = require('../storage');

//
// The search algorithm (mostly) as presented in Figure 7-8
//
function breadthFirstSearch(initial, goal, _maxDepth) {
  var open     = storage.queue(initial)
  ,   closed   = storage.set()
  ,   solution = false
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ;

  if (initial.eq(goal)) { solution = goal }

  while (open.length() && solution === false) {
    var n = open.head();

    closed.insert(n.toString());

    n.moves(function(next) {
      if (closed.contains(next.toString())) return;
      if (next.eq(goal)) solution = next;
      if (next.depth() < maxDepth) open.insert(next);
    });
  }
  return solution ? solution : false;
}

module.exports = breadthFirstSearch;

//
// BREADTH-FIRST SEARCH
// Figure 7-8
//

var not = require('../lib').not
,   set = require('../lib').set
,   queue = require('../lib').queue
;

//
// The search algorithm (mostly) as presented in Figure 7-8
//
function breadthFirstSearch(initial, goal, _maxDepth) {
  var open     = queue(initial)
  ,   closed   = set()
  ,   solution = false
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ;

  if (initial.eq(goal)) { solution = goal }

  while (open.length() && solution === false) {
    var n = open.head();

    closed.insert(n.toString());

    n.moves(function(next) {
      if (not(closed.contains(next.toString()))) {
        next.eq(goal) && (solution = next);
        (next.depth() < maxDepth) && open.insert(next);
      }
    });
  }
  return solution ? solution : false;
}

module.exports = breadthFirstSearch;

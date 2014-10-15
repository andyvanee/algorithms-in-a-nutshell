//
// DEPTH-FIRST SEARCH
// Figure 7-5
//

var storage = require('../storage_type').StorageType
,   solution = require('../lib').solution
;


//
// The search algorithm (mostly) as presented in Figure 7-5
//
function depthFirstSearch(initial, goal, _maxDepth) {
  var open     = storage.stack(initial)
  ,   closed   = storage.set()
  ,   s = solution()
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ;

  if (initial.eq(goal)) { s = solution(goal, 0) }

  while (open.length() && s.solved() === false) {
    var n = open.pop();

    closed.insert(n.toString());

    n.moves(function(next) {
      if (closed.contains(next.toString())) return;
      if (next.eq(goal)) s = solution(next, 0);
      if (next.depth() < maxDepth) open.insert(next);
    });
  }
  return s;
}

module.exports = depthFirstSearch;


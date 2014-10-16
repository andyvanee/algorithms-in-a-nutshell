//
// A*SEARCH
// Figure 7-10
//

var storage = require('../storage_type').StorageType
,   solution = require('../lib').solution
;

//
// The search algorithm (mostly) as presented in Figure 7-10
//
function aStar(initial, goal) {
  var open     = storage.priorityQueue([initial])
  ,   closed   = storage.set()
  ;
}

module.exports = aStar;

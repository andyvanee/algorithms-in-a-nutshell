function not(q) { return !q; }

function assertEqual(a, b) {
  if (a === b) { process.stdout.write('.') }
  else { console.log('Failed assertEqual: ' + a + ' == ' + b) }
}

//
// Implementation of set, using the keys of a hash
//
function set() {
  var _hash = {};

  return {
    insert: function(k) { _hash[k] = true },
    contains: function(k) { _hash[k] !== undefined }
  }
}

//
// Implementation of stack, using an array (LIFO)
//
function stack(args, etc) {
  var stack = Array.prototype.slice.call(arguments);

  return {
    length: function() { return stack.length },
    pop: function(){ return stack.pop() },
    insert: function(val) { return stack.unshift(val) }
  }
}

//
// Implementation of queue, using an array (FIFO)
//
function queue(args, etc) {
  var queue = Array.prototype.slice.call(arguments);

  return {
    length: function() { return queue.length },
    head: function() { return queue.shift() },
    insert: function(val) { return queue.push(val) }
  }
}

//
// A cell is constructed from a string like "0-0"
//
function cell2(str, optionalDepth) {
  var parts = str.split('-')
  ,   depth = optionalDepth ? optionalDepth : 0
  ;

  return {
    // The search depth, which is incremented each generation
    depth: function() { return depth },
    // A string representation
    toString: function() { return str },
    // The left-hand value
    x: function() { return parseInt(parts[0]) },
    // The right-hand value
    y: function() { return parseInt(parts[1]) },
    // Iterate the next available moves with the supplied callback
    moves: function(cb) {
      return [
        cell2([this.x()+1, this.y()  ].join('-'), this.depth()+1),
        cell2([this.x()  , this.y()+1].join('-'), this.depth()+1)
      ].forEach(cb)
    },
    // Check if this cell is equivalent to another given cell
    eq: function(other) {
      return (other.toString() == this.toString())
    }
  };
}

module.exports = {
  not: not,
  set: set,
  assertEqual: assertEqual,
  stack: stack,
  queue: queue,
  cell2: cell2
}

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

module.exports = {
  set: set,
  stack: stack,
  queue: queue
}

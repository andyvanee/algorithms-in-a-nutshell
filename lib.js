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
// Implementation of stack, using an array
//
function stack(args, etc) {
  var stack = Array.prototype.slice.call(arguments);

  return {
    length: function() { return stack.length },
    pop: function(){ return stack.pop() },
    insert: function(val) { return stack.unshift(val) }
  }
}

module.exports = {
  not: not,
  set: set,
  assertEqual: assertEqual,
  stack: stack
}

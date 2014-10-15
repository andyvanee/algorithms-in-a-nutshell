(function(global){
  global.StorageType = {
    //
    // Implementation of set, using the keys of a hash
    //
    set: function() {
      var _hash = {};

      return {
        insert: function(k) { _hash[k] = true },
        contains: function(k) { _hash[k] !== undefined }
      }
    },

    //
    // Implementation of stack, using an array (LIFO)
    //
    stack: function(args, etc) {
      var stack = Array.prototype.slice.call(arguments);

      return {
        length: function() { return stack.length },
        pop: function(){ return stack.pop() },
        push: function(val) { return stack.push(val) }
      }
    },

    //
    // Implementation of queue, using an array (FIFO)
    //
    queue: function(args, etc) {
      var queue = Array.prototype.slice.call(arguments);

      return {
        length: function() { return queue.length },
        head: function() { return queue.shift() },
        insert: function(val) { return queue.push(val) }
      }
    }
  }
})(typeof module !== 'undefined' && module.exports ? module.exports : this);

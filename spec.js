function spec(name, cb){
  cb({
    assertEqual: function(a, b) {
      if (a === b) { process.stdout.write('.') }
      else { console.log('Failed assertEqual: ' + a + ' == ' + b) }
    }
  });
  console.log(name);
}

module.exports = spec;

function not(q) { return !q; }

function assertEqual(a, b){
  if (a === b) process.stdout.write('.');
  else console.log('Failed assertEqual: '+a+' == '+b);
}

module.exports = {
  not: not,
  assertEqual: assertEqual
}

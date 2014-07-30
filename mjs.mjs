#metaimport
  masakari
  hash-require

#require
  meta-script
  mori

fun format-location {line, column} ->
  if line
    if column
      '(' + line + ',' + column + ')'
    else
      '(' + line + ')'
  else
    ''

fun check files ->
  var mjs = meta-script ()
  files.for-each fun file ->
    var compiler = mjs.compiler-from-file file
    var ast = compiler.produce-ast ()
    compiler.errors.for-each fun error ->
      console.log
        file + format-location error + ': ' + error.message
  0

#external module.exports = check

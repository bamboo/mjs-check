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

fun log-error (file, location, message) ->
  console.log
    file + format-location location + ': ' + message

fun check files ->
  var mjs = meta-script ()
  files.for-each fun file -> do!
    try
      var compiler = mjs.compiler-from-file file
      var ast = compiler.produce-ast ()
      compiler.errors.for-each fun error ->
        log-error (file, error, error.message)
    catch var e
      log-error (file, {line: 1, column: 1}, (e.message || e.to-string ()))

  0

#external module.exports = check

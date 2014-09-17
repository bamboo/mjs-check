#metaimport
  masakari
  hash-require

#require
  meta-script
  mori
  fs

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

fun check-file-as (filename, file, mjs) -> do!
  try
    var compiler = mjs.compiler-from-string
      fs.read-file-sync (file, {encoding: 'utf8'})
      filename
    var ast = compiler.produce-ast ()
    compiler.errors.for-each fun error ->
      log-error (file, error, error.message)
  catch var e
    log-error (file, {line: 1, column: 1}, (e.message || e.to-string ()))

fun check files ->
  var mjs = meta-script ()
  var filename-stack = []
  var parsing-file-name = false
  files.for-each file -> do!
    if parsing-file-name
      filename-stack.push file
      parsing-file-name = false
    else if (file == '--name')
      parsing-file-name = true
    else
      check-file-as
        filename-stack.pop () || file
        file
        mjs
  0

#external module.exports = check

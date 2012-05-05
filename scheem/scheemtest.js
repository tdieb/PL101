var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

fs.readFile('scheem.peg', 'ascii', function(err, data) {
    // Show the PEG grammar file
    console.log(data);
    // Create my parser
    var parse = PEG.buildParser(data).parse;
    // Do a test
    assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
    assert.deepEqual( parse(
        "(define factorial\n\
    (lambda (n)\n\
        (if (= n 0) 1\n\
            ;; beware of negative values for n\n\
            (* n (factorial (- n 1))))))"),
        ["define", "factorial", ["lambda", ["n"], ["if", ["=", "n", 0], 1, ["*", "n", ["factorial", ["-", "n", 1]]]]]] );
    assert.deepEqual( parse("5"), 5 );
    assert.deepEqual( parse("-5"), -5 );
});
if (typeof module !== 'undefined') {
    // In Node load required modules
    var assert = require('chai').assert;
    var evalScheem = require('../scheem').evalScheem;
} else {
    // In browser assume already loaded by <script> tags
    var assert = chai.assert;
}

suite('quote', function() {
    test('a number', function() {
        assert.deepEqual(
            evalScheem(['quote', 3], {}),
            3
        );
    });
    test('an atom', function() {
        assert.deepEqual(
            evalScheem(['quote', 'dog'], {}),
            'dog'
        );
    });
    test('a list', function() {
        assert.deepEqual(
            evalScheem(['quote', [1, 2, 3]], {}),
            [1, 2, 3]
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['quote'], {});
        });
        assert.throws(function () {
            evalScheem(['quote', 1, 2], {});
        });
    });
});

suite('operators', function() {
    test('+', function() {
        assert.deepEqual(
            evalScheem(['+', 3, 7], {}),
            10
        );
    });
    test('-', function() {
        assert.deepEqual(
            evalScheem(['-', 55, 45], {}),
            10
        );
    });
    test('*', function() {
        assert.deepEqual(
            evalScheem(['*', 2, 5], {}),
            10
        );
    });
    test('/', function() {
        assert.deepEqual(
            evalScheem(['/', 550, 55], {}),
            10
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['+'], {});
        });
        assert.throws(function () {
            evalScheem(['+', 1], {});
        });
        assert.throws(function () {
            evalScheem(['+', 1, 2, 3], {});
        });
        assert.throws(function () {
            evalScheem(['-'], {});
        });
        assert.throws(function () {
            evalScheem(['-', 1], {});
        });
        assert.throws(function () {
            evalScheem(['-', 1, 2, 3], {});
        });
        assert.throws(function () {
            evalScheem(['*'], {});
        });
        assert.throws(function () {
            evalScheem(['*', 1], {});
        });
        assert.throws(function () {
            evalScheem(['*', 1, 2, 3], {});
        });
        assert.throws(function () {
            evalScheem(['/'], {});
        });
        assert.throws(function () {
            evalScheem(['/', 1], {});
        });
        assert.throws(function () {
            evalScheem(['/', 1, 2, 3], {});
        });
    });
});

suite('variables', function() {
    test('lookup', function() {
        var env = {a: 1};
        assert.deepEqual(
            evalScheem('a', env),
            1
        );
        assert.deepEqual(
            env,
            {a: 1}
        );
    });
    test('define', function() {
        var env = {};
        assert.deepEqual(
            evalScheem(['define', 'x', 5], env),
            0
        );
        assert.deepEqual(
            env,
            {x: 5}
        );
    });
    test('set!', function() {
        var env = {a: 1};
        assert.deepEqual(
            evalScheem(['set!', 'a', 3], env),
            0
        );
        assert.deepEqual(
            env,
            {a: 3}
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['define'], {});
        });
        assert.throws(function () {
            evalScheem(['define', 'x'], {});
        });
        assert.throws(function () {
            evalScheem(['define', 'x', 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['set!'], {});
        });
        assert.throws(function () {
            evalScheem(['set!', 'x'], {});
        });
        assert.throws(function () {
            evalScheem(['set!', 'x', 1, 2], {});
        });
    });
});

suite('compares', function() {
    test('=', function() {
        assert.deepEqual(
            evalScheem(['=', 3, 5], {}),
            '#f'
        );
        assert.deepEqual(
            evalScheem(['=', 7, 7], {}),
            '#t'
        );
        assert.deepEqual(
            evalScheem(['=', 10, 9], {}),
            '#f'
        );
    });
    test('<', function() {
        assert.deepEqual(
            evalScheem(['<', 3, 5], {}),
            '#t'
        );
        assert.deepEqual(
            evalScheem(['<', 7, 7], {}),
            '#f'
        );
        assert.deepEqual(
            evalScheem(['<', 10, 9], {}),
            '#f'
        );
    });
    test('<=', function() {
        assert.deepEqual(
            evalScheem(['<=', 3, 5], {}),
            '#t'
        );
        assert.deepEqual(
            evalScheem(['<=', 7, 7], {}),
            '#t'
        );
        assert.deepEqual(
            evalScheem(['<=', 10, 9], {}),
            '#f'
        );
    });
    test('>', function() {
        assert.deepEqual(
            evalScheem(['>', 3, 5], {}),
            '#f'
        );
        assert.deepEqual(
            evalScheem(['>', 7, 7], {}),
            '#f'
        );
        assert.deepEqual(
            evalScheem(['>', 10, 9], {}),
            '#t'
        );
    });
    test('>=', function() {
        assert.deepEqual(
            evalScheem(['>=', 3, 5], {}),
            '#f'
        );
        assert.deepEqual(
            evalScheem(['>=', 7, 7], {}),
            '#t'
        );
        assert.deepEqual(
            evalScheem(['>=', 10, 9], {}),
            '#t'
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['='], {});
        });
        assert.throws(function () {
            evalScheem(['=', 1], {});
        });
        assert.throws(function () {
            evalScheem(['=', 0, 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['<'], {});
        });
        assert.throws(function () {
            evalScheem(['<', 1], {});
        });
        assert.throws(function () {
            evalScheem(['<', 0, 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['<='], {});
        });
        assert.throws(function () {
            evalScheem(['<=', 1], {});
        });
        assert.throws(function () {
            evalScheem(['<=', 0, 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['>'], {});
        });
        assert.throws(function () {
            evalScheem(['>', 1], {});
        });
        assert.throws(function () {
            evalScheem(['>', 0, 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['>='], {});
        });
        assert.throws(function () {
            evalScheem(['>=', 1], {});
        });
        assert.throws(function () {
            evalScheem(['>=', 0, 1, 2], {});
        });
    });
});
suite('list operations', function() {
    test('cons', function() {
        assert.deepEqual(
            evalScheem(['cons', 3, ['quote', [5, 7]]], {}),
            [3, 5, 7]
        );
        assert.deepEqual(
            evalScheem(['cons', ['quote', [1, 2]], ['quote', [7, 9]]], {}),
            [[1, 2], 7, 9]
        );
    });
    test('car', function() {
        assert.deepEqual(
            evalScheem(['car', ['quote', [3, 5, 7]]], {}),
            3
        );
        assert.deepEqual(
            evalScheem(['car', ['quote', [[1, 2], 7, 9]]], {}),
            [1, 2]
        );
    });
    test('cdr', function() {
        assert.deepEqual(
            evalScheem(['cdr', ['quote', [3, 5, 7]]], {}),
            [5, 7]
        );
        assert.deepEqual(
            evalScheem(['cdr', ['quote', [[1, 2], 7, 9]]], {}),
            [7, 9]
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['cons'], {});
        });
        assert.throws(function () {
            evalScheem(['cons', 1], {});
        });
        assert.throws(function () {
            evalScheem(['cons', 0, [1], [2]], {});
        });
        assert.throws(function () {
            evalScheem(['car'], {});
        });
        assert.throws(function () {
            evalScheem(['car', [1], [2]], {});
        });
        assert.throws(function () {
            evalScheem(['cdr'], {});
        });
        assert.throws(function () {
            evalScheem(['cdr', [1], [2]], {});
        });
    });
    test('wrong argument type exception', function() {
        assert.throws(function () {
            evalScheem(['cons', 1, 2], {});
        });
        assert.throws(function () {
            evalScheem(['car', 1], {});
        });
        assert.throws(function () {
            evalScheem(['cdr', 1], {});
        });
    });
});

suite('structures', function() {
    test('begin', function() {
        assert.deepEqual(
            evalScheem(['begin', 1, 2, ['quote', [5, 7]]], {}),
            [5, 7]
        );
	var env = {};
        assert.deepEqual(
            evalScheem(['begin', ['define', 'a', 1], ['define', 'b', 2], ['define', 'c', 3]], env),
            0
        );
        assert.deepEqual(
            env,
            {a: 1, b: 2, c: 3}
        );
    });
    test('if', function() {
        assert.deepEqual(
            evalScheem(['if', ['quote', '#t'], 1, ['quote', [3, 5, 7]]], {}),
            1
        );
        assert.deepEqual(
            evalScheem(['if', ['quote', '#f'], 1, ['quote', [3, 5, 7]]], {}),
            [3, 5, 7]
        );
        var env = {};
        assert.deepEqual(
            evalScheem(['if', ['quote', '#f'], ['define', 'a', 1], ['define', 'b', 2]], env),
            0
        );
        assert.deepEqual(
            env,
            {b: 2}
        );
    });
    test('wrong argument count exception', function() {
        assert.throws(function () {
            evalScheem(['begin'], {});
        });
        assert.throws(function () {
            evalScheem(['if'], {});
        });
        assert.throws(function () {
            evalScheem(['if', '#t'], {});
        });
        assert.throws(function () {
            evalScheem(['if', '#f', 1, 2, 3], {});
        });
    });
    test('wrong argument type exception', function() {
        assert.throws(function () {
            evalScheem(['if', 1, 0], {});
        });
        assert.throws(function () {
            evalScheem(['if', 'hi', 0], {});
        });
        assert.throws(function () {
            evalScheem(['if', [], 0], {});
        });
    });
});

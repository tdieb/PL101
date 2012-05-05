if (typeof module !== 'undefined') {
    // In Node load required modules
    var PEG = require('pegjs');
    var fs = require('fs');
    var evalScheem = require('../scheem').evalScheem;
    var parse = PEG.buildParser(fs.readFileSync(
        'scheem.peg', 'utf-8')).parse;
} else {
    // In browser assume loaded by <script>
    var parse = SCHEEM.parse;
}

var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    if (typeof expr === 'string') {
        return env[ expr ];
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            if(expr.length != 3) throw "wrong argument count!";
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case '-':
            if(expr.length != 3) throw "wrong argument count!";
            return evalScheem(expr[1], env) -
                   evalScheem(expr[2], env);
        case '*':
            if(expr.length != 3) throw "wrong argument count!";
            return evalScheem(expr[1], env) *
                   evalScheem(expr[2], env);
        case '/':
            if(expr.length != 3) throw "wrong argument count!";
            return evalScheem(expr[1], env) /
                   evalScheem(expr[2], env);
        case 'define':
            if(expr.length != 3) throw "wrong argument count!";
            env[ expr[1] ] = evalScheem(expr[2], env);
            return 0;
        case 'set!':
            if(expr.length != 3) throw "wrong argument count!";
            env[ expr[1] ] = evalScheem(expr[2], env);
            return 0;
        case 'quote':
            if(expr.length != 2) throw "wrong argument count!";
            return expr[1];
        case '=':
            if(expr.length != 3) throw "wrong argument count!";
            return ( evalScheem(expr[1], env) ===
                   evalScheem(expr[2], env) ) ? '#t' : '#f';
        case '<':
            if(expr.length != 3) throw "wrong argument count!";
            return ( evalScheem(expr[1], env) <
                   evalScheem(expr[2], env) ) ? '#t' : '#f';
        case '<=':
            if(expr.length != 3) throw "wrong argument count!";
            return ( evalScheem(expr[1], env) <=
                   evalScheem(expr[2], env) ) ? '#t' : '#f';
        case '>':
            if(expr.length != 3) throw "wrong argument count!";
            return ( evalScheem(expr[1], env) >
                   evalScheem(expr[2], env) ) ? '#t' : '#f';
        case '>=':
            if(expr.length != 3) throw "wrong argument count!";
            return ( evalScheem(expr[1], env) >=
                   evalScheem(expr[2], env) ) ? '#t' : '#f';
        case 'cons':
            if(expr.length != 3) throw "wrong argument count!";
            if(typeof expr[2] !== 'object' || typeof expr[2].length === 'undefined') throw "wrong argument type!";
            return [evalScheem(expr[1],env)].concat(evalScheem(expr[2],env));
        case 'car':
            if(expr.length != 2) throw "wrong argument count!";
            if(typeof expr[1] !== 'object' || typeof expr[1].length === 'undefined') throw "wrong argument type!";
            return evalScheem(expr[1],env)[0];
        case 'cdr':
            if(expr.length != 2) throw "wrong argument count!";
            if(typeof expr[1] !== 'object' || typeof expr[1].length === 'undefined') throw "wrong argument type!";
            return evalScheem(expr[1],env).slice(1);
        case 'if':
            if(expr.length != 3 && expr.length != 4) throw "wrong argument count!";
            var tf = evalScheem(expr[1],env);
            if( tf !== '#t' && tf !== '#f' ) throw "wrong argument type!";
            if( tf === '#t' ) return evalScheem(expr[2],env);
            if( expr.length == 4 ) return evalScheem(expr[3],env);
            return 0;
        case 'begin':
            if(expr.length == 1) throw "wrong argument count!";
            var result;
            for(var i = 1; i < expr.length; ++i )
                result = evalScheem( expr[i], env );
            return result;
    }
};

var evalScheemString = function (s, env) {
    return evalScheem( parse( s ), env );
};

// If we are used as Node module, export evalScheem
if (typeof module !== 'undefined') {
    module.exports.evalScheem = evalScheem;
    module.exports.evalScheemString = evalScheemString;
}

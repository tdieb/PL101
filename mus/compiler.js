var MIDI = function( pitch ) {
	return 12 + 12 * pitch[ 1 ] + "c d ef g a b".indexOf( pitch[ 0 ] );
};

var compileHelper = function( note, start, musexpr ) {
	if( musexpr.tag == 'note' ) {
		note.push( {
			tag: 'note',
			pitch: MIDI( musexpr.pitch ),
			start: start,
			dur: musexpr.dur
		} );
		return start + musexpr.dur;
	}

	if( musexpr.tag == 'rest' )
		return start + musexpr.dur;

	if( musexpr.tag == 'seq' )
		return compileHelper(
			note,
			compileHelper(
				note,
				start,
				musexpr.left
			),
			musexpr.right
		);

	if( musexpr.tag == 'par' )
		return Math.max(
			compileHelper( note, start, musexpr.left ),
			compileHelper( note, start, musexpr.right )
		);

	if( musexpr.tag == 'repeat' ) {
		for( var i = 0; i < musexpr.count; ++i )
			start = compileHelper( note, start, musexpr.section );
		return start;
	}
};

var compile = function(musexpr) {
	note = [];
	compileHelper( note, 0, musexpr );
	return note;
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));

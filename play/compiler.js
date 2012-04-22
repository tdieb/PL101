// This compiler translates a QBasic-PLAY-String to the note language
// (see documentation of QBasic PLAY: http://en.wikibooks.org/wiki/QBasic/Appendix#PLAY )

var compile = function( play ) {
	var i = 0;
	var note = [];
	var time = 0;
	var tempo = 120;
	var octave = 3;
	var length = 4;
	var mtype = 0.875;
	while( i < play.length ) {
		while( i < play.length && " \n\r\t".indexOf( play.charAt( i ) ) != -1 ) {
			++i;
		}
		var c = play.charAt( i ).toLowerCase();
		switch( c )
		{
		case "c":
		case "d":
		case "e":
		case "f":
		case "g":
		case "a":
		case "b":
			var noteIdx = "c d ef g a h".indexOf( play.charAt( i ) );
			++i;

			c = play.charAt( i );
			if( c == '+' || c == '#' ) {
				++noteIdx;
				if( noteIdx == 12 ) {
					noteIdx = 0;
				}
				++i;
			} else if( c == '-' ) {
				--noteIdx;
				if( noteIdx == -1 ) {
					noteIdx = 11;
				}
				++i;
			}

			c = play.charAt( i );
			var curLength = length;
			if( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
				curLength = 0;
				while( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
					curLength = curLength * 10 + "0123456789".indexOf( c );
					++i;
					c = play.charAt( i );
				}
			}

			var dur = 240000 / ( tempo * curLength );

			if( c == '.' ) {
				dur *= 1.5;
				++i;
			}

			note.push( {
				tag:'note',
				pitch: 12 + 12 * octave + noteIdx,
				start: Math.floor( time ),
				dur: Math.floor( dur * mtype ) } );

			time += dur;

			break;

		case "l":
			++i;

			c = play.charAt( i );
			length = 0;
			while( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
				length = length * 10 + "0123456789".indexOf( c );
				++i;
				c = play.charAt( i );
			}

			break;

		case "o":
			++i;

			octave = "0123456".indexOf( play.charAt( i ) );
			++i;

			break;

		case "<":
			--octave;

			++i;

			break;

		case ">":
			++octave;

			++i;

			break;

		case "n":
			++i;

			c = play.charAt( i );
			noteIdx = 0;
			while( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
				noteIdx = noteIdx * 10 + "0123456789".indexOf( c );
				++i;
				c = play.charAt( i );
			}

			noteIdx += 23;

			var dur = 240000 / ( tempo * length );

			if( c == '.' ) {
				dur *= 1.5;
				++i;
			}

			if( noteIdx > 23 ) {
				note.push( { tag:'note', pitch: noteIdx, start: Math.floor( time ), dur: Math.floor( dur * mtype ) } );
			}

			time += dur;

			break;

		case "m":
			++i;

			c = play.charAt( i ).toLowerCase();
			if( c == "n" ) {
				mtype = 0.875;
				++i;
			} else if( c == "l" ) {
				mtype = 1.0;
				++i;
			} else if( c == "s" ) {
				mtype = 0.75;
				++i;
			} else if( c == "b" || c == "f" ) {
				++i;
			}

			break;

		case "p":
			++i;

			c = play.charAt( i );
			var curLength = length;
			if( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
				curLength = 0;
				while( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
					curLength = curLength * 10 + "0123456789".indexOf( c );
					++i;
					c = play.charAt( i );
				}
			}

			var dur = 240000 / ( tempo * curLength );

			if( c == '.' ) {
				dur *= 1.5;
				++i;
			}

			time += dur;

			break;

		case "t":
			++i;

			c = play.charAt( i );
			tempo = 0;
			while( c.length > 0 && "0123456789".indexOf( c ) != -1 ) {
				tempo = tempo * 10 + "0123456789".indexOf( c );
				++i;
				c = play.charAt( i );
			}

			break;
		}
	}

	return note;
};

// Test songs taken from http://www.madhousebeyond.com/?mode=docview&view=qbasic

// The Lion Sleeps Tonight
console.log( compile(
	"MFT120L16CP8DP16EP8DP8EFP8EP16DP8CP8DEP8DP16CP8P16EP16L4D" ) );

// Ecuador
console.log( compile(
	"MFT150L16AP8EP8>C<P16BP16>D<P16BP16GP16AP8EP8>C<P16BP16\
	 >D<P16BP16GP16>CP8<GP8>EP16DP16EP16DP16<GP16>CP8<AP8>\
	CP16<BP16>CP16<BP16G" ) );

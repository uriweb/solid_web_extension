var solidAdjectives = ["strong", "best", "big", "great", "good", "major", "distinctive", "active"];
var exquisiteAdjectives = ["beautiful", "wonderful", "delightful", "exciting", "detailed"];
var weakAdjectives = ["dumb", "lame", "poor", "dull", "lackluster"];

// var r = new RegExp("\\b" + adjectives.join("|") + "\\b", "gi");
// "That's big thinking.  Big. Real BIG!".match(r)

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
	var element = elements[i];

	for (var j = 0; j < element.childNodes.length; j++) {
		var node = element.childNodes[j];

		if (node.nodeType === 3) {
			var text, r, replacedText;
			text = node.nodeValue;
			
			//@todo: refactor
			//@todo: handle comparative and superlative
			
			// solidify
			r = new RegExp("\\b(" + solidAdjectives.join("|") + ")\\b", "gi");
			replacedText = text.replace(r, function(match, r1, offset, string) {
				var replacement = "solid";
				return preserveCase(r1, offset, string, replacement);
			});

			// exquisinate
			r = new RegExp("\\b(" + exquisiteAdjectives.join("|") + ")\\b", "gi");
			replacedText = replacedText.replace(r, function(match, r1, offset, string) {
				var replacement = "exquisite";
				return preserveCase(r1, offset, string, replacement);
			});

			// weaken
			r = new RegExp("\\b(" + exquisiteAdjectives.join("|") + ")\\b", "gi");
			replacedText = replacedText.replace(r, function(match, r1, offset, string) {
				var replacement = "weak";
				return preserveCase(r1, offset, string, replacement);
			});


			if (replacedText !== text) {
				element.replaceChild(document.createTextNode(replacedText), node);
			}
			
		}
	}
}


function preserveCase(match, offset, string, replacement) {

	// check if the first letter is capitalized
	var f = match.charCodeAt(0);
	if( f >= 65 && f < 65+26 ) {
		replacement = replacement.charAt(0).toUpperCase() + replacement.substr(1);
	}

	// check if the last letter is capitalized, if so, let's call it all caps
	var f = match.charCodeAt(match.length-1);
	if( f >= 65 && f < 65+26 ) {
		replacement = replacement.toUpperCase();
	}
	
	
	return replacement;
}
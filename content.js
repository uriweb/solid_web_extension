/**
 * set us up some words to updgrade
 */
var solidAdjectives = ["strong", "best", "big", "great", "good", "major", "distinctive", "active"];
var exquisiteAdjectives = ["beautiful", "wonderful", "delightful", "exciting", "detailed"];
var weakAdjectives = ["small", "tiny", "dumb", "lame", "poor", "dull", "lackluster"];


/**
 * Do the replacements
 * @todo: refactor into more sensible chunks
 * @todo: handle comparative and superlative cases
 *
 */
function replaceWords(text) {
	
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
}

/**
 * Check the case of the matched word and try to match it with the replacement
 * Right now, it basically checks if the word starts with a cap, if so,
 * it capitalizes the replacement.
 * after that, if the last letter is a capital, it returns the replacement in all caps
 * only works for ASCII caps.
 */
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






/** 
 * go through the DOM tree, identify text to replace
 */
var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
	var element = elements[i];

	for (var j = 0; j < element.childNodes.length; j++) {
		var node = element.childNodes[j];

		if (node.nodeType === 3) {
			var text, r, replacedText;
			
			// do replacements
			text = replaceWords(node.nodeValue);

			if (replacedText !== text) {
				element.replaceChild(document.createTextNode(replacedText), node);
			}
			
		}
	}
}

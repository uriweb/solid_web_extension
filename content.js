/**
 * set us up some words to updgrade
 */
var solidAdjectives = ["strong", "best", "big", "great", "good", "major", "distinctive", "active"];
var exquisiteAdjectives = ["beautiful", "wonderful", "delightful", "exciting", "detailed"];
var weakAdjectives = ["small", "tiny", "dumb", "lame", "poor", "dull", "lackluster"];

// @todo: automate plurals
var locations = ["location", "world", "locus", "planet", "country", "area", "region", "zip code", "site", "field"];
var locationsPlural = ["locations", "worlds", "loci", "planets", "countries", "areas", "regions", "zip codes", "sites", "fields"];
var presentation = ["appearance", "coteur", "dress", "attire"];
var vista = ["vista", "landscape", "scenery"];

var technicals = ["iphone", "ipad", "telephone", "laptop", "computer"];

var chips = ["snacks", "lunch", "breakfast", "dinner"];

var hardMother = ["person", "man", "woman"];
var hardMothers = ["people", "men", "women"];

var phony = ["false", "fake", "terrible", "bad", "liar", "disingenuous"];
var situation = ["status", "condition"];


// @todo: replace ! with ", Jerry!"

/**
 * Do the replacements
 * @todo: refactor into more sensible chunks
 * @todo: handle comparative and superlative cases
 *
 */
function replaceWords(text) {
	
	// sitchitize
	r = new RegExp("\\b(" + situation.join("|") + ")\\b", "gi");
	replacedText = text.replace(r, function(match, r1, offset, string) {
		var replacement = "situation";
		return preserveCase(r1, offset, string, replacement);
	});

	// phonifate
	r = new RegExp("\\b(" + phony.join("|") + ")\\b", "gi");
	replacedText = text.replace(r, function(match, r1, offset, string) {
		var replacement = "phony";
		return preserveCase(r1, offset, string, replacement);
	});

	// phonifate
	r = new RegExp("\\b(" + phony.join("|") + ")\\b", "gi");
	replacedText = text.replace(r, function(match, r1, offset, string) {
		var replacement = "phony";
		return preserveCase(r1, offset, string, replacement);
	});

	// chippelize
	r = new RegExp("\\b(" + chips.join("|") + ")\\b", "gi");
	replacedText = text.replace(r, function(match, r1, offset, string) {
		var replacement = "chips";
		return preserveCase(r1, offset, string, replacement);
	});

	// technify
	r = new RegExp("\\b(" + technicals.join("|") + ")\\b", "gi");
	replacedText = text.replace(r, function(match, r1, offset, string) {
		var replacement = "technicals";
		return preserveCase(r1, offset, string, replacement);
	});

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

	// sectorize
	r = new RegExp("\\b(" + locations.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "sector";
		return preserveCase(r1, offset, string, replacement);
	});
	r = new RegExp("\\b(" + locationsPlural.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "sectors";
		return preserveCase(r1, offset, string, replacement);
	});

	// harden
	r = new RegExp("\\b(" + hardMother.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "hard mother";
		return preserveCase(r1, offset, string, replacement);
	});
	r = new RegExp("\\b(" + hardMothers.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "hard mothers";
		return preserveCase(r1, offset, string, replacement);
	});

	// presentation
	r = new RegExp("\\b(" + presentation.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "presentation";
		return preserveCase(r1, offset, string, replacement);
	});

	// viewshed
	r = new RegExp("\\b(" + vista.join("|") + ")\\b", "gi");
	replacedText = replacedText.replace(r, function(match, r1, offset, string) {
		var replacement = "viewshed";
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

		if (node.nodeType === 3 && node.nodeValue.length > 1) {
		
			if(node.parentNode.nodeName == "SCRIPT" || node.parentNode.nodeName == "STYLE" || node.parentNode.nodeName == "TEXTAREA" || node.parentNode.nodeName == "INPUT") {
				continue;
			}
			var text, r, replacedText;
			
			// do replacements
			text = replaceWords(node.nodeValue);
// 			if(text != node.nodeValue) {
// 				console.log(node.nodeValue);
// 				console.log(node.nodeName);
// 			}

			if (replacedText !== text) {
				element.replaceChild(document.createTextNode(replacedText), node);
			}
			
		}
	}
}

/**
 * set us up some words to updgrade
 */
var theReplacements = [];
theReplacements.push({
	"find": ["citizen"],
	"replace": ["animal"]	
});
theReplacements.push({
	"find": ["citizens"],
	"replace": ["animals"]	
});
theReplacements.push({
	"find": ["the strongest", "the best", "the biggest", "the greatest"],
	"replace": ["the most solid"]
});
theReplacements.push({
	"find": ["strong", "best", "big", "great", "good", "major", "distinctive", "active"],
	"replace": ["solid"]	
});
theReplacements.push({
	"find": ["beautiful", "wonderful", "delightful", "exciting", "detailed", "charming"],
	"replace": ["exquisite"]	
});
theReplacements.push({
	"find": ["small", "tiny", "dumb", "lame", "poor", "dull", "lackluster"],
	"replace": ["weak"]
});
theReplacements.push({
	"find": ["location", "world", "locus", "planet", "country", "area", "region", "zip code", "site", "field"],
	"replace": ["sector"]	
});
theReplacements.push({
	"find": ["locations", "worlds", "loci", "planets", "countries", "areas", "regions", "zip codes", "sites", "fields"],
	"replace": ["sectors"]	
});
theReplacements.push({
	"find": ["appearance", "coteur", "dress", "attire"],
	"replace": ["presentation"]	
});
theReplacements.push({
	"find": ["vista", "landscape", "scenery", "countryside"],
	"replace": ["view shed"]	
});
theReplacements.push({
	"find": ["iphone", "ipad", "telephone", "laptop", "computer", "phone"],
	"replace": ["technical"]	
});
theReplacements.push({
	"find": ["iphones", "ipads", "telephones", "laptops", "computers", "phones"],
	"replace": ["technicals"]	
});
theReplacements.push({
	"find": ["snacks", "lunch", "breakfast", "dinner"],
	"replace": ["chips"]	
});
theReplacements.push({
	"find": ["person", "man", "woman"],
	"replace": ["hard mother", "citizen"]	
});
theReplacements.push({
	"find": ["people", "men", "women"],
	"replace": ["hard mothers", "citizens"]
});
theReplacements.push({
	"find": ["student", "user", "visitor"],
	"replace": ["citizen"]	
});
theReplacements.push({
	"find": ["students", "users", "visitors"],
	"replace": ["citizens"]
});
theReplacements.push({
	"find": ["home", "be home to", "house", "homestead"],
	"replace": ["shelter"]
});
theReplacements.push({
	"find": ["homeless"],
	"replace": ["unsheltered"]
});
theReplacements.push({
	"find": ["false", "fake", "terrible", "bad", "liar", "disingenuous"],
	"replace": ["phony"]	
});
theReplacements.push({
	"find": ["status", "condition"],
	"replace": ["situation"]	
});
theReplacements.push({
	"find": ["bottle", "water bottle", "travel mug", "beaker", "chalice", "goblet", "tumbler"],
	"replace": ["hydration vessel"]	
});
theReplacements.push({
	"find": ["bottles", "water bottles", "travel mugs", "beakers", "chalices", "goblets", "tumblers"],
	"replace": ["hydration vessels"]	
});

theReplacements.push({
	"find": ["university of rhode island"],
	"replace": ["Big School"]	
});

theReplacements.push({
	"find": ["makerspace", "maker space"],
	"replace": ["work shop"]	
});
theReplacements.push({
	"find": ["greetings"],
	"replace": ["pleasantries"]	
});

theReplacements.push({
	"find": ["grueling", "difficult"],
	"replace": ["brutal"]	
});
theReplacements.push({
	"find": ["vicious", "hard-working", "enthusiastic"],
	"replace": ["savage"]	
});
theReplacements.push({
	"find": ["fried chicken"],
	"replace": ["bastard chicken"]	
});
theReplacements.push({
	"find": ["professional", "excellent"],
	"replace": ["almost professional"]	
});
theReplacements.push({
	"find": ["stair", "stairs", "ladder", "stepladder", "elevator", "escalator", "gurney", "hydraulic lift", "Genie lift", "strongman" ],
	"replace": ["manlifter"]	
});
theReplacements.push({
	"find": ["ladders", "stepladders", "elevators", "escalators", "gurneys", "hydraulic lifts", "Genie lifts", "strongmen" ],
	"replace": ["manlifters"]	
});
theReplacements.push({
	"find": ["images"],
	"replace": ["imagery"]	
});

theReplacements.push({
	"find": ["remote", "far away"],
	"replace": ["off-property"]	
});
theReplacements.push({
	"find": ["on campus"],
	"replace": ["on property"]	
});
theReplacements.push({
	"find": ["nearby"],
	"replace": ["close proximity"]	
});


// passion
// salutation
// clown


function Jerrify(text) {
	var r = /!$/g;
	return text.replace( r, ", Jerry!" );	
}
/**
 * Do the replacements
 * @todo: refactor into more sensible chunks
 * @todo: handle comparative and superlative cases
 * @todo: automate plurals
 *
 */
function replaceWords(text) {

	var r; 
	replacedText = text;
	
	for(var i=0; i<theReplacements.length; i++) {
		r = new RegExp("\\b(" + theReplacements[i].find.join("|") + ")\\b", "gi");
		replacedText = replacedText.replace(r, function(match, r1, offset, string) {
			return preserveCase(r1, offset, string, getRandomReplacement( theReplacements[i].replace ) );
		});
	}
	
}

/**
 * Return a random word from the list of associated replacements
 */
function getRandomReplacement( words ) {

	var n = Math.floor(Math.random() * words.length);
	return words[n];
	
}

/**
 * Check the case of the matched word and try to match it with the replacement
 * Right now, it basically checks if the word starts with a cap, if so,
 * it capitalizes the replacement.
 * after that, if the last letter is a capital, it returns the replacement in all caps
 * only works for ASCII caps.
 */
function preserveCase(match, offset, string, replacement) {

	if ( typeof match === 'string') {
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
			text = replaceWords( Jerrify(node.nodeValue) );
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

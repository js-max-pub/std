export * from './levenshtein.js'

export function latin(string, replacement = ' ') {
	return string?.replace(/[^a-z]/gi, replacement)
}
export function letter(string, replacement = ' ') {
	return string?.replace(/[^\p{Letter}]/giu, replacement)
}
export function letters(string) {
	return groups(string, /(\p{Letter}+)/giu).flat()
}
export function alphaNum(string, replacement = ' ') {
	return string?.replace(/[^\p{Letter}\p{Number}]/giu, replacement)
}
export function printable(string, replacement = '') {
	return string?.replace(/[^ -~]+/g, replacement)
}

/**
 * try one encoding after the other
 * esp. useful for files of unknown encoding
 * @param {*} bytes 
 * @param {*} encodings 
 * @returns 
 */
export function decode(bytes, encodings = ['utf-8', 'latin-1', 'utf-16le']) {
	for (let encoding of encodings)
		try {
			return new TextDecoder(encoding, { fatal: true }).decode(bytes)
		} catch { }
}

/**
 * converts a string to titleCase
 * all letters following a space are converted to uppercase
 * e.g. The Grey Fox Runs Around The House
 * naming in accordance to "toUpperCase" "toLowerCase"
 * @param string 
 */
export function titleCase(string) { // 
	return string
		?.split(' ')
		?.filter(x => x)
		?.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
		?.join(' ')
}


export function camelCase(string) {
	// console.log('camel1',string,string.replace(/[^a-zäöüß1-9]/gi, ' '))
	string = titleCase(alphaNum(string))?.replace(/\s/g, '')
	// console.log('camel1',string)
	// string[0] = string[0].toLowerCase();
	return string?.[0]?.toLowerCase() + string?.slice(1);
}
export function snakeCase(string) {
	return alphaNum(string)?.toLowerCase()?.trim()?.replace(/\s+/g, '_')
}
export function trim(string = '', characters = ' ') {
	let c = '\\' + characters.split('').join('\\')
	// console.log(string)
	return (string + '').replace(new RegExp(`^[${c}]+|[${c}]+$`, 'g'), '');

	// for (let char of characters.split(''))
	// 	string = string.replace(new RegExp(`^\\${char}+|\\${char}+$`, 'g'), '');
	// string = string.replace(/^\|+|\|+$/g, '');
	// return string
}
export function groups(string, regex) {
	// console.log('find',string,regex)
	return Array.from(string.matchAll(regex))
		.map(i => i.slice(1)) // only groups, not full match
	// .flat();
}

export function removeTags(string) {
	return string?.replace(/<.*?>/g, '')
}

export function blocks(string = "") {
	return string?.split('\r\n\r\n')?.flatMap(x => x.split('\r\r'))?.flatMap(x => x.split('\n\n')) ?? []
}

export function lines(string = "") {
	return string?.split('\r\n')?.flatMap(x => x.split('\r'))?.flatMap(x => x.split('\n')) ?? []
}

// https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
// export function tsv(string = "") {
// 	return lines(string).map(x => x.split('\t'))
// }


// export default {
// 	toTitleCase, toCamelCase, findGroups, removeTags, blocks, lines, tsv
// }



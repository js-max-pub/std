

// export { extend } from '../object/2021/mod.js'

export function removeIndex(array, index) {
	console.log('array', array)
	if (index < 0 || index > array.length) return array;
	return [...array.slice(0, index), ...array.slice(index + 1)] // splice alters the source!
}
export function removeValue(array, value) {
	return removeIndex(array, array.indexOf(value))
}

/**
 * 
 * @param {array of primitives or objects} array 
 * @param {string} property - (optional) property that shall be unique, e.g. 'id'
 * @returns array with unique items
 */
export function unique(array, property) {
	if (property)
		return Object.values(Object.fromEntries(array.map(x => [x[property], x])))
	else
		return [...new Set(array)]
}

/**
 * remove null, undefined, NaN
 * keeps '' and 0 and false
 * @param array 
 * @returns 
 */
export function clean(array) {
	return array.filter(x => ![NaN, undefined, null].includes(x));
}



// export function first(array) {
// 	return array?.[0]
// }

// array.at(-1)
// export function last(array) {
// 	return array?.slice(-1)?.[0]
// }


// import { copy } from 'https://js.max.pub/object/src.js'
/**
 * randomly reorder the input array
 * @param {*} array 
 * @returns reordered array
 */
export function shuffle(array) {
	// let a = copy(array)
	let a = JSON.parse(JSON.stringify(array)); // deep copy
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}


export function cluster(lists) {
	// log.timer()
	let t0 = Date.now()
	let inLen = lists.length
	let out = []
	// console.log('merge2',lists)
	while (lists.length > 0) {
		let [first, ...rest] = lists
		// console.log('first',first,'rest',rest)
		first = new Set(first)

		let lf = -1
		while (first.size > lf) {
			lf = first.size
			// console.log('lf',lf)
			let rest2 = []
			for (let r of rest) {
				// r = new Set(r)
				// console.log('first', first, 'r', r, 'inter',intersection([...first], r))
				if (intersection([...first], r).length > 0)
					first = new Set([...first, ...r])
				else
					rest2 = [...rest2, r]
			}
			rest = rest2
		}
		out.push([...first])
		lists = rest
	}
	// console.log('merge',out)
	// log.debug(inLen, '->', out.length, t0)
	return out
	// return [list(sorted(x)) for x in out]
}




/**
 * create a new array from various inputs
 * more powerful than Array.from()
 * @param a 
 */
export function array(a) {
	if (!a) return []; // null, undefined, NaN return empty array
	if (a?.[Symbol.asyncIterator]) {
		return new Promise(async (resolve, reject) => {
			let output = []
			for await (let v of a)
				output.push(v)
			resolve(output)
		})
	}
	if (Array.isArray(a)) return a;
	if (a * 1 == a) return Array(a)

	return Array.from(a);
}


export function union(array, other) {
	return [...array, ...other]
}

export function intersection(...arrays) {
	if (arrays.length == 0) return []
	let sets = arrays.filter(x => x).map(x => new Set(x))
	let output = sets[0];
	for (let item of output) {
		for (let s of sets?.slice(1))
			if (!s.has(item))
				output.delete(item)
	}
	return [...output]
}
export function intersection2(...arrays) {
	// if (arrays.length < 2) return [];
	let output = arrays[0] ?? [];
	for (let a of arrays?.slice(1) ?? [])
		output = output.filter(value => a.includes(value))
	return unique(output);
}

export function difference(a, b) {
	a = new Set(a);
	b = new Set(b);
	let difference = new Set(
		[...a].filter(x => !b.has(x)));
	return [...difference]
}


// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
export function cartesian(...a) {
	a = a.filter(x => x.length)
	// console.log(a)
	if (a.length <= 1) return (a[0] ?? []).map(x => [x])
	return a.filter(x => x.length).reduce((acc, val) => acc.flatMap(d => val.map(e => [d, e].flat())));
}

// export function sortBy(array, property) {
// 	return array.sort((a, b) => {
// 		if (a[property] > b[property]) return 1
// 		if (a[property] < b[property]) return -1
// 		return 0
// 	})
// }
// export function compare(a, b) {
// 	if (a > b) return 1
// 	if (a < b) return -1
// 	return 0
// }
export const compare = (a, b) => a > b ? 1 : (a < b ? -1 : 0)
export const sortBy = (a, prop) => a.sort((a, b) => compare(prop(a), prop(b)))

// export function sortBy(array, property) {
// 	return array.sort((a, b) => compare(property(a), property(b)))
// }
// export function sortBy(property) {
// 	return function pathSort(a, b) {
// 		if (a[property] > b[property]) return 1
// 		if (a[property] < b[property]) return -1
// 		return 0
// 	}
// }

// export default {
// 	remove, unique, clean, first, last, shuffle, array, intersection, union, cartesian
// }
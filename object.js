export function copy(o) {
	return JSON.parse(JSON.stringify(o))
}


// export function extend(object, functions = [], getter = [], setter = []) {
// object.extend(Array, [array.removeValue, array.sortBy, array.unique], [array.first, array.last])
export function extend(object, ...p) {
	// p == functions, getter, setter
	let n = ['value', 'get', 'set']
	for (let i in p)
		for (let f of p[i] ?? [])
			Object.defineProperty(object.prototype, f.name, { [n[i]]: function (...p) { return f(this, ...p) } })
}

export function select(object, ...keys) {
	return Object.fromEntries(
		Object.entries(object)
			.filter(([key]) => keys.includes(key))
	)
}
export function keep(object, ...keys) {
	return Object.fromEntries(
		Object.entries(object)
			.filter(([key]) => keys.includes(key))
	)
} export function kill(object, ...keys) {
	return Object.fromEntries(
		Object.entries(object)
			.filter(([key]) => !keys.includes(key))
	)
}
export function length(object) {
	return Object.keys(object).length
}

export function size(x) {
	switch (typeof x) {
		case 'number': return 8
		case 'boolean': return 4
		case 'string': return x.length * 2
		case 'object':
			if (Array.isArray(x)) return x.reduce((acc, val) => acc + size(val), 0)
			else return size(Object.keys(x)) + size(Object.values(x))
	}
	return 0
}

export const filter = (o, f) => Object.fromEntries(Object.entries(o).filter(([k, v]) => f(k, v)))

export const map = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => f(k, v)))
export const mapKeys = (o, f) => map(o, (k, v) => [f(k), v])
export const mapValues = (o, f) => map(o, (k, v) => [k, f(v)])
// export const mapKeys = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => [f(k), v]))
// export const mapValues = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)]))


// export function compare(a, b) {
// 	if (a > b) return 1
// 	if (a < b) return -1
// 	return 0
// }
export const compare = (a, b) => a > b ? 1 : (a < b ? -1 : 0)


export const sortByKey = o => Object.fromEntries(Object.entries(o).sort((a, b) => compare(a[0], b[0])))
export const sortByValue = (o, prop) => Object.fromEntries(Object.entries(o).sort((a, b) => compare(prop(a[1], prop(b[1])))))

export const not = x => x === null || isNaN(x) // isNaN covers "invalid date" and "undefined", too    || x === undefined
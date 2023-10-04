export function intersection(a, b) {
	return new Set([...a].filter(x => b.has(x)));
}
export function difference(a, b) {
	b = new Set([...b])
	return new Set([...a].filter(x => !b.has(x)));
}
export function union(a, b) {
	return new Set([...a, ...b]);
}

// export function set(a) {
// 	return new Set(a)
// }

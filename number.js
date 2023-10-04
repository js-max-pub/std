export function pretty(number, decimals = 0, padding = 0) {
	let [a, b] = Number(number).toFixed(decimals).split('.')
	let x = String(a).split('').reverse().join('').match(/.{1,3}/g).join('_').split('').reverse().join('')
	return (x + (b ? '.' + b : '')).padStart(padding)
}
export function percent(a, b) {
	return `${a} / ${b} = ${(a / b * 100).toFixed(2)}%`
}

export const sum = x => x.reduce((a, b) => a + b, 0);
export const average = x => (sum(x) / x.length) || 0;
export const median = x => {
	let l2 = x.length/2
	return x.length % 2 == 0 ? ((x[l2-1] + x[l2])/2) : x[Math.floor(l2)]
}

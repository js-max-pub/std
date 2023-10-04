
export function date(string) { // pass date-object or string... no argument==now
	return new Date(Date.parse(string ?? new Date()))
}
export function copy(d) {
	// return date(d.toISOString())
	return date(isoDateTime(d))
}
export function p0(s) { return String(s).padStart(2, '0') }
export function Y(d) { return date(d).getFullYear() }
export function M(d) { return p0(date(d).getMonth() + 1) }
export function D(d) { return p0(date(d).getDate()) }
export function isoDate(date) { return Y(date) + '-' + M(date) + '-' + D(date) }

export function h(d) { return p0(date(d).getHours()) }
export function m(d) { return p0(date(d).getMinutes()) }
export function s(d) { return p0(date(d).getSeconds()) }
export function isoTime(date) { return h(date) + ':' + m(date) + ':' + s(date) }

// standard .toISOString() always converts to UTC
export function isoDateTime(date) { return isoDate(date) + 'T' + isoTime(date) }



export function format(d, format, locale = 'lookup') {
	// console.log('format',d)
	d = date(d)
	// console.log('-->',d)
	// if (!locale) locale = 'lookup';
	// console.log('format',date,format,locale)
	var str = c => d.toLocaleString(locale, c);
	var n = 'numeric';
	var _2 = '2-digit';
	var f = {
		DDDD: str({ weekday: 'long' }),
		DDD: str({ weekday: 'short' }),
		DD: str({ day: _2 }),
		'!D': str({ day: n }),
		MMMM: str({ month: 'long' }),
		MMM: str({ month: 'short' }),
		MM: str({ month: _2 }),
		'!M': str({ month: n }),
		YYYY: str({ year: n }),
		YY: str({ year: _2 }),
		hh: str({ hour: _2, hour12: false }),
		'!h': str({ hour: n, hour12: false }),
		mm: str({ minute: _2 }),
		'!m': str({ minute: n }),
		ss: str({ second: _2 }),
		'!s': str({ second: n }),
	};
	if (f.mm < 10) f.mm = '0' + f.mm;// for browser bug
	if (f.ss < 10) f.ss = '0' + f.ss;// for browser bug
	// console.log('all', f)
	for (var typ in f) {
		// console.log('format',typ,format)
		var format = format.replace(typ, f[typ]);
	}
	// console.log('-->',format)
	return format;
}


/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
export function weekNumber(d) {
	// Copy date so don't modify original
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// d = copy(d)
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	// Get first day of year
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
	// Return array of year and week number
	return { year: d.getUTCFullYear(), week: weekNo };
}

// var result = getWeekNumber(new Date());
// document.write('It\'s currently week ' + result[1] + ' of ' + result[0]);

// export default {
// 	from, copy, format, weekNumber
// }

export function humanDuration(d) { // &hairsp;
	if (Math.abs(d) > 86400) return Math.round(d / 86400) + ' d'
	if (Math.abs(d) > 3600) return Math.round(d / 3600) + ' h'
	if (Math.abs(d) > 60) return Math.round(d / 60) + ' m'
	return d + ' s'
}


export function parseGermanDate(s) {
	if (s?.length != 10) return null
	let parts = s?.split('.')
	if (parts.length != 3) return null
	// try {
	let [dd, mm, yy] = parts
	return `${yy}-${mm}-${dd}`
	// } catch { }
}

// function parseAmericanDate(s) {
// 	let d = new Date(Date.parse(s))
// 	if (isNaN(d.getDate())) return null
// 	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
// }
export function parseDate(s) {
	if (!s) return null
	return parseGermanDate(s) ?? isoDate(s)
}

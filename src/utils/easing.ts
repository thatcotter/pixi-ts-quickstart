export function lerp(a:number, b: number, pct: number): number {
	// pct  = Math.min(1, Math.max(0, pct))
	return a * (1 - pct) + b * pct;
}

export function easeIn(t: number): number {
    return t * t;
}

export function easeOut(t: number): number {
    return flip(easeIn(flip(t)))
}

function flip(x: number): number {
    return 1 - x;
}
export function generateRandomSeries(count: number): number[] {
    const rv: number[] = [];
    const seriesValues = generateSeries(count);

    for (let i = count - 1; i >= 0; i--) {
        const selected = Math.floor(Math.random() * i);
        
        const fromSeries = seriesValues.splice(selected, 1)[0];

        rv.push(fromSeries);
    }

    return rv;
}

function generateSeries(count: number): number[] {
    const rv: number[] = [];

    for (let i = 0; i < count; i++) {
        rv.push(i);    
    }

    return rv;
}

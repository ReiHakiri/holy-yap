export function floorDiv (a, b) {
    return Math.floor(a / b);
}

export function* allLists (domain, n) {
    if (n == 0) {
        yield []
    } else {
        for (const element of domain) {
            for (const l of allLists(domain, n - 1)) {
                l.push(element)

                yield l
            }
        }
    }
}

export function randRange (a, b) {
    return Math.floor((b - a) * Math.random()) + a
}

export function randShuffle (l) {
    const len = l.length;

    for (let i = 0; i < len - 1; i++) {
        const j = randRange(i, len);

        [l[i], l[j]] = [l[j], l[i]];
    }
}

export function copy (l) {
    const result = [];

    for (const element of l) {
        result.push(element);
    }

    return result;
}

export function range (n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(i);
    }

    return result;
}
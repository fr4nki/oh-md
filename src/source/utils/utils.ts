const createElement = (
    el: string,
    className: string[] = [''],
    args: object = {}
): HTMLElement => {
    const e = document.createElement(el);

    e.classList.add(...className);
    Object.keys(args).forEach(a => (e[a] = args[a]));

    return e;
};

const capitalize = (str: string): string =>
    str[0].toUpperCase() + str.slice(1, str.length);

const detectOs = (): string => {
    const platform: string = window.navigator.platform.toLowerCase();
    const osWin: string = 'win';
    const osMac: string = 'mac';

    if (platform.includes(osWin)) {
        return osWin;
    }

    if (platform.includes(osMac)) {
        return osMac;
    }

    return 'other';
};

const getNormalizedKey = (key: string): string => {
    const meta = {
        win: '⊞',
        mac: '⌘',
        other: 'Meta',
    };

    const keys = {
        metaKey: meta[detectOs()],
        altKey: 'Alt',
        ctrlKey: 'Ctrl',
    };

    return keys[key];
};

const debounce = (fn: () => {}, time: number) => {
    let timeout: number;

    return function<T>(...args: T[]) {
        const functionCall = () => fn.apply(this, ...args);

        window.clearTimeout(timeout);
        timeout = window.setTimeout(functionCall, time);
    };
};

export default {
    createElement,
    capitalize,
    debounce,
    detectOs,
    getNormalizedKey,
};
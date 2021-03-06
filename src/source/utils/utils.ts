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
    const osMac: string = 'mac';

    if (platform.includes(osMac)) {
        return osMac;
    }

    return 'default';
};

const getNormalizedKey = (key: string): string => {
    const meta = {
        mac: '⌘',
        default: 'Meta',
    };

    const keys = {
        metaKey: meta[detectOs()],
        altKey: 'Alt',
        ctrlKey: 'Ctrl',
        shiftKey: 'Shift',
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

const log = (string: string, type: string = 'warn', ...args) => {
    console[type](`[OH-MD]: ${string}\n${args}`);
};

export default {
    createElement,
    capitalize,
    debounce,
    detectOs,
    getNormalizedKey,
    log,
};

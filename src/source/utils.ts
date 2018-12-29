const createElement = (
    el: string,
    className: string[] = [''],
    args: object = {}
): HTMLElement => {
    const e = document.createElement(el);

    e.classList.add(...className);
    Object.keys(args).forEach((a) => (e[a] = args[a]));

    return e;
};

const capitalize = (str: string): string =>
    str[0].toUpperCase() + str.slice(1, str.length);

const log = (text: string, type: string, args: any[]): void => {
    const prefix = '# OH-MD: ';
    console[type](`${prefix}${text}`, ...args);
};

const detectOs = (): string => {
    const platform: string = window.navigator.platform.toLowerCase();
    const osWin: string = 'win';
    const osMac: string = 'mac';

    if (platform.includes(osWin)) {
        return osWin;
    } else if (platform.includes(osMac)) {
        return osMac;
    } else {
        return 'other';
    }
};

export default {
    createElement,
    capitalize,
    log,
    detectOs,
};
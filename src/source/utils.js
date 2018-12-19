const createElement = (el, className = [''], args = {}) => {
    const e = document.createElement(el);

    e.classList.add(...className);
    Object.keys(args).forEach(a => e[a] = args[a]);

    return e;
}

const capitalize = str => str[0].toUpperCase() + str.slice(1, str.length)

const log = (text, type, args) => {
    const prefix = '# OH-MD: ';
    console[type](`${prefix}${text}`, ...args);
}

export default { createElement, capitalize, log }
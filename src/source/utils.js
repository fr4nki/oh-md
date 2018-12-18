const createElement = (el, className = ['']) => {
    const e = document.createElement(el);
    e.classList.add(...className);

    return e;
}

const capitalize = str => str[0].toUpperCase() + str.slice(1, str.length)

export default { createElement, capitalize }
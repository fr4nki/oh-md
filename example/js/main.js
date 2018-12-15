import Editor from '../../src/source/index';

(function () {
    const els = document.querySelectorAll('textarea');
    els.forEach(e => new Editor(e, {
        params: {
            autosave: 5,
        },
        classes: {
            container: ['ololo'],
        }
    }).init());
}())
import Editor from '../../source/index';

(function () {
    const els = document.querySelectorAll('textarea');
    els.forEach(e => new Editor(e, {
        settings: {
            autosave: 5,
        },
        classes: {
            container: ['ololo'],
        }
    }).init());
}())
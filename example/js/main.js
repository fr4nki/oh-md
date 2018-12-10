import Editor from '../../source/index';

(function () {
    const els = document.querySelectorAll('textarea');
    els.forEach(e => new Editor(e, {
        settings: {
            autosave: false,
        },
        classes: {
            container: ['ololo'],
        }
    }).init());
}())
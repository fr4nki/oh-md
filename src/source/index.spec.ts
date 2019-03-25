import Editor from './index';

document.body.innerHTML = `
    <div class="fake">
        <textarea class="fake-text"></textarea>
    </div>
`;

test('editor is instance of Editor', () => {
    const e = new Editor(document.createElement('textarea'), {});

    expect(e).toBeInstanceOf(Editor);
});

test('editor should build only by passing textarea element', () => {
    const e = new Editor(null, {}).init();

    expect(e).toBeNull();
});

test('editor getter/setter api correctly works', () => {
    const element = <HTMLTextAreaElement>document.querySelector('.fake-text');
    const e = new Editor(element, {}).init();

    e.text = 'test here';
    expect(e.text).toBe('test here');
});

test('editor html getter api correctly works', () => {
    const element = <HTMLTextAreaElement>document.querySelector('.fake-text');
    const e = new Editor(element, {}).init();

    e.text = '**test here**';
    expect(e.html).toBe('<p><strong>test here</strong></p>\n');
});

test('check editor disabled method', () => {
    const element = <HTMLTextAreaElement>document.querySelector('.fake-text');
    const e = new Editor(element, {}).init();

    // e.disable = true;
})

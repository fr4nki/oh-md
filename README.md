# 🍩 OH-MD

_"Oh-md" - simplest md editor._


### Installation

You can use editor via npm or insert css and js from unpkg.com directly to your html.

**Using npm**
```
npm install --save oh-md
```

**Using unkpg.com**

Insert css file in your `<head>`:

```
<link rel="stylesheet" type="text/css" href="//unkpg.com"/>
```

Then, before closing `</body>` add js file:

```
<script type="text/javascript" src="//unpkg.com"></script>
```


### Initialization

In your html:
```
<body>
    ...
    <textarea id="textarea" name="myAwesomeTextArea></textarea>
    ...
</body>
```

In your js:
```
const element = document.getElementById('textarea');
const settings = {};
const editor = new Editor(element, settings);

editor.init();
```


### Settings
Settings - the object can be provided as the second argument into editor instance.

Settings object can contain _optional_ nested objects: `params`, `classes` and `controls`.

**`params`**:

- `counter: true` - Symbol counter.

- `autosave: 30` -  Autosave current <textarea> value to local storage if name or id attribute is provided. Sets in seconds.

- `wordwrap: { paramVisible: true, active: true }` -  Is word wrap button shown (paramVisible) and sets default status (active).

- `doubleReturn: { modificator: 'shiftKey', active: true }` - In case of active params is sets to true, click on Enter button inserts double end of line (\n\n). Pressing modificator and Enter button insert single end of line (\n).

**`classes`**:

Append the list of class names to the "logical block" of an editor.

```
container: ['someClassName'],
area: ['someClassName'],
controls: ['someClassName'],
params: ['someClassName'],
```

**`controls`**:

An array of controls should contain objects of type Control with the following structure:

```
{
    control: 'italic',
    hotkey?: {
        default: {
            modificator: 'ctrlKey',
            key: 'i',
        },
        mac: {
            modificator: 'metaKey',
            key: 'i',
        },
    },
}
```

List of possible controls: `bold`, `italic`, `strike`, `code`, `ordered_list`, `unordered_list`, `quote`, `heading`, `fullscreen`, `preview`, `image`, `link`.
`separator` control can be used as a controls button delimiter.
Each controls `modificator` can be `ctrlKey` or `altKey`, or `shiftKey` or `metaKey`.

<details>
<summary>Initialization example.</summary>
<p>
<pre>
const editor = new Editor(element, {
    params: {
        counter: false,
        autosave: 5,
        wordwrap: {
            paramVisible: false,
            active: true
        },
        doubleReturn: {
            modificator: 'shiftKey',
            active: true
        }
    },
    classes: {
        container: ['myAwesomeContainer'],
        area: ['myAwesomeArea'],
        controls: ['myAwesomeControls'],
        params: ['myAwesomeControls'],
    },
    controls: [
        {
            control: 'bold',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'b',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'b',
                },
            },
        },
        {
            control: 'italic',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'i',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'i',
                },
            },
        },
        {
            control: 'heading',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'h',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'h',
                },
            },
        },
        {
            control: 'strike',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'd',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'd',
                },
            },
        },
        {
            control: 'separator',
        },
        {
            control: 'ordered_list',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'o',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'o',
                },
            },
        },
        {
            control: 'unordered_list',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'u',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'u',
                },
            },
        },
        {
            control: 'separator',
        },
        {
            control: 'quote',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: '\'',
                },
                mac: {
                    modificator: 'metaKey',
                    key: '\'',
                },
            },
        },
        {
            control: 'code',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'k',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'k',
                },
            },
        },
        {
            control: 'link',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'l',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'l',
                },
            },
        },
        {
            control: 'image',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'g',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'g',
                },
            },
        },
        {
            control: 'separator',
        },
        {
            control: 'preview',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'm',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'm',
                },
            },
        },
        {
            control: 'fullscreen',
            hotkey: {
                default: {
                    modificator: 'ctrlKey',
                    key: 'f',
                },
                mac: {
                    modificator: 'metaKey',
                    key: 'f',
                },
            },
        },
    ]
});

editor.init();

editor.text = '# Header here\n\nSome text';

console.log(editor.text);
console.log(editor.html);
</pre>
</p>
</details>


### Methods

You can use api of editor via call one of these functions:

- `editor.html` - getter, return current textarea value as html.

- `editor.text` - getter, return current textarea value as text.

- `editor.text` - setter, sets new textarea value.

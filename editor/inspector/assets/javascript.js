const { createReadStream } = require('fs-extra');
const ReadLine = require('readline');

let panel;
let isPluginCheckBox;
let loadPluginInWebCheckBox;
let loadPluginInNativeCheckBox;
let loadPluginInEditorCheckBox;
let isSimulateGlobalsEnabledCheckBox;
let simulateGlobalsInput;
let dependenciesNumInput;
let dependenciesContent;
let pluginOperations;
let advancedSection;
let metas;
let meta;
const MAX_LINES = 400;
const MAX_LENGTH = 20000;

function t (key) {
    return Editor.I18n.t(`inspector.asset.javascript.${key}`);
}

/**
   * Checks whether a data is invalid in the multiple - selected state
   * @param key string
   */
function getInvalid (key) {
    const source = metas[0].userData[key];
    return !metas.every((meta) => source === meta.userData[key]);
}

/**
 * Modify the length of the dependent script
 * @param param number|event
 * @returns void
 */
function _onChangeDependenciesLength (param) {
    const childNodes = dependenciesContent.children;

    const length = typeof param === 'number' ? param : Number(param.target.value);
    panel.dispatch('change');
    function onDependenciesChange (event) {
        const value = event.target.value;
        this.value = value;
        meta.userData.dependencies[this.getAttribute('index')] = value;
        panel.dispatch('change');
    }

    if (!Array.isArray(meta.userData.dependencies)) {
        meta.userData.dependencies = [];
    }

    if (length < 0 || length > 10) {
        return;
    }
    while (meta.userData.dependencies.length < length) {
        meta.userData.dependencies.push('');
    }

    while (meta.userData.dependencies.length > length) {
        meta.userData.dependencies.pop();
    }
    for (let index = 0; index < length; index++) {
        const element = childNodes[index];
        const value = meta.userData.dependencies[index];
        if (!element) {
            const child = document.createElement('ui-asset');
            child.setAttribute('index', index.toString());
            child.setAttribute('value', value);
            child.setAttribute('droppable', 'cc.Script');
            child.addEventListener('confirm', onDependenciesChange.bind(child));
            dependenciesContent.appendChild(child);
        } else {
            element.value = value;
            element.setAttribute('index', index.toString());
        }
    }
    if (childNodes.length > length) {
        const needlessNodes = [];
        for (let index = childNodes.length - 1; index > length - 1; index--) {
            const element = childNodes[index];
            needlessNodes.push(element);
        }
        needlessNodes.forEach((node) => { dependenciesContent.removeChild(node); });
    }
}

function updateSimulateGlobalsNamesInput () {
    const isHidden = !meta.userData.simulateGlobals;
    simulateGlobalsInput.style = isHidden ? 'display:none' : '';
    simulateGlobalsInput.value = Array.isArray(meta.userData.simulateGlobals) ? meta.userData.simulateGlobals.join(';') : '';
}
function updatePluginOperations () {
    pluginOperations.forEach((element) => { element.hidden = !meta.userData.isPlugin || getInvalid('isPlugin'); });
}
exports.template = `
<section class="asset-javascript">

    <ui-prop class="line">
        <ui-label 
            i18n
            slot="label"
        >
        inspector.asset.javascript.plugin</ui-label>
        <ui-checkbox 
            class="content"
            id="is-plugin"
            slot="content"
        
         ></ui-checkbox>
    </ui-prop>

    <div
        class="plugin-operation"
    >
        <ui-prop class="line indent">
            <ui-label
                slot="label"
            >inspector.asset.javascript.dependencies</ui-label>
            <ui-num-input class="content" 
                step="1" 
                min="0" 
                max="10"
                slot="content"
                id="dependencies"
            ></ui-num-input>
        </ui-prop>
        <ui-prop class="line indent">
            <ui-label slot="label"></ui-label>
            <div class="assets content"
                slot="content"
                id="dependencies-content"
            >
            </div>
        </ui-prop>

        <div class="line indent">
            <ui-section class="content"
                id="advanced-section"
                expand
                expand-key="advanced"
            >
                <ui-prop class="line">
                    <ui-label i18n
                        slot="label"
                    >   
                        inspector.asset.javascript.simulateGlobals                        
                    </ui-label>
                    <span
                        slot="content"
                    >
                        <ui-checkbox
                            id="simulate-globals-enabled"
                        ></ui-checkbox>
                        <ui-input placeholder='self;window;global;globalThis'
                            id="simulate-globals-input"
                            hidden
                        ></ui-input>
                    </span>
                </ui-prop>
            </ui-section>
        </div>
    </div>

    <div
        class="child plugin-operation"
    >
        <ui-prop class="line">
            <ui-label i18n
                slot="label"
            >
            inspector.asset.javascript.loadPluginInWeb
            </ui-label>
            <ui-checkbox
                id="load-plugin-in-web"
                slot="content"
            ></ui-checkbox>
        </ui-prop>
        <ui-prop class="line"
        >
            <ui-label i18n
                slot="label"
            >
            inspector.asset.javascript.loadPluginInNative
            </ui-label>
            <ui-checkbox
                slot="content"
                id="load-plugin-in-native"
            ></ui-checkbox>
        </ui-prop>
        <ui-prop class="line">
            <ui-label i18n
                slot="label"
            >
            inspector.asset.javascript.loadPluginInEditor
            </ui-label>
            <ui-checkbox
                slot="content"
                id="load-plugin-in-editor"
            ></ui-checkbox>
        </ui-prop>
    </div>

    <ui-code 
        language="javascript"
        id="code"
    >
    </ui-code>
</section>


`;

exports.$ = {
    code: '#code',
    'is-plugin': '#is-plugin',
    'load-plugin-in-editor': '#load-plugin-in-editor',
    'load-plugin-in-web': '#load-plugin-in-web',
    'load-plugin-in-native': '#load-plugin-in-native',
    dependencies: '#dependencies',
    dependenciesContent: '#dependencies-content',
    'advanced-section': '#advanced-section',
    'simulate-globals-enabled': '#simulate-globals-enabled',
    'simulate-globals-input': '#simulate-globals-input',
    'dependencies-content': '#dependencies-content',
    'plugin-operation': '.plugin-operation',
};

exports.style = `
:host > .asset-javascript > ui-code[hidden] {
    display: none;
}
.asset-javascript {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.asset-javascript .indent {
    padding-left: 20px;
}
.asset-javascript .indent > ui-label {
    width: 130px;
}
.asset-javascript .assets > ui-asset {
    margin-top: 8px;
}
.asset-javascript ui-code {
    flex: 1;
    position: relative;
    overflow: auto;
    margin: 0;
    padding: 10px;
    font-size: 12px;
    border: 1px solid var(--color-normal-border);
    background: var(--color-normal-fill-emphasis);
    -webkit-user-select: text;
    cursor: auto;
}
`;

/**
 * Methods to automatically render components
 */
exports.update = function (assetList, metaList) {
    if (metas === metaList) {
        return;
    }
    metas = metaList;
    meta = metas[0];

    isPluginCheckBox.invalid = getInvalid('isPlugin');
    isSimulateGlobalsEnabledCheckBox.value = !!meta.userData.simulateGlobals;

    loadPluginInWebCheckBox.value = meta && meta.userData.loadPluginInWeb;
    loadPluginInWebCheckBox.invalid = getInvalid('loadPluginInWeb');

    loadPluginInNativeCheckBox.value = meta && meta.userData.loadPluginInNative;
    loadPluginInNativeCheckBox.invalid = getInvalid('loadPluginInNative');

    loadPluginInEditorCheckBox.value = meta && meta.userData.loadPluginInEditor;
    loadPluginInEditorCheckBox.invalid = getInvalid('loadPluginInEditor');

    updateSimulateGlobalsNamesInput();
    dependenciesNumInput.value = meta.userData.dependencies ? meta.userData.dependencies.length : 0;
    updatePluginOperations();
    _onChangeDependenciesLength(meta.userData.dependencies ? meta.userData.dependencies.length : 0);
    if (metaList.length) {
        const meta = metaList[0];
        const isPlugin = meta.userData.isPlugin;
        isPluginCheckBox.value = isPlugin;
    }
    if (assetList.length === 1) {
        const info = assetList[0];
        panel.$.code.hidden = false;
        if (info.importer !== 'javascript') {
            return;
        }
        const readStream = createReadStream(info.file, { encoding: 'utf-8' });
        // Displays 400 lines or 20,000 characters
        let remainLines = MAX_LINES;
        let remainLength = MAX_LENGTH;
        let text = '';
        const readLineStream = ReadLine.createInterface({ input: readStream, setEncoding: 'utf-8' });
        readLineStream.on('line', (line) => {
            const lineLength = line.length;
            if (lineLength > remainLength) {
                line = line.substr(0, remainLength);
                remainLength = 0;
            } else {
                remainLength -= lineLength;
            }

            remainLines--;
            text += `${line}\n`;

            if (remainLines <= 0 || remainLength <= 0) {
                text += '...\n';
            }
        });
        readLineStream.on('close', (err) => {
            if (err) {
                throw err;
            }
            panel.$.code.innerHTML = text;
        });
    } else {
        panel.$.code.innerText = '';
        panel.$.code.hidden = true;
    }
};

/**
 * A method to initialize the panel
 */
exports.ready = function () {
    panel = this;
    /**
     *
     * @param key key of userData
     * @param event document event
     */
    function _onPluginStateChanged (key, event) {
        const value = event.target.value;
        metas.forEach((meta) => {
            meta.userData[key] = value;
            if (key === 'isPlugin' && value) {
                if (!('loadPluginInWeb' in meta.userData)) {
                    meta.userData.loadPluginInWeb = true;
                }
                if (!('loadPluginInNative' in meta.userData)) {
                    meta.userData.loadPluginInNative = true;
                }
                if (!('loadPluginInEditor' in meta.userData)) {
                    meta.userData.loadPluginInEditor = false;
                }
            }
        });
        updatePluginOperations();
        panel.dispatch('change');
    }

    function onSimulateGlobalsStateChanged (event) {
        metas.forEach((meta) => { meta.userData.simulateGlobals = event.target.value; });
        panel.dispatch('change');
        updateSimulateGlobalsNamesInput();
    }
    function onSimulateGlobalsListChanged (event) {
        const value = event.target.value;
        if (typeof value === 'string') {
            let globalNames = [];
            if (value.length !== 0) {
                globalNames = value.split(';')
                    .map((globalName) => globalName.trim())
                    .filter((globalName) => globalName.length !== 0);
            }
            metas.forEach((meta) => meta.userData.simulateGlobals = globalNames.length === 0 ? true : globalNames);
            panel.dispatch('change');
        }
    }
    isPluginCheckBox = panel.$['is-plugin'];
    isPluginCheckBox.addEventListener('confirm', _onPluginStateChanged.bind(isPluginCheckBox, 'isPlugin'));

    loadPluginInEditorCheckBox = panel.$['load-plugin-in-editor'];
    loadPluginInEditorCheckBox.addEventListener('confirm', _onPluginStateChanged.bind(loadPluginInEditorCheckBox, 'loadPluginInEditor'));

    loadPluginInNativeCheckBox = panel.$['load-plugin-in-native'];
    loadPluginInNativeCheckBox.addEventListener('confirm', _onPluginStateChanged.bind(loadPluginInNativeCheckBox, 'loadPluginInNative'));

    loadPluginInWebCheckBox = panel.$['load-plugin-in-web'];
    loadPluginInWebCheckBox.addEventListener('confirm', _onPluginStateChanged.bind(loadPluginInWebCheckBox, 'loadPluginInWeb'));

    dependenciesContent = panel.$.dependenciesContent;

    dependenciesNumInput = panel.$.dependencies;
    dependenciesNumInput.addEventListener('confirm', _onChangeDependenciesLength);

    advancedSection = panel.$['advanced-section'];
    advancedSection.setAttribute('header', t('advanced'));

    isSimulateGlobalsEnabledCheckBox = panel.$['simulate-globals-enabled'];
    isSimulateGlobalsEnabledCheckBox.addEventListener('confirm', onSimulateGlobalsStateChanged);

    simulateGlobalsInput = panel.$['simulate-globals-input'];
    simulateGlobalsInput.addEventListener('confirm', onSimulateGlobalsListChanged);

    pluginOperations = panel.$this.shadowRoot.querySelectorAll('.plugin-operation');
};

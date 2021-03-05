const { createReadStream } = require('fs-extra');
const ReadLine = require('readline');

const MAX_LINES = 400;
const MAX_LENGTH = 20000;

exports.template = `
<section class="asset-javascript">
    <ui-code 
        language="typescript" 
        id="code"
    >
    </ui-code>
</section>`;

exports.$ = {
    code: '#code',
};

let panel;

exports.style = `
[hidden] {
    display: none;
}
.asset-javascript {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.asset-javascript .line {
    display: flex;
    margin-bottom: 6px;
}
.asset-javascript .line > ui-label {
    display: inline-block;
    width: 150px;
}
.asset-javascript .line > .content {
    flex: 1;
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
 * 自动渲染组件的方法
 */
exports.update = function (assetList, metaList) {
    if (assetList.length === 1) {
        panel.$.code.hidden = false;
        const info = assetList[0];
        if (info.importer !== 'typescript') {
            return;
        }
        const readStream = createReadStream(info.file, { encoding: 'utf-8' });
        // 显示 400 行或者 20000 个字符
        let remainLines = MAX_LINES;
        let remainLength = MAX_LENGTH;
        let text = '';
        const readLineStream = ReadLine.createInterface({ input: readStream, setEncoding: 'utf-8' });
        readLineStream.on('line', (line) => {
            line = line.replace(/<br>/g, '');
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
 * 初始化界面的方法
 */
exports.ready = function () {
    panel = this;
};

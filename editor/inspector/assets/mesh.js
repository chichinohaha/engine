/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-misused-promises */
const GlPreview = Editor._Module.require('PreviewExtends').default;
const glPreview = new GlPreview('scene:mesh-preview', 'query-mesh-preview-data');

exports.style = `
.asset-mesh {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.asset-mesh > section {
    flex: 1;
    overflow: auto;
}

.asset-mesh > footer {
    margin-top: 5px;
    border-top: 1px solid var(--color-normal-border);
}
.asset-mesh > footer> .preview-info {
    padding: 4px 8px;
}
.asset-mesh > footer> .preview-info > ui-label {
    margin-right: 6px;
}

.asset-mesh > footer > .imageDiv {
    height: 200px;
    overflow: hidden;
    display: flex;
    flex: 1;
    margin-right: 10px;
}
.asset-mesh > footer > .imageDiv > .image {
    flex: 1;
}
`;
exports.$ = {
    verticesLabel: '#verticesLabel',
    trianglesLabel: '#trianglesLabel',
    uvsLabel: '#uvsLabel',
    imageDiv: '#imageDiv',
    image: '#image',
};

exports.template = `
<section class="asset-mesh">
    <section></section>
    <footer>
        <div class="preview-info">
            <ui-label value="Vertices:0" id="verticesLabel"></ui-label>
            <ui-label value="Triangles:0" id="trianglesLabel"></ui-label>
            <ui-label value="" id="uvsLabel"></ui-label>
        </div>
        <div class="imageDiv" id="imageDiv">
            <canvas class="image" id="image"
                
            ></canvas>
        </div>
    </footer>
</section>
`;

exports.methods = {

    async initPreview () {
        if (!this.$.image) {
            return;
        }

        if (this.from) {
            return;
        }

        await glPreview.init({ width: this.$.image.clientWidth, height: this.$.image.clientHeight });
        await Editor.Message.request('scene', 'set-mesh-preview-mesh', this.assetInfo.uuid);

        // 增加容错：await 后 inspector 内容变动，会导致 .width 取值报错
        if (!this.$.image) {
            return;
        }

        glPreview.initGL(this.$.image, { width: this.$.image.clientWidth, height: this.$.image.clientHeight });
        this.previewConfig.width = this.$.image.clientWidth;
        this.previewConfig.height = this.$.image.clientHeight;

        await this.update();
    },

    async update () {
        const canvas = this.$.image;
        // 必须要设置 canvas的宽高
        canvas.width = this.$.imageDiv.clientWidth;
        canvas.height = this.$.imageDiv.clientHeight;

        const info = await glPreview.queryPreviewData({ width: this.$.imageDiv.clientWidth, height: this.$.imageDiv.clientHeight });
        console.log(info);
        if (info.width !== this.previewConfig.width || info.height !== this.previewConfig.height) {
            glPreview.resizeGL(info.width, info.height);
            this.previewConfig.width = info.width;
            this.previewConfig.height = info.height;
        }
        try {
            glPreview.drawGL(info.buffer, info.width, info.height);
        } catch (e) {
            console.warn(e);
        }
    },

    onPreviewMouseDown (event) {
        Editor.Message.request('scene', 'on-mesh-preview-mouse-down', { x: event.x, y: event.y });
        event.target.requestPointerLock();
        const panel = this;
        async function onPreviewMouseMove (event) {
            console.log('mousexy', event.movementX, event.movementY);
            await Editor.Message.request('scene', 'on-mesh-preview-mouse-move', { movementX: event.movementX, movementY: event.movementY });
            await panel.update();
        }

        async function onPreviewMouseUp (event) {
            await Editor.Message.request('scene', 'on-mesh-preview-mouse-up', { x: event.x, y: event.y });
            document.exitPointerLock();
            document.removeEventListener('mousemove', onPreviewMouseMove);
            document.removeEventListener('mouseup', onPreviewMouseUp);
            await panel.update();
        }
        document.addEventListener('mousemove', onPreviewMouseMove);
        document.addEventListener('mouseup', onPreviewMouseUp);
    },

    updateMeshInfo (meshInfo) {
        if (this.$.verticesLabel) {
            this.$.verticesLabel.value = `Vertices:${meshInfo.vertices}`;
        }
        if (this.$.trianglesLabel) {
            this.$.trianglesLabel.value = `Triangles:${meshInfo.polygons}`;
        }
        if (this.$.uvsLabel) {
            this.$.uvsLabel.value = '';
            if (meshInfo.uvs.length > 0) {
                this.$.uvsLabel.value = 'UV:';
                meshInfo.uvs.forEach((uvIndex, index) => {
                    this.$.uvsLabel.value += uvIndex;
                    if (index !== meshInfo.uvs.length - 1) {
                        this.$.uvsLabel.value += ',';
                    }
                });
            }
        }

        this.isPreviewDataDirty = true;
    },
};

exports.ready = function () {
    this.updateMeshInfoFunc = this.updateMeshInfo.bind(this);
    Editor.Message.addBroadcastListener('scene:mesh-preview-mesh-info', this.updateMeshInfoFunc);
    this.previewConfig = {};
    this.$.image.addEventListener('mousedown', this.onPreviewMouseDown.bind(this));
};

exports.update = async function (assetList, metaList) {
    this.assetInfo = assetList[0];
    this.assetInfos = assetList;
    this.meta = metaList[0];
    this.metas = metaList;
    this.readonly = this.assetInfo.readonly;
    await this.initPreview();
};

exports.data = function () {
    return {
        meta: null,
        readonly: {
            value: true,
        },
        isPreviewDataDirty: true,
    };
};

exports.close = function () {
    Editor.Message.removeBroadcastListener('scene:mesh-preview-mesh-info', this.updateMeshInfoFunc);
    Editor.Message.request('scene', 'hide-mesh-preview');
};

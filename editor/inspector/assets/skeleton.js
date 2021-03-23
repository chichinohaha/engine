/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-misused-promises */
const GlPreview = Editor._Module.require('PreviewExtends').default;
const glPreview = new GlPreview('scene:skeleton-preview', 'query-skeleton-preview-data');

exports.style = `
.asset-skeleton {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.asset-skeleton > section {
    flex: 1;
    overflow: auto;
}

.asset-skeleton > footer {
    margin-top: 5px;
    border-top: 1px solid var(--color-normal-border);
}
.asset-skeleton > footer> .preview-info {
    padding: 4px 8px;
}
.asset-skeleton > footer> .preview-info > ui-label {
    margin-right: 6px;
}

.asset-skeleton > footer > .imageDiv {
    height: 200px;
    overflow: hidden;
    display: flex;
    flex: 1;
    margin-right: 10px;
}
.asset-skeleton > footer > .imageDiv > .image {
    flex: 1;
}
`;

exports.template = `
<section class="asset-skeleton">
    <section></section>
    <footer>
        <div class="preview-info">
            <ui-label value="JointCount:0" id="jointCountLabel"></ui-label>
        </div>
        <div class="imageDiv" id="imageDiv">
            <canvas class="image" id="image"
                @mousedown=onPreviewMouseDown($event)
            ></canvas>
        </div>
    </footer>
</section>
`;
exports.$ = {
    imageDiv: '#imageDiv',
    image: '#image',
    jointCountLabel: '#jointCountLabel',
};
const previewConfig = {};

exports.methods = {
    async initPreview () {
        if (!this.$.image) {
            return;
        }

        if (this.from) {
            return;
        }

        await glPreview.init({ width: this.$.image.clientWidth, height: this.$.image.clientHeight });
        await Editor.Message.request('scene', 'set-skeleton-preview-skeleton', this.info.uuid);

        if (!this.$.image) {
            return;
        }
        glPreview.initGL(this.$.image, { width: this.$.image.clientWidth, height: this.$.image.clientHeight });
        previewConfig.width = this.$.image.clientWidth;
        previewConfig.height = this.$.image.clientHeight;

        await this.update();
    },

    async update () {
        const canvas = this.$.image;
        // 必须要设置 canvas的宽高
        canvas.width = this.$.imageDiv.clientWidth;
        canvas.height = this.$.imageDiv.clientHeight;

        const info = await glPreview.queryPreviewData({ width: this.$.imageDiv.clientWidth, height: this.$.imageDiv.clientHeight });

        if (info.width !== previewConfig.width || info.height !== previewConfig.height) {
            glPreview.resizeGL(info.width, info.height);
            previewConfig.width = info.width;
            previewConfig.height = info.height;
        }
        try {
            glPreview.drawGL(info.buffer, info.width, info.height);
        } catch (e) {
            console.warn(e);
        }
    },

    onPreviewMouseDown (event) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-down', { x: event.x, y: event.y });

        event.target.requestPointerLock();
        document.addEventListener('mousemove', this.onPreviewMouseMove.bind(this));
        document.addEventListener('mouseup', this.onPreviewMouseUp.bind(this));
    },

    async onPreviewMouseMove (event) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-move', { movementX: event.movementX, movementY: event.movementY });
        await this.update();
    },

    async onPreviewMouseUp (event) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-up', { x: event.x, y: event.y });
        document.exitPointerLock();
        document.removeEventListener('mousemove', this.onPreviewMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onPreviewMouseUp.bind(this));
        await this.update();
    },

    updateSkeletonInfo (skeletonInfo) {
        if (this.$.jointCountLabel) {
            this.$.jointCountLabel.value = `JointCount:${skeletonInfo.jointCount}`;
        }
    },
};

exports.ready = function () {
    this.updateInfoFunc = this.updateSkeletonInfo.bind(this);
    this.$.image.addEventListener('mousedown', this.onPreviewMouseDown.bind(this));
    Editor.Message.addBroadcastListener('scene:skeleton-preview-skeleton-info', this.updateInfoFunc);
};

exports.close = function () {
    Editor.Message.removeBroadcastListener('scene:skeleton-preview-skeleton-info', this.updateInfoFunc);
    Editor.Message.request('scene', 'hide-skeleton-preview');
};
exports.update = function (assetList, metaList) {
    this.info = assetList[0];
    this.initPreview();
};

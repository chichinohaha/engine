'use strict';

const ElectronModule = require('@base/electron-module');
const GlPreview = ElectronModule.require('PreviewExtends').default;
let glPreview = new GlPreview('scene:skeleton-preview', 'query-skeleton-preview-data');

export const style = `
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

export const template = `
<section class="asset-skeleton">
    <section></section>
    <footer>
        <div class="preview-info">
            <ui-label value="JointCount:0" ref="jointCountLabel"></ui-label>
        </div>
        <div class="imageDiv" ref="imageDiv">
            <canvas class="image" ref="image"
                @mousedown=onPreviewMouseDown($event)
            ></canvas>
        </div>
    </footer>
</section>
`;

export const props = [
    'info',
];

interface IPreviewConfig {
    width?: number;
    height?: number;
}
const previewConfig: IPreviewConfig = {};

export const methods = {
    refresh() {
      

        this.isPreviewDataDirty = true;
        this.initPreview();
    },

    async initPreview() {


        if (!this.$refs.image) {
            return;
        }

        if (this.from) {
            return;
        }

        await glPreview.init({ width: this.$refs.image.clientWidth, height: this.$refs.image.clientHeight });
        await Editor.Message.request('scene', 'set-skeleton-preview-skeleton', this.info.uuid);

        if (!this.$refs.image) {
            return;
        }
        glPreview.initGL(this.$refs.image, { width: this.$refs.image.clientWidth, height: this.$refs.image.clientHeight });
        previewConfig.width = this.$refs.image.clientWidth;
        previewConfig.height = this.$refs.image.clientHeight;
        if (this.updateTask) {
            cancelAnimationFrame(this.updateTask);
            this.updateTask = null;
        }

        this.update();
    },

    async update() {

        const canvas = this.$refs.image;
        if (!this || !canvas) {
            this.updateTask = null;
            return;
        }

        if (this.isPreviewDataDirty) {
            // 必须要设置 canvas的宽高
            canvas.width = this.$refs.imageDiv.clientWidth;
            canvas.height = this.$refs.imageDiv.clientHeight;

            const info: any = await glPreview.queryPreviewData({ width: this.$refs.imageDiv.clientWidth, height: this.$refs.imageDiv.clientHeight });

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
            this.isPreviewDataDirty = false;
        }

        this.updateTask = requestAnimationFrame(async () => { await this.update(); });
    },

    onPreviewMouseDown(event: MouseEvent) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-down', { x: event.x, y: event.y });
      
        event.target.requestPointerLock();
        document.addEventListener('mousemove', this.onPreviewMouseMove);
        document.addEventListener('mouseup', this.onPreviewMouseUp);

        this.isPreviewDataDirty = true;
    },

    onPreviewMouseMove(event: MouseEvent) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-move', { movementX: event.movementX, movementY: event.movementY });

        this.isPreviewDataDirty = true;
    },

    onPreviewMouseUp(event: MouseEvent) {
        Editor.Message.request('scene', 'on-skeleton-preview-mouse-up', { x: event.x, y: event.y });
        document.exitPointerLock();
        document.removeEventListener('mousemove', this.onPreviewMouseMove);
        document.removeEventListener('mouseup', this.onPreviewMouseUp);

        this.isPreviewDataDirty = true;
    },

    updateSkeletonInfo(skeletonInfo: {jointCount: number}) {

        if (this.$refs.jointCountLabel) {
            this.$refs.jointCountLabel.value = "JointCount:" + skeletonInfo.jointCount;
        }
        this.isPreviewDataDirty = true;
    },
};

export const watch = {
    info() {

        this.readonly.value = this.info && this.info.readonly;
        this.refresh();
    },
};

export function data() {
    return {
        meta: null,
        readonly: {
            value: true,
        },
        isPreviewDataDirty: true,
    };
}

export function mounted() {
  
    const this: any = this;
    this.info = this.infos[0];
    this.meta = this.metas[0];
    this.refresh();
    Editor.Message.addBroadcastListener('scene:skeleton-preview-skeleton-info', this.updateSkeletonInfo);
}

export function destroyed() {
  
    const this: any = this;
    Editor.Message.removeBroadcastListener('scene:skeleton-preview-skeleton-info', this.updateSkeletonInfo);
    Editor.Message.request('scene', 'hide-skeleton-preview');
}

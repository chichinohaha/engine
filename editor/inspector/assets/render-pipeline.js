/* eslint-disable @typescript-eslint/no-misused-promises */
exports.style = `
`;

exports.template = `

`;
exports.$ = {
    allContent: '#allContent',
    pipelines: '#pipelines',
    pipelineContent: '#pipelineContent',
};
const uiElements = {
    allContent: {
        update () {
            this.$.allContent.hidden = this.assetInfos.length !== 1;
        },
    },
    pipeline: {
        ready () {
            this.$.pipelines.addEventListener('confirm', (event) => {
                this.pipelineIndex = event.target.value;
            });
        },
        update () {
            let i = 0;
            for (const key in this.pipelines) {
                const pipeline = this.pipelines[key];
                let child = this.$.pipelines.childNodes[i];
                if (!child) {
                    const node = document.createElement('option');
                    child = node;
                    this.$.pipelines.appendChild(node);
                }
                child.value = i;
                child.innerText = pipeline.name;
                i++;
            }
            if (this.$.pipelines.length >  this.pipelines.length) {
                for (let index = this.$.pipelines.length - 1; index > this.pipelines.length - 1; index--) {
                    const element = this.$.pipelines[index];
                    element.remove();
                }
            }

            this.$.pipelines.value = this.pipelineIndex;
            this.$.pipelines.disabled = this.readonly;
        },
    },
    pipelineContent: {
        update () {
            let i = 0;
            const childNodes = [];
            for (const key in this.pipeline) {
                const item = this.pipeline[key];
                let child = this.$.pipelineContent.childNodes[i];
                if (!child) {
                    child = document.createElement('ui-prop');
                    child.addEventListener('dump-change', () => { this.dispatch('change'); });
                    child.type = 'dump';
                }
                child.render(item);
                child.value = i;
                child.innerText = item.name;
                childNodes.push(child);
                i++;
            }
            this.$.pipelineContent.replaceChildren(...childNodes);
        },
    },
};
exports.methods = {
    onDataChaged (key, event) {

    },
    async loadPipeline () {
        if (!this.meta) {
            return;
        }

        const pipeline = await Editor.Message.request('scene', 'query-render-pipeline', this.assetInfo.uuid);
        if (pipeline) {
            this.pipeline = pipeline;

            this.pipelineIndex = this.pipelines.findIndex((one) => one.name === this.pipeline.name);
        }

        // 更新运行时数据
        await this.previewRenderPipeline(this.assetInfo.uuid, this.pipeline);
    },
    /**
     * 读取所有注册在案的数据
     */
    async loadAll () {
        this.pipelines = await Editor.Message.request('scene', 'query-all-render-pipelines');
    },

    async previewRenderPipeline (uuid, data) {
        await Editor.Message.request('scene', 'preview-render-pipeline', uuid, data);
    },

    async reset () {
        await this.loadPipeline();
        // 更新运行时数据
        await this.previewRenderPipeline(this.assetInfo.uuid, this.pipeline);
    },

    async apply () {
        await Editor.Message.request('scene', 'apply-render-pipeline', this.assetInfo.uuid, this.pipeline);
        // 更新运行时数据
        await this.previewRenderPipeline(this.assetInfo.uuid, this.pipeline);
    },

    change () {
        /**
         * hack: setTimeout 处理
         * ins-prop 的 change 和 confirm -> change 会触发两次
         * 连续的更新会导致 scene 那边数据问题，暂时这么处理，只触发一次
         */
        if (this.changeTimeId) {
            clearTimeout(this.changeTimeId);
        }
        this.changeTimeId = setTimeout(async () => {
            const target = this.pipelines[this.pipelineIndex];
            if (this.pipeline.name === target.name) {
                this.pipeline = await Editor.Message.request('scene', 'change-render-pipeline', this.pipeline);
            } else {
                this.pipeline = await Editor.Message.request('scene', 'select-render-pipeline', this.pipelines[this.pipelineIndex].name);
            }
        }, 50);
    },
};

exports.ready =  async function ready () {
    this.pipelines = [];
    this.pipeline = {};
    this.pipelineIndex = -1;
    await this.loadAll();
    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.ready === 'function') {
            element.ready();
        }
    }
};
exports.update = function update (assetList, metaList) {
    this.metas = metaList;
    this.meta = this.metas[0];
    this.assetInfos = assetList;
    this.assetInfo = assetList[0];
    this.readonly = this.assetInfo.readonly;
    this.loadPipeline();
    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.update === 'function') {
            element.update();
        }
    }
};

/* eslint-disable @typescript-eslint/no-misused-promises */
exports.style = `
.asset-render-pipeline {
    display: flex;
    flex-direction: column;
  }
  .asset-render-pipeline > .header {
    padding-bottom: 8px;
    margin-bottom: 4px;
    border-bottom: 1px var(--color-normal-border) dashed;
  }
  .asset-render-pipeline > .header > ui-prop > ui-select {
    flex: 1;
  }
  .asset-render-stage > .content,
  .asset-render-flow > .content {
    margin-top: 10px;
    padding: 5px;
    border: 1px var(--color-normal-border) dashed;
  }
  
`;

exports.template = `
<section class="asset-render-pipeline"
    id="allContent"   
>
    <div class="header">
        <ui-prop>
            <ui-label slot="label">Pipelines</ui-label>
            <ui-select slot="content"
                id="pipelines">
            </ui-select>
        </ui-prop>
    </div>

    <div class="content">
        <div id="pipelineContent"></div>
    </div>

</section>
`;
exports.$ = {
    allContent: '#allContent',
    pipelines: '#pipelines',
    pipelineContent: '#pipelineContent',
};
function modifyType (event) {
    const dump = event.target.dump;

    if (dump.isArray) {
        const newLength = event.target.value;
        if (newLength < dump.value.length) {
            dump.value.splice(newLength, dump.value.length - newLength);
        } else {
            let defaultValue = null;
            switch (dump.type) {
            case 'Float':
            case 'number':
            case 'Number':
                defaultValue = 0;
                break;
            case 'String':
                defaultValue = '';
                break;
            default:
                break;
            }

            const addItemNum = newLength - dump.value.length;
            for (let i = 0; i < addItemNum; i++) {
                dump.value.push(defaultValue);
            }
        }
    }
}

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
                this.dispatch('change');
            });
        },
        update () {
            let i = 0;
            const childList = [];
            for (const key in this.pipelines) {
                const pipeline = this.pipelines[key];
                let child = this.$.pipelines.children[i];
                if (!child) {
                    const node = document.createElement('option');
                    child = node;
                }
                child.value = i;
                child.innerText = pipeline.name;
                childList.push(child);
                i++;
            }
            this.$.pipelines.replaceChildren(...childList);

            this.$.pipelines.value = this.pipelineIndex;
            this.$.pipelines.disabled = this.readonly;
        },
    },
    pipelineContent: {
        update () {
            const childNodes = [];
            for (const key in this.pipeline.value) {
                const dump = this.pipeline.value[key];
                if (!dump.visible) {
                    continue;
                }
                const child = document.createElement('ui-prop');
                child.setAttribute('type', 'dump');

                child.addEventListener('change-dump', (event) => {
                    modifyType(event.target.dump);
                    this.change();
                });

                child.render(dump);
                childNodes.push(child);
            }
            this.$.pipelineContent.replaceChildren(...childNodes);
        },
    },
};
exports.methods = {
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

    async change () {
        const target = this.pipelines[this.pipelineIndex];
        if (this.pipeline.name === target.name) {
            this.pipeline = await Editor.Message.request('scene', 'change-render-pipeline', this.pipeline);
        } else {
            this.pipeline = await Editor.Message.request('scene', 'select-render-pipeline', this.pipelines[this.pipelineIndex].name);
        }

        uiElements.pipelineContent.update.call(this);
        this.dispatch('change');
    },
};

exports.ready = function ready () {
    this.pipeline = {};
    this.pipelineIndex = -1;

    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.ready === 'function') {
            element.ready.call(this);
        }
    }
};
exports.update = async function update (assetList, metaList) {
    this.metas = metaList;
    this.meta = this.metas[0];
    this.assetInfos = assetList;
    this.assetInfo = assetList[0];
    this.readonly = this.assetInfo.readonly;
    this.pipelines = await Editor.Message.request('scene', 'query-all-render-pipelines');
    await this.loadPipeline();
    for (const key in uiElements) {
        const element = uiElements[key];
        if (typeof element.update === 'function') {
            element.update.call(this);
        }
    }
};

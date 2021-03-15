exports.template = `
<section>
    <div class="content"
        id="allContent"
    >
        <ui-prop asset >
            <ui-label slot="label" tooltip="i18n:ENGINE.assets.label-atlas.SpriteFrameTip"> SpriteFrame </ui-label>
            <ui-asset
                id="spriteFrame"
                slot="content" 
                droppable="cc.SpriteFrame" 
            ></ui-asset>
        </ui-prop>
        <ui-prop >
            <ui-label slot="label" tooltip="i18n:ENGINE.assets.label-atlas.ItemWidthTip"> Item Width </ui-label>
            <ui-num-input
                id="itemWidth"
                slot="content"
                preci="0"
                step="1"
                min="0"
            ></ui-num-input>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" tooltip="i18n:ENGINE.assets.label-atlas.ItemHeightTip"> Item Height </ui-label>
            <ui-num-input
                id="itemHeight"
                slot="content"
                preci="0"
                step="1"
                min="0"
            ></ui-num-input>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" tooltip="i18n:ENGINE.assets.label-atlas.StartCharTip"> Start Char </ui-label>
            <ui-input
                slot="content"
                id="startChar"
            ></ui-input>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" tooltip="i18n:ENGINE.assets.label-atlas.FontSizeTip"> Font Size </ui-label>
            <ui-input
                id="fontSize"
                slot="content"
                disabled
            ></ui-input>
        </ui-prop>
    </div> 
</section>
`;

const uiElements = {
    spriteFrame: {
        ready () {
            this.$.spriteFrame.addEventListener('change', this._onDataChanged.bind(this, 'spriteFrameUuid'));
        },
        update () {
            this.$.spriteFrame.value = this.meta.userData.spriteFrameUuid;
            this.$.spriteFrame.disabled = this.assetInfo.readonly;
        },
    },
    itemWidth: {
        ready () {
            this.$.itemWidth.addEventListener('change', this._onDataChanged.bind(this, 'itemWidth'));
        },
        update () {
            this.$.itemWidth.value = this.meta.userData.itemWidth;
            this.$.itemWidth.disabled = this.assetInfo.readonly;
        },
    },
    itemHeight: {
        ready () {
            this.$.itemHeight.addEventListener('change', this._onDataChanged.bind(this, 'itemHeight'));
        },
        update () {
            this.$.itemHeight.value = this.meta.userData.itemHeight;
            this.$.itemHeight.disabled = this.assetInfo.readonly;
        },
    },
    startChar: {
        ready () {
            this.$.startChar.addEventListener('change', this._onDataChanged.bind(this, 'startChar'));
        },
        update () {
            this.$.startChar.value = this.meta.userData.startChar;
            this.$.startChar.disabled = this.assetInfo.readonly;
        },
    },
    fontSize: {
        ready () {
            this.fontSize = this.$.fontSize;
        },
        update () {
            this.fontSize.value = this.meta.userData.fontSize;
            this.$.fontSize.disabled = this.assetInfo.readonly;
        },
    },
    allContent: {
        ready () {
            this.allContent = this.$.allContent;
        },
        update () {
            this.allContent.hidden = this.metas.length !== 1;
        },
    },

};
exports.$ = {
    spriteFrame: '#spriteFrame',
    itemWidth: '#itemWidth',
    itemHeight: '#itemHeight',
    startChar: '#startChar',
    fontSize: '#fontSize',
    allContent: '#allContent',
};
exports.methods = {
    _onDataChanged (key, event) {
        this.meta.userData[key] = event.target.value;
        this.dispatch('change');
        exports.update(this.assetInfos, this.metas);
    },
};

exports.ready = function () {
    for (const key in uiElements) {
        if (uiElements[key].ready) {
            uiElements[key].ready.call(this);
        }
    }
};

exports.update = function (assetList, metaList) {
    this.metas = metaList;
    this.meta = this.metas[0];
    this.assetInfos = assetList;
    this.assetInfo = assetList[0];
    for (const key in uiElements) {
        if (uiElements[key].update) {
            uiElements[key].update.call(this);
        }
    }
};

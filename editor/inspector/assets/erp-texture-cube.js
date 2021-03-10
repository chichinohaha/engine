exports.template = `
<section class="asset-texture">
    <div class="content"        
        id="all-content"
    >
        <ui-prop
            id="anisotropy"
        >
            <span slot="label">
                <ui-label tooltip="Anisotropy">Anisotropy</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-num-input slot="content"    
            ></ui-num-input>
        </ui-prop>
        <ui-prop id="faceSize">
            <span slot="label">
                <ui-label tooltip="i18n:inspector.asset.erpTextureCube.facesize.title"
                >Face Size</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-num-input slot="content"    
            ></ui-num-input>
        </ui-prop>
        <ui-prop id="minfilter">
            <span slot="label">
                <ui-label tooltip="Min Filter">Min Filter</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-select slot="content">
                <option>nearest</option>
                <option>linear</option>
            </ui-select>
        </ui-prop>
        <ui-prop id="magfilter">
            <span slot="label">
                <ui-label tooltip="Mag Filter">Mag Filter</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-select slot="content">
                <option>nearest</option>
                <option>linear</option>
            </ui-select>
        </ui-prop>
        <ui-prop id="mipfilter">
            <span slot="label">
                <ui-label tooltip="Mip Filter">Mip Filter</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-select slot="content">
                <option>none</option>
                <option>nearest</option>
                <option>linear</option>
            </ui-select>
        </ui-prop>
        <ui-prop id="wrapModeS">
            <span slot="label">
                <ui-label tooltip="Wrap Mode S">Wrap Mode S</ui-label>
                <ui-icon value="lock"></ui-icon>
            </span>
            <ui-select slot="content">
                <option>repeat</option>
                <option>clamp-to-edge</option>
                <option>mirrored-repeat</option>
            </ui-select>
        </ui-prop>
        <ui-prop id="wrapModeT">
            <span slot="label">
                <ui-label tooltip="Wrap Mode T">Wrap Mode T</ui-label>
                <ui-icon value="lock" ></ui-icon>
            </span>
            <ui-select slot="content">
                <option>repeat</option>
                <option>clamp-to-edge</option>
                <option>mirrored-repeat</option>
            </ui-select>
        </ui-prop>
    </div>
</section>
`;

exports.style = `
.asset-texture-cube {
    overflow: auto;
    padding: 0 10px;
}
.asset-texture-cube .ins-prop {
    margin: 15px 0;
}
.asset-texture-cube .ins-prop ui-asset {
    flex: 1;
}
.asset-texture-cube .texture-cube-preview {
    height: 300px;
    background: var(--color-normal-fill-emphasis);
    outline: none;
    padding: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.asset-texture-cube .texture-cube-preview .center {
    position: relative;
    width: calc(var(--size) * 4);
    height: calc(var(--size) * 3);
}
.asset-texture-cube .texture-cube-preview ui-image {
    line-height: var(--size);
    position: absolute;
    width: var(--size);
    height: var(--size);
    background: var(--color-normal-fill-weaker);
    text-align: center;
    overflow: hidden;
}
.asset-texture-cube .texture-cube-preview ui-image[hovering] {
    outline: 1px solid green;
}
.asset-texture-cube .texture-cube-preview canvas {
    pointer-events: none;
}
.asset-texture-cube .texture-cube-preview .top {
    top: 0;
    left: calc(var(--size) * 2);
}
.asset-texture-cube .texture-cube-preview .bottom {
    top: calc(var(--size) * 2);
    left: calc(var(--size) * 2);
}
.asset-texture-cube .texture-cube-preview .front {
    top: var(--size);
    left: calc(var(--size) * 2);
}
.asset-texture-cube .texture-cube-preview .back {
    top: var(--size);
    left: 0;
}
.asset-texture-cube .texture-cube-preview .left {
    top: var(--size);
    left: var(--size);
}
.asset-texture-cube .texture-cube-preview .right {
    top: var(--size);
    left: calc(var(--size) * 3);
}
.asset-texture {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.asset-texture > .content {
    padding-bottom: 15px;
    flex: 1;
    overflow: auto;
}
.asset-texture > .content > .edit-btn {
    text-align: center;
    margin-top: 10px;
}
.asset-texture > .content > .warn-words {
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 1.7;
    color: var(--color-warn-fill);
}
`;

exports.$ = {
    allContent: '#all-content',
    anisotropy: '#anisotropy',
    faceSize: '#faceSize',
    minfilter: '#minfilter',
    magfilter: '#magfilter',
    mipfilter: '#mipfilter',
    wrapModeS: '#wrapModeS',
    wrapModeT: '#wrapModeT',
};

exports.ready = function () {
    for (const key in uiElements) {
        uiElements[key].ready.call(this);
    }
};

exports.update = function (assetList, metaList) {
    this.metas = metaList;
    this.meta = metaList[0];
    this.assetInfos = assetList;
    this.assetInfo = assetList[0];
    for (const key in uiElements) {
        uiElements[key].update.call(this);
    }
};

const uiElements = {
    allContent: {
        ready () {
            this.allContent = this.$.allContent;
        },
        update () {
            this.allContent.hidden = !this.meta;
        },
    },
    lockIcons: {
        ready () {
            this.lockIcons = [];
            this.$this.shadowRoot.querySelectorAll('ui-prop').forEach((uiProp) => { this.lockIcons.push(uiProp.querySelector('ui-icon')); });
        },
        update () {
            this.lockIcons.forEach((icon) => {
                const isHidden = !this.assetInfo.readonly;
                icon.style = isHidden ? 'display:none' : '';
            });
        },
    },
    anisotropy: {
        ready () {
            this.anisotropy = this.$.anisotropy.querySelector('ui-num-input');
            this.anisotropy.addEventListener('change', this._onChangeData.bind(this, 'anisotropy'));
        },
        update () {
            this.anisotropy.invalid = this.getInvalid('anisotropy');
            this.anisotropy.disabled = this.assetInfo.readonly;
            this.anisotropy.value = this.meta.userData.anisotropy;
        },
    },
    faceSize: {
        ready () {
            this.faceSize = this.$.faceSize.querySelector('ui-num-input');
            this.faceSize.addEventListener('change', this._onChangeData.bind(this, 'faceSize'));
        },
        update () {
            this.faceSize.invalid = this.getInvalid('faceSize');
            this.faceSize.disabled = this.assetInfo.readonly;
            this.faceSize.value = this.meta.userData.faceSize;
        },
    },
    minfilter: {
        ready () {
            this.minfilter = this.$.minfilter.querySelector('ui-select');
            this.minfilter.addEventListener('change', this._onChangeData.bind(this, 'minfilter'));
        },
        update () {
            this.minfilter.invalid = this.getInvalid('minfilter');
            this.minfilter.disabled = this.assetInfo.readonly;
            this.minfilter.value = this.meta.userData.minfilter;
        },
    },
    magfilter: {
        ready () {
            this.magfilter = this.$.magfilter.querySelector('ui-select');
            this.magfilter.addEventListener('change', this._onChangeData.bind(this, 'magfilter'));
        },
        update () {
            this.magfilter.invalid = this.getInvalid('magfilter');
            this.magfilter.disabled = this.assetInfo.readonly;
            this.magfilter.value = this.meta.userData.magfilter;
        },
    },
    mipfilter: {
        ready () {
            this.mipfilter = this.$.mipfilter.querySelector('ui-select');
            this.mipfilter.addEventListener('change', this._onChangeData.bind(this, 'mipfilter'));
        },
        update () {
            this.mipfilter.invalid = this.getInvalid('mipfilter');
            this.mipfilter.disabled = this.assetInfo.readonly;
            this.mipfilter.value = this.meta.userData.mipfilter;
        },
    },
    wrapModeS: {
        ready () {
            this.wrapModeS = this.$.wrapModeS.querySelector('ui-select');
            this.wrapModeS.addEventListener('change', this._onChangeData.bind(this, 'wrapModeS'));
        },
        update () {
            this.wrapModeS.invalid = this.getInvalid('wrapModeS');
            this.wrapModeS.disabled = this.assetInfo.readonly;
            this.wrapModeS.value = this.meta.userData.wrapModeS;
        },
    },
    wrapModeT: {
        ready () {
            this.wrapModeT = this.$.wrapModeT.querySelector('ui-select');
            this.wrapModeT.addEventListener('change', this._onChangeData.bind(this, 'wrapModeT'));
        },
        update () {
            this.wrapModeT.invalid = this.getInvalid('wrapModeT');
            this.wrapModeT.disabled = this.assetInfo.readonly;
            this.wrapModeT.value = this.meta.userData.wrapModeT;
        },
    },

};

exports.methods = {
    /**
     * 检查多选状态下某个数据是否无效
     * @param key
     */
    getInvalid (key) {
        const source = this.metas[0].userData[key];
        return !this.metas.every((meta) => source === meta.userData[key]);
    },

    _onChangeData (key, event) {
        this.metas.forEach((meta) => {
            meta.userData[key] = event.target.value;
        });
        this.dispatch('change');
    },
};

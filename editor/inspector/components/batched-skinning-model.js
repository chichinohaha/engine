exports.template = `
<div class="batched-skinning-component">
    <div>
        <ins-prop
            :dump="operation"
        >
            <ui-button class="green"
                :style="style"
                @confirm="_onApplyClick($event)"
            >Cook</ui-button>
        </ins-prop>
    </div>

    <div class="content"
        v-for="item in sortProp(dump.value)"
        v-if="item.dump.visible"
    >
        <ins-prop auto="true"
            :dump="item.dump"
            :dumps="dumps ? dumps.map(dump => dump.value[item.key]) : null"
        ></ins-prop>
    </div>
</div>
`;

exports.methods = {


    _onApplyClick() {
        Editor.Message.send('scene', 'execute-component-method', {
            uuid: this.dump.value.uuid.value,
            name: 'cook',
            args: [],
        });

        this.dumps && this.dumps.forEach((dump) => {
            Editor.Message.send('scene', 'execute-component-method', {
                uuid: dump.value.uuid.value,
                name: 'combine',
                args: [],
            });
        });
    },
};



export function data() {
    return {
        operation: {
            name: 'Operation',
        },
        style: {
        },
    };
}

export function mounted() { }

export function beforeDestroy() { }

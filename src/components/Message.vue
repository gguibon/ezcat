<template>
    <q-item>
        <q-item-section avatar top class="gt-sm">
            <q-avatar :icon="modeicon[data.author]" :color="$props.modecolor" text-color="white" />
        </q-item-section>

        <q-item-section top>
            <q-item-label caption class="text-justify">
                <div class="row">
                    <div class="col-xs-12"><span class="text-weight-bold text-capitalize" :class="'text-'+$props.modecolor">{{data.author}}</span></div>
                    <div class="col-xs-12 text-body1 text-blue-grey-8"><span style="overflow:auto; width:99vw;">{{data.text}}</span></div>
                    <div class="col-xs-12 xs">
                        <q-select v-show="!(data.author=='alert')" outlined :color="(label!=null ? $props.modecolor : '')" :label-color="(label!=null ? $props.modecolor:'')" v-model="label" @input="updateData()" :options="$store.getters.firstMsgLabel.item.values" :label="toUpper($store.getters.firstMsgLabel.key)" transition-show="jump-up" transition-hide="jump-up" options-cover style="width:100%">
                            <template v-slot:append >
                            <q-icon name="label" :color="(label!=null ? $props.modecolor:'')" />
                            </template>
                            <template v-slot:selected-item="scope">
                                <q-chip v-show="scope.opt.length>0" removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex" color='grey-3' :text-color="$props.modecolor" class="q-ma-none truncate-chip-labels">
                                    {{ scope.opt }}
                                </q-chip>
                            </template>
                        </q-select>
                    </div>
                </div>
            </q-item-label>
        </q-item-section>
        <q-item-section top side class="gt-sm">
            <div class="text-grey-8 q-gutter-xs select-block" >
                <q-select v-show="!(data.author=='alert')" outlined :color="(label!=null ? $props.modecolor : '')" :label-color="(label!=null ? $props.modecolor:'')" v-model="label" @input="updateData()" :options="$store.getters.firstMsgLabel.item.values" :label="toUpper($store.getters.firstMsgLabel.key)" transition-show="jump-up" transition-hide="jump-up" options-cover class="select-block">
                    <q-tooltip :delay="200" style="width:50px">{{$store.getters.firstMsgLabel.item.description}}</q-tooltip>
                    <template v-slot:append >
                        <q-icon name="label" :color="(label!=null ? $props.modecolor:'')" />
                    </template>
                    <template v-slot:selected-item="scope">
                        <q-chip v-show="scope.opt.length>0" removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex" color='grey-3' :text-color="$props.modecolor" class="q-ma-none truncate-chip-labels">
                            {{ scope.opt }}
                        </q-chip>
                    </template>
                </q-select>
            </div>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: 'message',
    props: ['mode', 'data', 'parentUpdateMessage', 'index', "modecolor"],
    data(){
        return {
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            label: this.$props.data.labels[ this.$store.getters.firstMsgLabel.key ],
            messageData: this.$props.data
        }
    },
    computed: {
        modeicon: function() {
            if (this.$store.getters.getAuthorsIcons.hasOwnProperty(this.$props.data.author)) return this.$store.getters.getAuthorsIcons;
            else {
                var res = {}; res[this.$props.data.author] = "account_circle";
                return res;
            }
        }
    },
    mounted(){},
    methods: {
        updateData() {
            this.messageData.labels[ this.$store.getters.firstMsgLabel.key ] = this.label;
            this.$props.parentUpdateMessage(this.$props.index, this.messageData);
        },
        toUpper(str) {
            return str[0].toUpperCase() + str.substring(1);
        }
    }
}
</script>

<style lang="stylus" scoped>
.select-block{
    width: 20vw;
}
</style>
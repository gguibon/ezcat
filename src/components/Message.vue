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
                        <div v-for="msglabel, msglabelkey of $store.getters.getMsgLabels" :key="msglabelkey" class="text-grey-8 q-gutter-xs truncate-chip-labels" >
                            <div v-if="msglabel.type == 'listselect'">
                                <q-select v-show="!(data.author=='alert')" outlined :color="(label!=null ? $props.modecolor : '')" :label-color="(label!=null ? $props.modecolor:'')" v-model="label[msglabelkey]" @input="updateData()" :options="msglabel.values" :label="toUpper(msglabelkey)" transition-show="jump-up" transition-hide="jump-up" options-cover class="select-block" multiple>
                                    <q-tooltip :delay="200" style="width:50px">{{msglabel.description}}</q-tooltip>
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
                            <div v-else>
                                <strong>{{msglabelkey}}:</strong>
                                <q-chip 
                                    v-for="val in msglabel.values"
                                    :key="msglabelkey+val" clickable size="sm" dense
                                    :color="(isSelected(msglabelkey, val) ? $props.modecolor : '')" 
                                    :text-color="(isSelected(msglabelkey, val) ? 'white' : 'dark-grey')"
                                    :label="val"
                                    :selected="isSelected(msglabelkey, val)"
                                    @click="selectLabel(msglabelkey, val)"
                                >
                                <q-tooltip>{{val}} </q-tooltip>
                                </q-chip>
                            </div>
                        </div>
                    </div>
                </div>
            </q-item-label>
        </q-item-section>
        <q-item-section top side class="gt-xs col-7">
            <div v-for="msglabel, msglabelkey of $store.getters.getMsgLabels" :key="msglabelkey" class="text-grey-8 q-gutter-xs select-block truncate-chip-labels" >
                <div v-if="msglabel.type == 'listselect'">
                    <q-select v-show="!(data.author=='alert')" outlined :color="(label!=null ? $props.modecolor : '')" :label-color="(label!=null ? $props.modecolor:'')" v-model="label[msglabelkey]" @input="updateData()" :options="msglabel.values" :label="toUpper(msglabelkey)" transition-show="jump-up" transition-hide="jump-up" options-cover class="select-block" multiple>
                        <q-tooltip :delay="200" style="width:50px">{{msglabel.description}}</q-tooltip>
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
                <div v-else>
                    <strong>{{msglabelkey}}:</strong>
                    <q-chip
                        v-for="val in msglabel.values"
                        :key="msglabelkey+val" clickable size="sm" dense
                        :color="(isSelected(msglabelkey, val) ? $props.modecolor : '')" 
                        :text-color="(isSelected(msglabelkey, val) ? 'white' : 'dark-grey')"
                        :label="val"
                        :selected="isSelected(msglabelkey, val)"
                        @click="selectLabel(msglabelkey, val)"
                    >
                    <q-tooltip>{{val}} </q-tooltip>
                    </q-chip>
                </div>
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
            label: this.$props.data.labels,
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
    beforeMount(){
        // fix missing empty values in case there is a mismatch between the input file and the annotation scheme
        for(const key in this.$store.getters.getMsgLabels){
            if(!this.label.hasOwnProperty(key)){
                this.label[key] = [];
            }else if (this.label[key] == null){
                this.label[key] = [];
            }else if (typeof(this.label[key]) == "string"){
                this.label[key] = [this.label[key]]; // change previous string version to array
            }
        }
    },
    methods: {
        selectLabel(key, val) {
            if(!this.label.hasOwnProperty(key)){
                this.label[key] = [];
            }
            if(this.label[key].includes(val)){
                this.label[key] = this.label[key].filter(e => e !== val);
            }else{
                this.label[key].push(val);
            }
            this.messageData.labels = this.label;
            this.$props.parentUpdateMessage(this.$props.index, this.messageData);
            this.$forceUpdate(); // workaround due to non reactivity trigger on the second label type @tofix
        },
        isSelected(key, val){
            return this.label[key].includes(val);
        },
        updateData() {
            // this.messageData.labels[ this.$store.getters.firstMsgLabel.key ] = this.label;
            // this.$props.parentUpdateMessage(this.$props.index, this.messageData);
            this.messageData.labels = this.label;
            this.$props.parentUpdateMessage(this.$props.index, this.messageData);
            this.$forceUpdate();
        },
        toUpper(str) {
            return str[0].toUpperCase() + str.substring(1);
        }
    }
}
</script>

<style lang="stylus" scoped>
.select-block{
    width: 50vw;
}
.truncate-chip-labels > .q-chip {
  max-width: 100px;
}
</style>
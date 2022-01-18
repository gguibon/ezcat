<template>
    <div>
        <div v-if="$props.labelInfo.type == 'listselect'">
            <q-select clearable options-cover v-model="label" @input="setValue()" :options="$props.labelInfo.values" :label="$props.labelInfo.title" transition-show="jump-up" transition-hide="jump-up" style="width: 100%; height: 25vh;"  color="positive" filled >
                <template v-slot:append >
                <q-icon name="label" />
                </template>
                <q-tooltip :delay="200">{{$props.labelInfo.description}}</q-tooltip>
            </q-select>
        </div>
        <div v-else-if="$props.labelInfo.type == 'radiobtn'">
            <span class="text-blue-grey-8">{{$props.labelInfo.title}}</span>
            <q-option-group v-model="label" @input="setValue()" :options="$props.labelInfo.values" color="positive" inline style="width: 100%; height: 12vh;" />
            <q-tooltip :delay="200">{{$props.labelInfo.description}}</q-tooltip>
        </div>
        <div v-else-if="$props.labelInfo.type == 'boolean'">
            <span class="text-blue-grey-8">{{$props.labelInfo.title}}</span>
            <q-toggle v-model="label" @input="setValue()" :label="boolToText(label)" style="width: 100%; height: 12vh;" checked-icon="check" unchecked-icon="clear" ></q-toggle>
            <q-tooltip :delay="200">{{$props.labelInfo.description}}</q-tooltip>
        </div>
        <div v-else>
            <q-banner class="bg-grey-3">
                <template v-slot:avatar>
                    <q-icon name="warning" color="primary" />
                </template>
                Settings for this conversation-level {{$props.labelName}} label are ill-defined.
                <template v-slot:action>
                    <q-btn flat color="primary" label="Go to Settings" to="/settings"/>
                </template>
            </q-banner>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: ["chatData", "labelInfo", "labelName", "parentUpdateConvLabel"],
    data(){
        return {
            label: null,
        }
    },
    computed: {
    },
    mounted(){
        this.label = this.chatData[this.$props.labelName];
    },
    methods: {
        boolToText(val){
            if (val){ return 'yes'; }
            else {return 'no';}
        },
        setValue(){
            this.$props.chatData[this.$props.labelName] = this.label;
            this.$props.parentUpdateConvLabel(this.$props.labelName, this.label);
        },
    }
}
</script>
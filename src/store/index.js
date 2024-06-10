import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import VueCookies from 'vue-cookies';
// VueCookies.config('7d');
// Vue.use(VueCookies);

import { Notify } from 'quasar'

import { i18n } from 'src/boot/i18n'


export default new Vuex.Store({
    state: {
        user: {as_json: null, auth_provider: null, created_date: null, family_name: null, first_name: null, get_id: null, get_or_create: null, id: null, is_active: false, is_anonymous: true, is_authenticated: false, last_seen: null, make_unique_nickname: null, make_valid_nickname: null, picture_url: null, query: null, query_class: null, super_admin: false, username: null},
        chats: null,
        defaultAuthorIcon: {"default": "account_circle"},
        defaultAuthorColors: ["blue", "cyan", "purple"],
        config: localStorage.hasOwnProperty('ezcat_config') ? JSON.parse(localStorage.getItem('ezcat_config')) : {
            authorColorMap: { 'operator':'purple', 'customer':'cyan', 'alert':'black'},
            authorIconMap: {'operator':'verified', 'customer':'account_circle', 'alert':'feedback'},
            msgLabels: {
                emotion: {
                    title: "Emotion",
                    description: "Main emotion for this message.",
                    mandatory: true,
                    type: 'chip',
                    // values: ['Surprise', 'Amusement', 'Satisfaction', 'Soulagement', 'Neutre', 'Peur', 'Tristesse', 'Déception', 'Colère', 'Frustration']
                    values: ['Surprise', 'Amusement', 'Satisfaction', 'Relief', 'Neutral', 'Fear', 'Sadness', 'Disappointment', 'Anger', 'Frustration']
                },
                intent: {
                    title: "intent",
                    description: "intent values",
                    mandatory: true,
                    type: "chip",
                    values: ["Purchase", "Downgrade", "Unsubscribe", "Demo Request"]
                }
            },
            chatLabels: {
                problemStatus: {
                    title: "Pick an overall problem status for this chat",
                    description: "Status of the problem at the end of the conversation.",
                    mandatory: true,
                    type: 'listselect',
                    // values: ['Avortée', 'Résolu', 'À tester', 'Hors Périmètre', 'Pas de solution'],
                    values: ['Aborted', 'Solved', 'To be tested', 'Out-of-scope', 'No Solution'],
                },
                customerSentiment: {
                    title: "Pick the customer satisfaction",
                    description: "Estimated satisfaction of the customer at the end of conversation.",
                    mandatory: true,
                    type: 'radiobtn',
                    values: [
                        { label: '-3', value: '-3' },
                        { label: '-2', value: '-2' },
                        { label: '-1', value: '-1' },
                        { label: '0', value: '0' },
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' }
                    ]
                },
                emergency: {
                    title: "Emergency context?",
                    description: "Specifies if this conversation seems to be made in an emergency context.",
                    mandatory: true,
                    type: 'boolean',
                    values: null
                }
            }
        },
        todoMode: false
    },
    mutations: {
        set_chats(state, payload){
            state.chats = payload;
        },
        /**
         * 
         * @param {*} state 
         * @param {*} payload has to be a chat object (from Object.entries() over chats)
         */
        update_chat(state, payload){
            state.chats[payload.id] = payload;
        },
        toggle_todo(state){
            state.todoMode = !state.todoMode;
        },
        update_config(state, payload){
            state.config = payload;
        }
    },
    actions: {
        setChats({commit}, chats){
            commit('set_chats', chats);
        },
        setChatsFromWhatsapp({commit, getters}, content){
            content = content.split('\n');
            var messages = [];
            var authorsSet = new Set();
            
            for (const line of content) {
                if (line == '') { continue; }
                var datetime = line.split(' - ')[0];
                if (line.split(' - ')[1].includes(':')) {
                    var author = line.split(' - ')[1].split(': ')[0];
                    var text = line.split(' - ')[1].split(': ')[1];
                    var nbWords = text.split(' ').length;
                    var labels =  {};
                    labels[getters.firstMsgLabel.key] = null;
                    messages.push({"time": datetime, "text": text, "author": author, "nbWords": nbWords, "labels": labels });
                    authorsSet.add(author);
                }
            }

            var conv_name = Array.from(authorsSet).join(' & ');
            
            var newdata = {"id":conv_name, "done": false, "datetime": "unk", "duration": "unk", "messages": messages, "labels": {}, "nbMessages": messages.length, "nbMessagesPerSpeakingSlot": null, "nbWords": null, "realDuration": "unk", "speakingSlots": []};
            
            for (var name of getters.getChatLabelNames) newdata["labels"][name] = null;
            
            var nbWords = 0;
            for (var msg in messages) { nbWords += msg.nbWords; }
            newdata["nbWords"] = nbWords;

            newdata["wordsPerMessage"] = newdata.nbWords / newdata.messages.length;

            var data_to_send = {}; data_to_send[conv_name] = newdata;
            commit('set_chats', data_to_send);
        },
        setChatsFromTelegram({commit, getters}, content){
            var parser = new DOMParser();
            var doc = parser.parseFromString(content, "text/html");
            var nodesSnapshot = document.evaluate('//div[contains(@class,\'message\') and not(contains(@class,\'service\'))]', doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            var msn_list = [];
            for ( var i = 0; i < nodesSnapshot.snapshotLength; i++ ) msn_list.push( nodesSnapshot.snapshotItem(i).textContent.trim() );

            var memo = {'author':null,'time':null,'text':null};
            var messages = [];
            var authorsSet = new Set();
            var idByIndex = 0;
            for (var msn of msn_list) {
                msn = msn.replace(/\s\s+/g,'\n').split('\n');
                var res = {};
                if (msn.length == 2){
                    res = {'time':msn[0], 'author':memo['author'], 'text': msn.slice(1).join(' ')};
                }else {
                    if (msn[3] == "In reply to this message") { msn.splice(3, 1); }
                    res = {'time':msn[1], 'author':msn[2], 'text':msn.slice(3).join(' ')};
                    memo = res;
                }
                var labels =  {};
                labels[getters.firstMsgLabel.key] = null;
                messages.push({"time": res['time'], "text": res['text'], "author": res['author'], "nbWords": res['text'].split(' ').length, "labels": labels });
                authorsSet.add(res['author']);
            }

            var conv_name = Array.from(authorsSet).join(' & ');

            var newdata = {"id":conv_name, "done": false, "datetime": "unk", "duration": "unk", "messages": messages, "labels": {}, "nbMessages": messages.length, "nbMessagesPerSpeakingSlot": null, "nbWords": null, "realDuration": "unk", "speakingSlots": []};
            
            for (var name of getters.getChatLabelNames) newdata["labels"][name] = null;
            
            var nbWords = 0;
            for (var msg in messages) { nbWords += msg.nbWords; }
            newdata["nbWords"] = nbWords;

            newdata["wordsPerMessage"] = newdata.nbWords / newdata.messages.length;

            var data_to_send = {}; data_to_send[conv_name] = newdata;
            commit('set_chats', data_to_send);
        },
        updateChat({commit}, chat){
            commit('update_chat', chat);
        },
        toggleTodo({commit}){
            commit('toggle_todo');
        },
        updateConfig({commit}, config){
            commit('update_config', config);
        }
    },
    getters: {
        getChats: state => state.chats,
        getConfig: state => state.config,
        getMsgLabels: state => state.config.msgLabels,
        getChatLabels: state => state.config.chatLabels,
        getTodoMode: state => state.todoMode,
        firstMsgLabel: state => {
            var entries = Object.entries(state.config.msgLabels)[0]
            var msgLabel = { key: entries[0], item: entries[1]};
            return msgLabel;
        },
        getChatLabelNames: state => {
            var names = [];
            for (var item in state.config.chatLabels) {
                names.push(item);
            }
            return names;
        },
        getMandatoryChatLabelNames: state => {
            var names = [];
            for (var item in state.config.chatLabels) {
                if(state.config.chatLabels[item].mandatory == true) { names.push(item) }
            }
            return names;
        },
        getAuthorsIcons: state => {
            if (state.config.hasOwnProperty("authorIconMap")) return state.config.authorIconMap;
            else return state.defaultAuthorIcon;
        },
        getAuthorsColors: state => {
            if (state.config.hasOwnProperty("authorColorMap")) return state.config.authorColorMap;
            else return state.defaultAuthorColors;
        }
    }
})
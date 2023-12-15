<template>
	<q-page-container style="padding: 0px">
		<q-page class="flex items-center justify-center full-width">
			<q-card flat>
				<q-card-section>
					<div class="column items-center ">
						<img alt="EZCAT" src="img/warwick_logo.png" class="brandinglogo q-mb-sm" />
					</div>
				</q-card-section>

				<q-card-section>
					<div class="text-center text-bold text-blue-grey-10 text-h4">VAWG Chat Annotation Tool
					</div>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn id="start" to="/hub" color="purple" size="lg" padding="sm" no-caps
						:ripple="{ center: true }">Start Annotating</q-btn>
				</q-card-actions>
			</q-card>
		</q-page>
	</q-page-container>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/mode/python/python.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import { copyToClipboard } from 'quasar';

export default {
	name: "HomePage",
	components: { codemirror },
	data() {
		return {
			jsonexample: JSON.stringify({ "yourlabelname": { "title": "mysuperlabel", "description": "this label does this", "mandatory": true, "type": "listselect", "values": ["value1", "value2", "valueN"] } }, null, 1),
			cmOption: {
				tabSize: 1,
				styleActiveLine: false,
				lineNumbers: false,
				lineWrapping: true,
				line: false,
				mode: 'python',
				theme: 'eclipse',
			},
			bibtex: `
@inproceedings{guibon-2022-ezcat,
    title = "EZCAT: an Easy Conversation Annotation Tool",
    author = {Guibon, Ga{\"e}l  and
      Labeau, Matthieu  and
      Lefeuvre, Luce  and
      Clavel, Chlo{\'e}},
    booktitle = "Proceedings of the 13th Language Resources and Evaluation Conference",
    month = june,
    year = "2022",
    address = "Marseille, France",
    publisher = "European Language Resources Association",
    abstract = "Users generate content constantly, leading to new data requiring annotation. Among this data, textual conversations are created every day and come with some specificities: they are mostly private through instant messaging applications, requiring the conversational context to be labeled. These specificities led to several annotation tools dedicated to conversation, and mostly dedicated to dialogue tasks, requiring complex annotation schemata, not always customizable and not taking into account conversation-level labels. In this paper, we present EZCAT, an easy-to-use interface to annotate conversations in a two-level configurable schema, leveraging message-level labels and conversation-level labels at once. Our interface is characterized by the voluntary absence of a server and accounts management, enhancing its availability to anyone, and the control over data, which is crucial to confidential conversations. We also present our first usage of EZCAT along with our annotation schema we used to annotate confidential customer service conversations. EZCAT is freely available at https://gguibon.github.io/ezcat",
    language = "English",
}
`
		}
	},
	methods: {
		onFileLoaded() {
			this.$emit("file-loaded");
		},
		clipboard(text) {
			copyToClipboard(text)
				.then(() => {
					this.$q.notify({
						message: "Copied to clipboard",
						color: 'positive',
						position: 'top-right'
					})
				})
				.catch(() => {
					this.$q.notify({
						message: "Failed to copy to clipboard",
						color: 'negative',
						position: 'top-right'
					})
				})
		}
	},
};
</script>

<style scoped>
.brandinglogo {
	height: 8vw;
}

.bg-white2 {
	background-color: #f5f5f5;
}

.hoverlight:hover {
	filter: brightness(150%);
}
</style>

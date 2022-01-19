<template>
	<q-page-container>
		<q-page class="flex flex-center">
			<div class="q-pa-md full-width" >
				
				<q-card flat>
					<q-card-section>
						<div class="text-center">
							<img alt="EZCAT" src="img/ezcat_logo.png" class="brandinglogo" />
						</div>
					</q-card-section>

					<q-card-section>
						<div class="text-center text-bold text-blue-grey-8 text-h4">EZCAT: an Easy Conversation Annotation Tool</div>
					</q-card-section>

					<q-card-actions align="center">
						<q-btn id="start" rounded to="/hub" color="positive" no-caps>START</q-btn>
					</q-card-actions>
				</q-card>

				<q-space/>

				<q-card flat >
					<q-card-section class="row">
						<q-card flat class="col full-width" >
							<q-card-section>
								<div class="text-h4 text-blue-grey-10 text-bold">
									How to use?
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>

					<q-card-section class="row">
						<q-card flat class="col bg-white2 full-width">
							<q-card-section horizontal>
								<q-card-section vertical class="col-12 col-md-6">
									<q-card-section>
									<div class="text-h5 text-blue-grey-10 text-bold">
										<q-chip color="primary" text-color="white" label="Step 1" /> Import Whatsapp or Telegram conversations.
									</div>
									<div class="text-subtitle2">
										Or use our JSON data format.
									</div>
									</q-card-section>

									<q-card-section>
									<div class="text-justify text-body1">
										EZCAT can handle conversations from instant messaging applications. The data will be formatted into our JSON representation.
									</div>
									</q-card-section>
								</q-card-section>
								<div class="col"></div>
								<div class="col col-md-5">
									<q-img src="img/ezcat_upload.png" spinner-color="primary" class="rounded-borders" fit="contain" />
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>
			
					<q-space/>
			
					<q-card-section class="row">
						<q-card flat class="col bg-white2 full-width" >
							<q-card-section horizontal>
								<q-card-section vertical class="col-12 col-md-6">
									<q-card-section>
									<div class="text-h5 text-blue-grey-10 text-bold">
										<q-chip color="primary" text-color="white" label="Step 2" /> Configure the labels.
									</div>
									<div class="text-subtitle2">
										By considering message-level labels and conversation-level labels.
									</div>
									</q-card-section>

									<q-card-section>
									<div class="text-justify text-body1">
										Two fields are considered: "msgLabels" for message-level labels and "chatLabels" for conversation-level labels.
										Just add one or several keys which contain the following fields: "title", "description", "mandatory", "type", "values".
										<codemirror v-model="jsonexample" :options="cmOption" ></codemirror>
									</div>
									</q-card-section>
								</q-card-section>
								<div class="col"></div>
								<div class="col col-md-5">
									<q-img src="img/ezcat_settings_mobile.png" spinner-color="primary" :ratio="16/9" class="rounded-borders" fit="contain" />
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>

					<q-space/>

					<q-card-section class="row">
						<q-card flat class="col bg-white2 full-width" >
							<q-card-section horizontal>
								<q-card-section vertical class="col-12 col-md-6">
									<q-card-section>
									<div class="text-h5 text-blue-grey-10 text-bold">
										<q-chip color="primary" text-color="white" label="Step 3" /> Annotate.
									</div>
									<div class="text-subtitle2">
										Annotate your conversations message per message, then for the whole conversation.
									</div>
									</q-card-section>

									<q-card-section>
									<div class="text-justify text-body1">
										You can only consider message-level annotation or conversation-level labels, and even constrain a specific order.
										Authors' colors and icons can be customized to ease message sender recognition.
									</div>
									</q-card-section>
								</q-card-section>
								<div class="col"></div>
								<div class="col col-md-5">
									<q-img src="img/ezcat_msg_mobile.png" spinner-color="primary" :ratio="16/9" class="rounded-borders" fit="contain" />
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>

					<q-space/>

					<q-card-section class="row">
						<q-card flat class="col bg-white2 full-width" >
							<q-card-section horizontal>
								<q-card-section vertical class="col-12 col-md-6">
									<q-card-section>
									<div class="text-h5 text-blue-grey-10 text-bold">
										<q-chip color="primary" text-color="white" label="Step 4" /> Export the corpus.
									</div>
									<div class="text-subtitle2">
										The corpus will be save as a JSON file.
									</div>
									</q-card-section>

									<q-card-section>
									<div class="text-justify text-body1">
										You can import the exported JSON file later on, to continue the annotation process. 
									</div>
									</q-card-section>
								</q-card-section>
								<div class="col"></div>
								<div class="col col-md-5">
								
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>
				</q-card>

				<q-space/>

				<q-card flat >
					<q-card-section class="row">
						<q-card flat class="col full-width" >
							<q-card-section>
								<div class="text-h6 text-blue-grey-10 text-bold">
									<span class="text-h4">Authors: </span> <a href="https://gguibon.github.io/" target="_blank">Gaël Guibon</a>, <a href="https://www.linkedin.com/in/luce-lefeuvre-b1753020?originalSubdomain=fr" target="_blank">Luce Lefeuvre</a>, <a href="https://www.telecom-paris.fr/matthieu-labeau" target="_blank">Matthieu Labeau</a>, <a href="https://clavel.wp.imt.fr/" taget="_blank">Chloé Clavel</a>
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>

					<q-card-section class="row wrap">
						<q-card flat class="col">
							<q-card-section horizontal class="row wrap q-gutter-xs">
								<div class="col hoverlight">
									<a href="https://www.sncf.com/en/innovation-development/innovation-research" target="_blank"><img src="img/sncf_logo.svg" style="max-width:100%" /></a>
								</div>
								<div class="col text-h5 text-blue-grey-10 text-bold hoverlight">
									<a href="https://www.telecom-paris.fr/en/home" target="_blank"><img  src="img/telecomparis_logo.svg" style="max-width:100%"/></a>
								</div>
								<div class="col text-h5 text-blue-grey-10 text-bold">
									<img src="img/oui_logo.png" style="max-width:100%"/>
								</div>
								<div class="col text-subtitle2">
									<a href="https://datascienceandai.wp.imt.fr/en/home-2/" taget="_blank">DSAIDIS Chair</a>
								</div>
								<div class="col text-subtitle2 hoverlight">
									<a href="https://anr.fr/Project-ANR-17-CE33-0003" taget="_blank"><img src="img/anr-logo-2021.png" style="max-width:100%"/></a>
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>

					<q-card-section class="row">

					</q-card-section>

				</q-card>

			</div>
		</q-page>
	</q-page-container>
</template>

<script>

import { codemirror } from "vue-codemirror";
import "codemirror/mode/python/python.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";

export default {
  name: "HomePage",
  components: {codemirror},
  data() {
	  return {
		jsonexample: JSON.stringify({"yourlabelname": {"title": "mysuperlabel", "description": "this label does this", "mandatory":true, "type": "listselect", "values": ["value1", "value2", "valueN"]}}, null, 1),
		cmOption: {
			tabSize: 1,
			styleActiveLine: false,
			lineNumbers: false,
			lineWrapping: true,
			line: false,
			mode: 'python',
			theme: 'eclipse',
		},
	  }
  },
  methods: {
	onFileLoaded() {
	  this.$emit("file-loaded");
	},
  },
};
</script>

<style scoped>
.brandinglogo {
  height: 6vw;
}
@media only screen and (max-width: 768px) {
  .brandinglogo {
    height: 14vw;
  }
}
.bg-white2 {
	background-color: #f5f5f5;
}
.hoverlight:hover {
	filter: brightness(150%);
}
</style>

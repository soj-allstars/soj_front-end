<template>
    <v-content
            fluid
            no-gutters
    >
        <v-row
                align='center'
                justify='center'
        >
            <v-col cols='8' align="center">
                <v-card class='pa-10'>
                    <v-row>
                        <v-col cols='5'>
                            <v-text-field
                                    v-model="pid"
                                    label='ProlbemNo.'
                            ></v-text-field>
                        </v-col>
                        <v-spacer/>
                        <v-col cols='5'>
                            <v-select
                                    :items="languages"
                                    v-model="selected_lang"
                                    item-text="lang"
                                    item-value="lang_id"
                                    label="Language"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                    outlined
                                    name="code"
                                    label="code"
                                    placeholder="Input your code here..."
                                    v-model="code"
                            >
                            </v-textarea>
                            <!-- 用于调试 -->
                            <!-- <div>{{code}}</div> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input
                                    label="Or you can upload your code file here"
                                    show-size
                                    @change="code_file_uploaded"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col align='start' cols="12">
                            <div class='caption'>* File will be sent if both file and code text are provided</div>
                            <div class='caption'>* 如果同时填写文本框和上传文件，则会以文件为准</div>
                        </v-col>
                    </v-row>

                    <v-row justify='center'>
                        <v-col align='center'>
                            <v-btn link @click.stop="submit_code"
                                   block color="light-blue darken-3" class="button_font white_font">
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    import { lang_backend_mapping } from "../lib/lang_common";
    export default {
        data : function () {
            return {
                selected_lang: '',
                code: '',
                file_code: '',
                // v-select里的表项
                languages : lang_backend_mapping,
            }
        },
        props: [ "pid" ],
        watch: {
            selected_lang: function() {
                let thisCom = this;
                localStorage.setItem('submit_lang', thisCom.selected_lang);
            },
        },
        methods: {
            check_integrity_and_return_code: function() {
                let code = '';
                if (this.file_code) {
                    code = this.file_code;
                }
                else if (this.code) {
                    code = this.code;
                }
                else {
                    alert('code is empty!');
                    return;
                }

                if (!this.selected_lang) {
                    alert('plz select language');
                    return;
                }
                return code;
            },
            submit_code: function() {
                let code = this.check_integrity_and_return_code();
                let data_for_submit = {
                    pid: this.pid,
                    code: code,
                    lang: this.selected_lang,
                };
                this.$emit("submit", data_for_submit);
            },
            code_file_uploaded: function (e) {
                let thisCom = this;
                // 今日惨痛教训：读文件要用JS的File API以及FileReader
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    // Great success! All the File APIs are supported.
                    let reader = new FileReader();
                    reader.readAsText(e);
                    reader.onload = function() {
                        thisCom.file_code = this.result;
                    }
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }
            }
        },
        beforeMount: function () {
            let last_lang = localStorage.getItem('submit_lang');
            if (last_lang) {
                this.selected_lang = last_lang;
            }
        },

    }
</script>

<style scoped>
    .button_font {
        font-weight: 500;
    }
    .white_font {
        color: white;
    }
</style>
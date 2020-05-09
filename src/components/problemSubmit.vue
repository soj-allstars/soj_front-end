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
                pid: -1,
                selected_lang: '',
                code: '',
                file_code: '',
                // v-select里的表项
                languages : lang_backend_mapping,
            }
        },
        watch: {
            selected_lang: function() {
                let thisCom = this;
                localStorage.setItem('submit_lang', thisCom.selected_lang);
            },
        },
        methods: {
            submit_code: function() {
                let submission_id = -1;
                let thisCom = this;
                let code = '';
                if (thisCom.file_code) {
                    code = thisCom.file_code;
                }
                else if (thisCom.code) {
                    code = thisCom.code;
                }
                else {
                    alert('code is empty!');
                    return;
                }
                
                if (!thisCom.selected_lang) {
                    alert('plz select language');
                    return;
                }
                
                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/submission/',
                    //POST里面的data
                    dataType: 'json',
                    data: {
                        pid: thisCom.pid,
                        code: code,
                        lang: thisCom.selected_lang
                    },
                    //请求成功
                    success : function(result) {
                        submission_id = result.submission_id;
                        thisCom.$router.push({
                            name: 'normalSubmitRes',
                            params: {
                                hlid: result.submission_id, // 高亮提交的那一行
                            }
                        })
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                      console.error(e.status);
                      console.error(e.responseText);
                      alert(e.responseText);
                    },
                    
                });
            },
            code_file_uploaded: function (e) {
                let thisCom = this;
                
                // 今日惨痛教训：读文件要用JS的File API以及FileReader
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    // Great success! All the File APIs are supported.
                    var reader = new FileReader();
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
            this.pid = this.$route.query.pid;
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
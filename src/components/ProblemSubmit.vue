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
                             label="language"
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
                             placeholder="input your code here..."
                             v-model="code"
                            >
                            </v-textarea>
                            {{code}}
                            <!-- 用于调试 -->
                            <!-- <div>{{code}}</div> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input
                             label="or you can upload your code file here"
                             show-size
                             @change="code_file_uploaded"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col align='start' cols="12">
                            <div class='caption'>*file will be sent if both file and code text are provided</div>
                            <div class='caption'>*如果同时填写文本框和上传文件，则会以文件为准</div>
                        </v-col>
                    </v-row>
                    
                    <v-row justify='center'>
                        <v-col align='center'>
                            <v-btn link @click.stop="submit_code"
                             block color="light-blue darken-3" class="button_font white_font">
                                提交
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    export default {
        data : function () {
            return {
                pid: -1,
                selected_lang: '',
                code: '',
                file_code: '',
                // v-select里的表项
                languages : [
                    {
                        lang: "g++",
                        lang_id: "GXX"
                    },
                    {
                        lang: "gcc",
                        lang_id: "GCC"
                    },
                    {
                        lang: "java",
                        lang_id: "Java"
                    },
                    {
                        lang: "python(cpython)",
                        lang_id: "CPY"
                    },
                    {
                        lang: "go",
                        lang_id: "Go"
                    },
                    {
                        lang: "Javascript",
                        lang_id: "JavaScript"
                    }
                ],
                
                
            }
        },
        methods: {
            // 函数
            getCookie: function(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        // console.log(cookie);
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            },
            submit_code: function() {
                
                var submission_id = -1;
                var thisCom = this;
                var code = '';
                if (thisCom.file_code) {
                    code = thisCom.file_code;
                    console.log("code_file:\n'" + code + "'\n");
                }
                else if (thisCom.code) {
                    code = thisCom.code;
                    console.log("code_text:\n'" + code + "'\n");
                }
                else {
                    alert('code is empty!');
                    return;
                }
                
                console.log("pid:\n" + thisCom.pid);
                console.log("code:\n" + code);
                console.log("lang:\n" + thisCom.selected_lang)
                
                
                // 之前为了跨域提交而用的代码，现在用nginx反向代理解决
                // var csrftoken = this.getCookie('csrftoken');
                // console.log(csrftoken);
                
                
                // $.ajaxSetup({
                //     beforeSend: function(xhr, settings) {
                //         console.log(settings.type);
                //         // && !this.crossDomain
                //         if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) ) {
                //             xhr.setRequestHeader("X-CSRFToken", csrftoken);
                //         }
                //     }
                // });
                
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
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    },
                    //请求成功
                    success : function(result) {
                        submission_id = result.submission_id;
                        console.log('==============');
                        console.log(submission_id);
                        console.log(this.data.pid);
                        thisCom.$router.push({
                            name: 'problemSubmitRes',
                            query: {
                                submission_id: submission_id
                            }
                        })
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                      console.log(e.status);
                      console.log(e.responseText);
                      alert('出了点问题，请重新提交。');
                    },
                    
                });
            },
            code_file_uploaded: function (e) {
                var thisCom = this;
                
                // 今日惨痛教训：读文件要用JS的File API以及FileReader
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    // Great success! All the File APIs are supported.
                    var reader = new FileReader();
                    reader.readAsText(e);
                    reader.onload = function() {
                        thisCom.file_code = this.result;
                        // 用于调试
                        // console.log(thisCom.file_code);
                    }
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }
               
            }
        },
        beforeMount: function () {
            this.pid = this.$route.query.pid;
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
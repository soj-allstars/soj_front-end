<template>
    <v-container
     fluid
     no-gutters
    >
        <v-row align="center" justify="center">
            <v-col cols="10">
                <v-card class="pa-10" color="#dddddd">
                    <v-row align="center" justify="center">
                        <v-col cols="10">
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-card tile class="pa-12">
                                        <!--box content begin-->
                                        
                                        <h1 class="display-3 mb-7 font-weight-regular">
                                            Add Problem
                                        </h1>

                                        <h3 class="headline mb-7 font-weight-light tip_font">
                                            * save problem before test!
                                        </h3>
                                        
                                        <v-text-field
                                         outlined
                                         label='Title'
                                         v-model="title"
                                        ></v-text-field>
                                        
                                        <v-textarea
                                          outlined
                                          label="Description"
                                          v-model="description"
                                        ></v-textarea>
                                        
                                        <v-text-field
                                         outlined
                                         label='Note'
                                         v-model="note"
                                        ></v-text-field>
                                        
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                 outlined
                                                 label='Time Limit(ms)'
                                                 v-model="time_limit"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                 outlined
                                                 label='Memory Limit(KB)'
                                                 v-model="memory_limit"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        
                                        <v-card outlined class="pa-5 mb-7">
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                     v-for="(sample_input, i) of sample_inputs"
                                                     v-model="sample_inputs[i]"
                                                     :key="i"
                                                     outlined
                                                     :label="'sample input No.' + i"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="ma-0">
                                                <v-col cols='6'>
                                                    <v-btn @click.stop="add_sample_input" block outlined>
                                                        add sample input
                                                    </v-btn>
                                                </v-col>
                                                <v-col>
                                                    <v-btn @click.stop="pop_sample_input" block outlined>
                                                        reduce sample input
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                        
                                        <v-card outlined class="pa-5 mb-7">
                                            <v-row>
                                                <v-col cols="10">
                                                    <v-btn @click.stop="change_upload_json_type" outlined>
                                                        {{upload_json_btn_text[json_btn_text_index]}}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            
                                            <!-- 上传json文件的输入框 -->
                                            <v-row>
                                                <v-col>
                                                    <v-file-input
                                                     label="upload inputs(JSON) file"
                                                     show-size
                                                     @change="json_file_uploaded"
                                                     v-show="upload_json"
                                                    >
                                                    </v-file-input>
                                                    
                                                    <v-textarea
                                                      outlined
                                                      v-show="!upload_json"
                                                      label="inputs(JSON) content"
                                                      v-model="json_text"
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                        
                                        <v-select
                                            :items="checker_type_items"
                                            v-model="selected_checker_type"
                                            item-text="checker_name"
                                            item-value="checker_value"
                                            label="Checker Type"
                                            outlined
                                        ></v-select>
                                        
                                        <!-- 选择special_judge时要出现的输入框 -->
                                        <v-card outlined class="pa-5 mb-7" v-show='selected_checker_type === "special_judge"'>
                                            <v-row>
                                                <v-col>
                                                    <v-row>
                                                        <v-col cols="6">
                                                            <v-btn @click.stop="change_upload_code_type" outlined>
                                                                {{upload_code_btn_text[code_btn_text_index]}}
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-file-input
                                                             label="upload code file"
                                                             show-size
                                                             v-show="upload_code"
                                                             @change="code_file_uploaded"
                                                            >
                                                            </v-file-input>
                                                            
                                                            <v-textarea
                                                              outlined
                                                              v-show="!upload_code"
                                                              label="code content"
                                                              v-model="code_text"
                                                            ></v-textarea>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                        
                                        
                                        <!-- 上传solution代码 -->
                                        <v-card outlined class="pa-5 mb-7">
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-btn @click.stop="change_upload_solution_type" outlined>
                                                        {{upload_solution_btn_text[solution_btn_text_index]}}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            
                                            <v-row>
                                                <v-col>
                                                    <v-file-input
                                                     label="upload solution file"
                                                     show-size
                                                     v-show="upload_solution"
                                                     @change="solution_file_uploaded"
                                                    >
                                                    </v-file-input>
                                                    
                                                    <v-textarea
                                                      outlined
                                                      v-show="!upload_solution"
                                                      label="solution content"
                                                      v-model="solution_text"
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                        
                                        <v-select
                                         :items="languages"
                                         v-model="selected_lang"
                                         item-text="lang"
                                         item-value="lang_id"
                                         label="Solution Language"
                                        >
                                        </v-select>
                                        
                                        <!-- 存题和测试按钮 -->
                                        <v-row>
                                            <v-col cols="5">
                                                <v-btn block @click.stop="save_problem" class="white_font" color="light-blue darken-3" outlined>
                                                    save problem
                                                </v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn block @click.stop="start_problem_test(problem_id)" outlined>
                                                    test solution and checker
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-text-field
                                                        dense
                                                        outlined
                                                        label='id to be tested'
                                                        v-model="problem_id"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row v-show="problem_id_received">
                                            <v-col>
                                                <h3 class="headline mb-7 pa-5 text-xs-center font-weight-regular white_font green darken-3">
                                                    problem saved, the problem ID is : {{problem_id_from_backend}}
                                                </h3>
                                            </v-col>
                                        </v-row>


                                        <v-row v-show="error_desc">
                                            <v-col class="red lighten-4">
                                                error description: {{error_desc}}
                                            </v-col>
                                        </v-row>

                                        <v-row v-show="solution_received">
                                            <v-col class="light-blue lighten-5">
                                                <v-row>
                                                    <v-col>
                                                        solution result:
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-email-open-outline</v-icon>
                                                        {{verdict}}
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-clock</v-icon>
                                                        {{time_usage}} ms
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-database</v-icon>
                                                        {{memory_usage}} KB
                                                    </v-col>
                                                </v-row>
                                                <v-row v-show="desc">
                                                    <v-col class="light-blue lighten-4">
                                                        description: {{desc}}
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>

                                        <v-row v-show="sp_checker_received">
                                            <v-col class="lime lighten-4">
                                                <v-row>
                                                    <v-col>
                                                        checker result:
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-email-open-outline</v-icon>
                                                        {{sp_checker_verdict}}
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-clock</v-icon>
                                                        {{sp_checker_time_usage}} ms
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <v-icon>mdi-database</v-icon>
                                                        {{sp_checker_memory_usage}} KB
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        
<!--                                        <v-btn block @click.stop="showres" outlined>-->
<!--                                            show data on console-->
<!--                                        </v-btn>-->
<!--                                        <v-btn block @click.stop="test_ws" outlined>-->
<!--                                            test WebSocket-->
<!--                                        </v-btn>-->

                                        <v-row>
                                            <v-col align='start' cols="12">
                                                <div class='caption'>* save problem before test</div>
                                                <div class='caption'>* 一定要先保存问题再进行测试</div>
                                            </v-col>
                                        </v-row>
                                        <!--box content end-->
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: function() {
            return {
                title: '',
                description: '',
                note: '',
                time_limit: 0,
                memory_limit: 0,
                sample_inputs: [""],
                json_file: null,
                json_text: '',
                code_file: null,
                code_text: '',
                solution_file: null,
                solution_text: '',
                
                // json输入框相关
                upload_json_btn_text: ['write inputs(JSON) manually', 'upload inputs(JSON) file'],
                json_btn_text_index: 0,
                upload_json: true,
                
                // checker_type相关
                checker_type_items: [
                    {
                        checker_name: "same",
                        checker_value: "same"
                    },
                    {
                        checker_name: "acmp",
                        checker_value: "acmp"
                    },
                    {
                        checker_name: "caseicmp",
                        checker_value: "caseicmp"
                    },
                    {
                        checker_name: "casencmp",
                        checker_value: "casencmp"
                    },
                    {
                        checker_name: "casewcmp",
                        checker_value: "casewcmp"
                    },
                    {
                        checker_name: "dcmp",
                        checker_value: "dcmp"
                    },
                    {
                        checker_name: "fcmp",
                        checker_value: "fcmp"
                    },
                    {
                        checker_name: "hcmp",
                        checker_value: "hcmp"
                    },
                    {
                        checker_name: "icmp",
                        checker_value: "icmp"
                    },
                    {
                        checker_name: "lcmp",
                        checker_value: "lcmp"
                    },
                    {
                        checker_name: "ncmp",
                        checker_value: "ncmp"
                    },
                    {
                        checker_name: "nyesno",
                        checker_value: "nyesno"
                    },
                    {
                        checker_name: "pointscmp",
                        checker_value: "pointscmp"
                    },
                    {
                        checker_name: "rcmp",
                        checker_value: "rcmp"
                    },
                    {
                        checker_name: "rcmp4",
                        checker_value: "rcmp4"
                    },
                    {
                        checker_name: "rcmp6",
                        checker_value: "rcmp6"
                    },
                    {
                        checker_name: "rcmp9",
                        checker_value: "rcmp9"
                    },
                    {
                        checker_name: "rncmp",
                        checker_value: "rncmp"
                    },
                    {
                        checker_name: "uncmp",
                        checker_value: "uncmp"
                    },
                    {
                        checker_name: "wcmp",
                        checker_value: "wcmp"
                    },
                    {
                        checker_name: "yesno",
                        checker_value: "yesno"
                    },
                    {
                        checker_name: "special_judge",
                        checker_value: "special_judge"
                    }
                ],
                selected_checker_type: null,
                
                // special judge时出现的框相关
                upload_code_btn_text: ['write code manually', 'upload code file'],
                code_btn_text_index: 0,
                upload_code: true,
                
                // solution输入框相关
                upload_solution_btn_text: ['write solution manually', 'upload solution file'],
                solution_btn_text_index: 0,
                upload_solution: true,
                
                // solution_lang选择框相关
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
                selected_lang: '',

                // return
                problem_id: 0,
                problem_id_from_backend: -1,
                problem_id_received: false,

                // test result
                ok_received: false,
                error_desc: "",

                solution_received: false,
                verdict: "NULL",
                time_usage: 0,
                memory_usage: 0,
                desc: "",

                sp_checker_received: false,
                sp_checker_verdict: "NULL",
                sp_checker_time_usage: 0,
                sp_checker_memory_usage: 0,
            }
        },
        methods: {
            change_upload_json_type: function() {
                this.json_btn_text_index = (this.json_btn_text_index + 1) % this.upload_json_btn_text.length;
                this.upload_json = !this.upload_json;
            },
            change_upload_code_type: function() {
                this.code_btn_text_index = (this.code_btn_text_index + 1) % this.upload_code_btn_text.length;
                this.upload_code = !this.upload_code;
            },
            change_upload_solution_type: function() {
                this.solution_btn_text_index = (this.solution_btn_text_index + 1) % this.upload_solution_btn_text.length;
                this.upload_solution = !this.upload_solution;
            },
            read_file: function(f, target) {
                var thisCom = this;
                
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    // Great success! All the File APIs are supported.
                    var reader = new FileReader();
                    reader.readAsText(f);
                    reader.onload = function() {
                        thisCom[target] = this.result;
                    }
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }
            },
            json_file_uploaded: function(f) {
                this.read_file(f, "json_file");
            },
            code_file_uploaded: function(f) {
                this.read_file(f, "code_file");
            },
            solution_file_uploaded: function(f) {
                this.read_file(f, "solution_file");
            },
            
            check_integrity: function() {
                if (!this.title) {
                    alert("title is empty!");
                    return false;
                }
                if (!this.description) {
                    alert("description is empty!");
                    return false;
                }
                if (this.time_limit === 0) {
                    alert("time limit couldn't be 0!");
                    return false;
                }
                if (this.memory_limit === 0) {
                    alert("memory limit couldn't be 0!");
                    return false;
                }
                for (let sample_item of this.sample_inputs) {
                    if (!sample_item) {
                        alert("at least 1 input is empty!");
                        return false;
                    }
                }

                if (this.upload_json) {
                    if (!this.json_file) {
                        alert("inputs(json) file isn't uploaded!");
                        return false;
                    }

                } else {
                    if (!this.json_text) {
                        alert("inputs(json) is empty!");
                        return false;
                    }
                }
                if (!this.selected_checker_type) {
                    alert("checker type is not selected!");
                    return false;
                }
                if (this.selected_checker_type === "special_judge") {
                    if (this.upload_code) {
                        if (!this.code_file) {
                            alert("code file isn't uploaded!");
                            return false;
                        }
                    } else {
                        if (!this.code_text) {
                            alert("code is empty!");
                            return false;
                        }
                    }
                }
                if (this.upload_solution) {
                    if (!this.solution_file) {
                        alert("solution file is not uploaded!");
                        return false;
                    }
                } else {
                    if (!this.solution_text) {
                        alert("solution is empty!");
                        return false;
                    }
                }
                if (!this.selected_lang) {
                    alert("language is not selected!");
                    return false;
                }

                // pass the check
                return true;
            },
            
            // functions for buttons
            
            add_sample_input: function() {
                this.sample_inputs.push('');
            },
            pop_sample_input: function() {
                this.sample_inputs.pop();
            },
            
            save_problem: function() {
                if(!this.check_integrity()) {
                    return;
                }
                let thisCom = this;
                let inputs = '';
                let checker_code = '';
                let solution = '';

                if (this.upload_json) {
                    inputs = this.json_file;
                } else {
                    inputs = this.json_text;
                }
                if (this.selected_checker_type === "special_judge") {
                    if (this.upload_code) {
                        checker_code = this.code_file;
                    } else {
                        checker_code = this.code_text;
                    }
                }
                if (this.upload_solution) {
                    solution = this.solution_file;
                } else {
                    solution = this.solution_text;
                }

                // 用于跨域
                var csrftoken = this.getCookie('csrftoken');
                console.log("csrftoken:\n" + csrftoken);

                $.ajaxSetup({
                    beforeSend: function(xhr, settings) {
                        console.log(settings.type);
                        // && !this.crossDomain
                        if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) ) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    }
                });

                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/problem/save/',
                    //POST里面的data
                    data: {
                        title: thisCom.title,
                        description: thisCom.description,
                        time_limit: thisCom.time_limit,
                        memory_limit: thisCom.memory_limit,
                        note: thisCom.note,
                        sample_inputs: JSON.stringify(thisCom.sample_inputs),
                        checker_type: thisCom.selected_checker_type,
                        checker_code: checker_code,
                        inputs: inputs,
                        solution_code: solution,
                        solution_lang: thisCom.selected_lang,
                    },
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    //请求成功
                    success : function(result) {
                        console.log('==============');
                        thisCom.problem_id_from_backend = result.problem_id;
                        thisCom.problem_id_received = true;
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        console.log(e.status);
                        console.log(e.responseText);
                        alert(e.responseText);
                    },
                });
            },


            check_connection: function(ws) {
                if (!this.ok_received) {
                    ws.close();
                }
            },

            start_problem_test: function(pid) {
                let thisCom = this;

                if (pid === -1) {
                    alert("save problem first!");
                    return;
                }

                // refresh the status and error msg
                this.ok_received = false;
                this.solution_received = false;
                this.sp_checker_received = false;
                this.error_desc = "";

                let ws = new WebSocket("ws://" + location.hostname + "/ws/problem/check/");

                ws.onopen = function(evt) {
                    console.log("Connection open ...");
                    ws.send('{"problem_id":' + pid + '}');
                    setTimeout(function(ws_p, this_p) {
                        if (!this_p.ok_received){
                            ws_p.close();
                        }
                    },180000, ws, thisCom);
                };

                ws.onmessage = function(evt) {
                    console.log( "Received Message: " + evt.data);
                    let recv_data = JSON.parse(evt.data);

                    if (recv_data.hasOwnProperty("ok")) {
                        thisCom.ok_received = true;
                        if (!recv_data.ok) {
                            thisCom.error_desc = recv_data.detail;
                        }
                    } else if (recv_data.hasOwnProperty("solution")) {
                        thisCom.solution_received = true;
                        thisCom.verdict = recv_data.solution.verdict;
                        thisCom.time_usage = recv_data.solution.time_used;
                        thisCom.memory_usage = recv_data.solution.memory_used;
                        thisCom.desc = recv_data.solution.desc;
                        if (recv_data.hasOwnProperty("checker")) {
                            thisCom.sp_checker_received = true;
                            thisCom.sp_checker_verdict = recv_data.checker.verdict;
                            thisCom.sp_checker_time_usage = recv_data.checker.time_used;
                            thisCom.sp_checker_memory_usage = recv_data.checker.memory_used;
                        }
                    }
                    // ws.close();
                };

                ws.onclose = function(evt) {
                    console.log("Connection closed.");
                };
            }

            // for test
            /*showres: function() {
                console.log("title: \n" + this.title);
                console.log("description: \n" + this.description);
                console.log("note: \n" + this.note);
                console.log("time limit: \n" + this.time_limit);
                console.log("memory limit: \n" + this.memory_limit);

                console.log("sample inputs: \n" + JSON.stringify(this.sample_inputs));

                console.log("json file: \n" + this.json_file);
                console.log("json_text: \n" + this.json_text);
                console.log("checker_type: \n" + this.selected_checker_type);

                console.log("code file: \n" + this.code_file);
                console.log("code text:\n" + this.code_text);
                console.log("solution file:\n" + this.solution_file);
                console.log("solution text:\n"+ this.solution_text);
                console.log("solution language: \n" + this.selected_lang);
            },

            test_ws: function() {
                var ws = new WebSocket("ws://" + location.hostname + "/ws/problem/check/");

                ws.onopen = function(evt) {
                    console.log("Connection open ...");
                    ws.send("Hello WebSockets!");
                };

                ws.onmessage = function(evt) {
                    console.log( "Received Message: " + evt.data);
                    ws.close();
                };

                ws.onclose = function(evt) {
                    console.log("Connection closed.");
                };
            }*/
        }
    }
</script>

<style scoped>
    .button_font {
        font-weight: 500;
    }
    .white_font {
        color: white;
    }
    .tip_font {
        color: #01579B;
    }
</style>
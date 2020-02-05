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
                                        <v-card-title>
                                            Add Problem
                                        </v-card-title>
                                        
                                        <v-text-field
                                         outlined
                                         label='Title'
                                        ></v-text-field>
                                        
                                        <v-textarea
                                          outlined
                                          label="Description"
                                        ></v-textarea>
                                        
                                        <v-text-field
                                         outlined
                                         label='Note'
                                        ></v-text-field>
                                        
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                 outlined
                                                 label='Time Limit'
                                                ></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                 outlined
                                                 label='Memory Limit'
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        
                                        <v-card outlined class="pa-5 mb-7">
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-btn @click.stop="change_upload_json_type">
                                                        {{upload_json_btn_text[json_btn_text_index]}}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            
                                            <!-- 上传json文件的输入框 -->
                                            <v-row>
                                                <v-col>
                                                    <v-file-input
                                                     label="upload JSON file"
                                                     show-size
                                                     v-show="upload_json"
                                                    >
                                                    </v-file-input>
                                                    
                                                    <v-textarea
                                                      outlined
                                                      v-show="!upload_json"
                                                      label="JSON content"
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
                                                            <v-btn @click.stop="change_upload_code_type">
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
                                                            >
                                                            </v-file-input>
                                                            
                                                            <v-textarea
                                                              outlined
                                                              v-show="!upload_code"
                                                              label="code content"
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
                                                    <v-btn @click.stop="change_upload_solution_type">
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
                                                    >
                                                    </v-file-input>
                                                    
                                                    <v-textarea
                                                      outlined
                                                      v-show="!upload_solution"
                                                      label="solution content"
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
                                            <v-col cols="6">
                                                <v-btn block @click.stop="login">
                                                    save problem
                                                </v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn block @click.stop="login">
                                                    test solution and checker
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        
                                        
                                        
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
                time_limit: '',
                memory_limit: '',
                
                // json输入框相关
                upload_json_btn_text: ['write JSON manually', 'upload JSON file'],
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
        },
        watch: {
            
        }
    }
</script>

<style>
    
</style>
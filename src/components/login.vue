<template>
    <v-container
     fluid
     no-gutters
     class="pa-0"
    >
        <v-card tile class="pa-10" :img="require('../assets/windows10.jpg')">
            <v-row align="center" justify="center" no-gutters>
                <v-col cols="1"></v-col>
                <v-col>
                    <v-row align="center" justify="center">
                        <v-col cols="12">
                            <v-card tile class="pa-12"
                                    v-if="show_login"
                            >
                                <v-card-title>
                                    登录
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                            v-model="l_username"
                                            label='Username'
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="l_password"
                                            :append-icon="l_showpsw ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="l_showpsw ? 'text' : 'password'"
                                            label="Password"
                                            @click:append="l_showpsw = !l_showpsw"
                                    ></v-text-field>
                                    <v-checkbox v-model="l_keep" label="Remember me"></v-checkbox>
                                </v-card-text>
                                <v-card-text class="pt-0">
                                    <a @click="show_login = false">没有账号? 注册</a>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block @click.stop="login">
                                        登录
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                            <v-card tile class="pa-12"
                                    v-if="!show_login"
                            >
                                <v-card-title>
                                    注册
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                            v-model="r_username"
                                            label='Username'
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="r_password"
                                            :append-icon="r_showpsw ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="r_showpsw ? 'text' : 'password'"
                                            label="Password"
                                            @click:append="r_showpsw = !r_showpsw"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="r_confirm_password"
                                            :append-icon="r_confirm_showpsw ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="r_confirm_showpsw ? 'text' : 'password'"
                                            label="Confirm Password"
                                            @click:append="r_confirm_showpsw = !r_confirm_showpsw"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="r_email"
                                            label='Email'
                                    ></v-text-field>
                                </v-card-text>
                                <v-card-text class="pt-0">
                                    <a @click="show_login = true">已有账号? 登录</a>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block @click.stop="register">
                                        注册
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="4"></v-col>
                <v-col cols="2">
                    <v-img :src="require('../assets/win10niang.png')"
                           alt="假装这里有一张很可爱的二次元女孩图片"
                           max-height="600" contain
                    >
                    </v-img>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
    export default {
        data: function() {
            return {
                // 控制页面元素
                show_login: true,

                l_showpsw: false,
                l_username: "",
                l_password: "",
                l_keep: false,

                r_username: "",
                r_password: "",
                r_confirm_password: "",
                r_showpsw: false,
                r_confirm_showpsw: false,
                r_email: "",
            }
        },
        methods: {
            login() {
                let thisCom = this;
                if (!this.l_username) {
                    alert("username is empty!");
                    return;
                }
                if (!this.l_password) {
                    alert("password is empty!");
                    return;
                }

                
                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/user/login/',
                    //POST里面的data
                    data: {
                        username: thisCom.l_username,
                        password: thisCom.l_password,
                        keep: thisCom.l_keep,
                    },
                    //请求成功
                    success : function(result) {
                        thisCom.$router.push({
                            name: 'problemSet'
                        });
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        /* eslint-disable no-console */
                        console.error(e.status);
                        console.error(e.responseText);
                        alert(e.responseText);
                        /* eslint-enable no-console */
                    },
                });
            },

            register: function () {
                let thisCom = this;
                if (!this.r_username) {
                    alert("username is empty!");
                    return;
                }
                if (!this.r_password) {
                    alert("password is empty!");
                    return;
                }
                if (!this.r_email) {
                    alert("email is empty!");
                    return;
                }
                if (this.r_password !== this.r_confirm_password) {
                    alert("confirm password doesn't match password!");
                    return;
                }

                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/user/register/',
                    //POST里面的data
                    data: {
                        username: thisCom.r_username,
                        password: thisCom.r_password,
                        email: thisCom.r_email,
                    },
                    //请求成功
                    success : function(result) {
                        alert("注册成功！");
                        thisCom.r_username = "";
                        thisCom.r_password = "";
                        thisCom.r_showpsw = false;
                        thisCom.r_confirm_password = "";
                        thisCom.r_confirm_showpsw = false;
                        thisCom.r_email = "";
                        thisCom.show_login = true;
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        /* eslint-disable no-console */
                        console.error(e.status);
                        console.error(e.responseText);
                        alert(e.responseText);
                        /* eslint-enable no-console */
                    },
                });
            }
        },
    }
</script>

<style>
</style>
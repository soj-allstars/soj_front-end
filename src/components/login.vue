<template>
    <v-container
     fluid
     no-gutters
    >
        <v-row align="center" justify="center">
            <v-col cols="10">
                <v-card class="pa-10" color="#dddddd">
                    <v-row align="center" justify="center">
                        <v-col cols="6">
                            <v-row align="center" justify="center">
                                <v-btn class="mx-2" fab dark large color="green">
                                      <v-icon dark>mdi-android</v-icon>
                                </v-btn>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-card tile class="pa-12">
                                        <v-card-title>
                                            Login
                                        </v-card-title>
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
                                        <v-btn block @click.stop="login">
                                            login
                                        </v-btn>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row align="center" justify="center">
                                <v-btn class="mx-2" fab dark large color="blue">
                                      <v-icon dark>mdi-android</v-icon>
                                </v-btn>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-card tile class="pa-12">
                                        <v-card-title>
                                            Register
                                        </v-card-title>
                                        <v-text-field
                                         v-model="r_username"
                                         label='Username.'
                                        ></v-text-field>
                                        <v-text-field
                                         v-model="r_password"
                                         label='Password.'
                                        ></v-text-field>
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
                l_showpsw: false,
                l_username: "",
                l_password: "",
                l_keep: false,
                r_username: "",
                r_password: ""
            }
        },
        methods: {
            login() {
                var thisCom = this;
                if (!this.l_username) {
                    alert("username is empty!");
                    return;
                }
                if (!this.l_password) {
                    alert("password is empty!");
                    return;
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
                    url : thisCom.serveUrl() + '/api/user/login/',
                    //POST里面的data
                    data: {
                        username: thisCom.l_username,
                        password: thisCom.l_password,
                        keep: thisCom.l_keep
                    },
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    },
                    //请求成功
                    success : function(result) {
                        console.log('==============');
                        console.log(result);
                        thisCom.$router.push({
                            name: 'problemSet'
                        });
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                      console.log(e.status);
                      console.log(e.responseText);
                      alert(e.responseText);
                    },
                    
                });
            }
        },
    }
</script>

<style>
    
</style>
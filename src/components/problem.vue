<template>
    <v-container
     fluid
     no-gutters
    >
        <v-row
         align='start'
         justify='end'
         class='mx-4'
        >
            <v-col 
             cols="4"
             style="position: fixed;"
            >
                <v-card
                 class="pa-6"
                 tile
                >
                    <v-row>
                        
                        <v-col><v-btn link :to="{ path: '/problemSubmit', query: { pid: pid }}"
                         block color="light-blue darken-3" class="button_font white_font">
                            <v-icon class="button_icon">mdi-cloud-upload</v-icon>
                            <span>提交</span>
                        </v-btn></v-col>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-calendar-text</v-icon>
                            <span>提交记录</span>
                        </v-btn></v-col>
                    </v-row>
                    <v-row>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-forum</v-icon>
                            <span>讨论</span>
                        </v-btn></v-col>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-lightbulb-on</v-icon>
                            <span>题解</span>
                        </v-btn></v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row
         align='start'
         justify='start'
         class='mx-10'
         >
            <v-col
             cols='8'
             >
                <v-card
                  class="pa-6"
                  tile
                >
                    <v-card-title class='display-1 pb-0'>{{pid}}. {{title}}</v-card-title>
                    <v-card-subtitle class='pa-4 pb-0'>
                        <v-row>
                            <v-col cols='3'>
                                <v-icon>mdi-clock</v-icon>
                                time limit: {{time_limit}}ms
                            </v-col>
                            <v-col cols='3'>
                                <v-icon>mdi-database</v-icon>
                                memory limit: {{parseInt(memory_limit / 1024)}}MB
                            </v-col>
                        </v-row>
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text class='body-1 pt-8'>
                        <p v-for="p in description.split('\n')" :key="p.id">
                            {{p}}
                        </p>
                    </v-card-text>
                    <!-- inputs and outputs -->
                    <v-card-text>
                        <template v-for="i in sample_inputs.length">
                            sample {{i}}:
                            <v-card
                            outlined
                            color="#eee"
                            class="pa-2 mb-10"
                            :key="i.id"
                            >
                                <div class='caption'>input</div>
                                <div class='mb-5 code_font' v-html='sample_inputs[i - 1].replace("\n", "&lt;br&gt;")'></div>
                                <div class="caption">output</div>
                                <div class="code_font" v-html='sample_outputs[i - 1].replace("\n", "&lt;br&gt;")'></div>
                            </v-card>
                        </template>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
        
    </v-container>
</template>

<script>
    export default {
      data : function () {
    	  return {
              // 用于控制左边drawer开关
    		  drawer: false,
              // 题目的内容
              pid: -1,
              title: '',
              time_limit: 0,
              memory_limit: 0,
              description: "",
              sample_inputs: [],
              sample_outputs: [],
              note: ''
    	  }
      },
      beforeMount : function() {
          console.log(this.serveUrl());
          
        this.pid = this.$route.params.pid;
        var thisCom = this;
        $.ajax({
            //请求方式
            type : "GET",
            //请求地址
            url : thisCom.serveUrl() + '/api/problem/' + thisCom.pid,
            //请求成功
            success : function(result) {
                thisCom.title = result.title;
                thisCom.time_limit = result.time_limit;
                thisCom.memory_limit = result.memory_limit;
                thisCom.description = result.description;
                thisCom.sample_inputs = result.sample_inputs;
                thisCom.sample_outputs = result.sample_outputs;
                thisCom.note = result.note;
            },
            //请求失败，包含具体的错误信息
            error : function(e){
              console.log(e.status);
              console.log(e.responseText);
            }
        });
      },
      
      // 只改变参数是不会使页面刷新的
      // 需要通过这个函数来执行参数更新的操作
      beforeRouteUpdate (to, from, next) {
          // react to route changes...
          // don't forget to call next()
          this.pid = to.params.pid;
          var thisCom = this;
          $.ajax({
              //请求方式
              type : "GET",
              //请求地址
              url : thisCom.serveUrl() + '/api/problem/' + thisCom.pid,
              //请求成功
              success : function(result) {
                  thisCom.title = result.title;
                  thisCom.time_limit = result.time_limit;
                  thisCom.memory_limit = result.memory_limit;
                  thisCom.description = result.description;
                  thisCom.sample_inputs = result.sample_inputs;
                  thisCom.sample_outputs = result.sample_outputs;
                  thisCom.note = result.note;
              },
              //请求失败，包含具体的错误信息
              error : function(e){
                console.log(e.status);
                console.log(e.responseText);
              }
          });
          next();
      }
    }
    
</script>

<style scoped>
    .code_font {
        color: rgb(189,65,71);
        font-family: "consolas";
        font-weight: bold;
    }
    .button_font {
        font-weight: 500;
    }
    .white_font {
        color: white;
    }
    .button_icon {
        position: absolute;
        left: 5px;
    }
</style>
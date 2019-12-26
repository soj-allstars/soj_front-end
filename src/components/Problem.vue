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
                                <v-icon>mdi-timer</v-icon>
                                time limit: {{time_limit}}ms
                            </v-col>
                            <v-col cols='3'>
                                <v-icon>mdi-memory</v-icon>
                                memory limit: {{memory_limit}}MB
                            </v-col>
                        </v-row>
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text class='body-1 pt-8'>
                        <p v-for="p in description.split('\n')" :key="p.id">
                            {{p}}
                        </p>
                        
                    </v-card-text>
                    <v-card-text>
                        <div class="pa-1 pl-0">sample inputs:</div>
                       <v-card
                         outlined
                         color="#eee"
                         class="pa-2"
                         >
                            <div v-for="iitem in sample_inputs" :key='iitem.id' class='code_font'>
                                {{iitem}}
                           </div>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <div class="pa-1 ol-0">sample outputs:</div>
                        <v-card
                         outlined
                         color="#eee"
                         class="pa-2"
                         >
                            <div v-for="oitem in sample_outputs" :key='oitem.id' class='code_font'>
                                {{oitem}}
                            </div>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        {{note}}
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
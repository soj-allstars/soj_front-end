<template>
    <v-container
     fluid
     no-gutters
    >
        <v-row
         align='center'
         justify='center'
        >
            <v-col cols='8' align="center">
                <v-card class='pa-10'>
                    <div class="text-center">
                        <v-row class="row_height">
                            <v-col cols='3' class="font-weight-black pa-0 ma-0 row_height">
                                Id
                            </v-col>
                            <v-col class="font-weight-black pa-0 ma-0">
                                Title
                            </v-col>
                        </v-row>
                        <v-row v-for="pbl in problems" :key="pbl.id"
                         class="row_height"
                         align="center"
                         justify="center">
                            <v-col cols='3' class="pa-0 ma-0 row_height">
                                <v-btn text block outlined tile height="50px" class="text-none"
                                link :to="{ name:'problem', query: { pid: pbl.id } }">{{pbl.id}}</v-btn>
                            </v-col>
                            <v-col class="pa-0 ma-0 row_height">
                                <v-btn text block outlined tile height="50px" class="text-none"
                                link :to="{ name:'problem', query: { pid: pbl.id } }">{{pbl.title}}</v-btn>
                            </v-col>
                        </v-row>
                        <v-pagination
                          v-model="page"
                          :length="6"
                          class="mt-10"
                        ></v-pagination>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>


<script>
    export default {
        data: function() {
            return {
                page: 1,
                prev: '',
                next: '',
                problem_cnt: 2,
                problems: [
                    {
                        id: 1,
                        title: 'first problem',
                    },
                    {
                        id: 2,
                        title: 'second problem'
                    }
                ]
            }
        },
        beforeMount: function() {
            var thisCom = this;
            $.ajax({
                //请求方式
                type : "GET",
                //请求地址
                url : thisCom.serveUrl() + '/api/problems/',
                //请求成功
                success : function(result) {
                    thisCom.problem_cnt = result.count;
                    thisCom.prev = result.previous;
                    thisCom.next = result.next;
                    thisCom.problems = result.results;
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
    .row_height {
        height: 50px;
    }
    .rela_pos {
        position: relative;
    }
    .border {
        border: 1px solid #aaa;
    }
</style>
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
                                ID
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
                        <v-pagination :length="Math.ceil(problem_cnt / page_length)"
                                      v-model="selected_page"
                                      @input="click_input"
                                      :total-visible="10"
                                      class="mt-10"
                        ></v-pagination>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>


<script>
    import router from "../router";

    export default {
        data: function() {
            return {
                selected_page: 1,
                prev: '',
                next: '',
                problem_cnt: 0,
                // 一页题目应该有的数量，需要和后端进行协商
                page_length: 20,
                problems: []
            }
        },
        methods: {
            click_input: function (num) {
                router.push({name: 'problemSet', query: {page: num}});
            },
            getProblemPage: function (page_num) {
                let thisCom = this;
                $.ajax({
                    //请求方式
                    type : "GET",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/problems/',
                    data : {
                        page: page_num,
                    },
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
                        alert(e.responseText);
                    }
                });
            }
        },
        beforeMount: function() {
            let page_num = 1;
            if (this.$route.query.page) {
                page_num = this.$route.query.page;
            }
            this.getProblemPage(page_num);
        },

        beforeRouteUpdate(to, from, next) {
            let page_num = 1;
            if (to.query.page) {
                page_num = to.query.page;
            }
            this.getProblemPage(page_num);
            next();
        }
    }
</script>

<style scoped>
    .row_height {
        height: 50px;
    }
</style>
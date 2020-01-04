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
                        <v-row>
                            <v-col cols='2' class="font-weight-black">id</v-col>
                            <v-col class="font-weight-black">title</v-col>
                        </v-row>
                        <v-list>
                            <v-list-item-group v-model="problem_cnt" color="primary">
                                <v-list-item v-for="pbl in problems" 
                                :key="pbl.id"
                                class='pa-0'
                                >
                                    <v-col cols='2' class='pa-0 ma-0'>
                                        <v-card outlined tile>aaa</v-card>
                                    </v-col>
                                    <v-col class='pa-0 ma-0'>bbb</v-col>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                        <v-pagination
                          v-model="page"
                          :length="6"
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
                table_headers: [ "id", "title" ],
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
        }
    }
</script>

<style scoped>
    
</style>
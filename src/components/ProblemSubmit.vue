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
                             label='ProlbemNo.'
                            ></v-text-field>
                        </v-col>
                        <v-spacer/>
                        <v-col cols='5'>
                            <v-select
                             :items="languages"
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
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input
                             label="or you can upload your code file here"
                            ></v-file-input>
                        </v-col>
                    </v-row>
                    
                    <v-row justify='center'>
                        <v-col align='center'>
                            <v-btn link to='problemsubmitres'
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
                languages : ['C++', 'Python', 'Java']
            }
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
</style>
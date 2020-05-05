<template>
    <v-content
            fluid
            no-gutters
    >
            <v-row
             align='center'
             justify='center'
            >
                <v-col cols='10' align="center">
                    <v-card tile
                            class="pa-10"
                    >
                        <v-row>
                            <v-col>
                                <problemSubmitRes
                                        :request_url=" this.serveUrl() + '/api/submissions' + '/' "
                                        :highlighted_id="$route.params.hlid"
                                        :page="page_in_normal"
                                ></problemSubmitRes>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
    </v-content>
</template>

<script>
    import router from "../router";
    import problemSubmitRes from './problemSubmitRes';
    export default {
        components: {
            problemSubmitRes,
        },

        data: function() {
            return {
                page_in_normal: 1,
            }
        },

        beforeRouteUpdate(to, from, next) {
            let page_num = 1;
            if (to.query.page) {
                this.page_in_normal = parseInt(to.query.page);
            }
            next();
        },
    }
</script>
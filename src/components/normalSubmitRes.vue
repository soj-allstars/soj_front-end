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
    }
</script>
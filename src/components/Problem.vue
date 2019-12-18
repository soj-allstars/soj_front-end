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
                        
                        <v-col><v-btn link to="problemsubmit"
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
                    <v-card-title class='display-1 pb-0'>{{title}}</v-card-title>
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
              title: 'A + B problem',
              time_limit: 0,
              memory_limit: 0,
              description: `Welcome! Everything is fine.
You have arrived in The Medium Place, the place between The Good Place and The Bad Place. You are assigned a task that will either make people happier or torture them for eternity.
You have a list of k pairs of people who have arrived in a new inhabited neighborhood. You need to assign each of the 2k people into one of the 2k houses. Each person will be the resident of exactly one house, and each house will have exactly one resident.

Of course, in the neighborhood, it is possible to visit friends. There are 2k−1 roads, each of which connects two houses. It takes some time to traverse a road. We will specify the amount of time it takes in the input. The neighborhood is designed in such a way that from anyone's house, there is exactly one sequence of distinct roads you can take to any other house. In other words, the graph with the houses as vertices and the roads as edges is a tree.

The truth is, these k pairs of people are actually soulmates. We index them from 1 to k. We denote by f(i) the amount of time it takes for the i-th pair of soulmates to go to each other's houses.

As we have said before, you will need to assign each of the 2k people into one of the 2k houses. You have two missions, one from the entities in The Good Place and one from the entities of The Bad Place. Here they are:

The first mission, from The Good Place, is to assign the people into the houses such that the sum of f(i) over all pairs i is minimized. Let's define this minimized sum as G. This makes sure that soulmates can easily and efficiently visit each other;
The second mission, from The Bad Place, is to assign the people into the houses such that the sum of f(i) over all pairs i is maximized. Let's define this maximized sum as B. This makes sure that soulmates will have a difficult time to visit each other.
What are the values of G and B?

Input
The first line of input contains a single integer t (1≤t≤500) denoting the number of test cases. The next lines contain descriptions of the test cases.

The first line of each test case contains a single integer k denoting the number of pairs of people (1≤k≤105). The next 2k−1 lines describe the roads; the i-th of them contains three space-separated integers ai,bi,ti which means that the i-th road connects the ai-th and bi-th houses with a road that takes ti units of time to traverse (1≤ai,bi≤2k, ai≠bi, 1≤ti≤106). It is guaranteed that the given roads define a tree structure.

It is guaranteed that the sum of the k in a single file is at most 3⋅105.`,
              sample_inputs: ['1 1', '2 2'],
              sample_outputs: ['2', '4'],
              note: ''
    	  }
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
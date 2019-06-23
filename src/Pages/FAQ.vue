<template>
    <v-app>
    <v-layout class="BG-v-layout" justify-center>
    <v-flex md8 class="Page" style="padding: 2% 0px 2% 0px">
    <v-expansion-panel dark class="bg_element">
        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
          <div v-if="$store.state.lang">General information</div>
          <div v-else>Общая информация</div>
        </template>
            <v-card class="bg_element">
            <v-card-text class="font-color">
                <General-Info :faq="false"></General-Info>
             </v-card-text>
             </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content v-if="$store.state.lang" class="head_element">
            <template v-slot:header>
                <div> Frequently asked question </div>
            </template>
            <v-card class="bg_element">
            <v-card-text class="font-color">
            <v-expansion-panel class="bg_element">
                <v-expansion-panel-content
                v-for="(FAQ, i) in FAQ"
                :key="i"
                class="head_element"
                >
                    <template v-slot:header>
                        <div>{{ FAQ.header }}</div>
                    </template>
                    <v-card class="bg_element">
                    <v-card-text class="font-color">
                        {{ FAQ.content }}
                    </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-card-text>
            </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content v-else class="head_element">
            <template v-slot:header>
                <div> Часто задаваемые вопросы </div>
            </template>
            <v-card class="bg_element">
            <v-card-text class="font-color">
            <v-expansion-panel class="bg_element">
                <v-expansion-panel-content
                v-for="(FAQ, i) in FAQ_ru"
                :key="i"
                class="head_element"
                >
                    <template v-slot:header>
                        <div>{{ FAQ.header }}</div>
                    </template>
                    <v-card class="bg_element">
                    <v-card-text class="font-color">
                        {{ FAQ.content }}
                    </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
    </v-layout>
    </v-app>
</template>

<script>
import GeneralInfo from '../components/General_Info'

export default {
    data(){
        return {
            FAQ: [
                {
                header: 'Test question',
                content: 'test'
                },
                {
                header: 'Test question 2',
                content: 'test'
                },
            ],
            FAQ_ru: [
                {
                header: 'Test question',
                content: 'test'
                },
                {
                header: 'Test question 2',
                content: 'test'
                },
            ],
        }
    },
    components: {
        GeneralInfo
    }
}
</script>

<style scoped>
.genres {
    font-size: 12pt
}
a { 
	text-decoration: none;
    font-weight:bold;
}  
a:hover { 
	text-decoration: none;
    font-weight:bold;
} 
.patreon {
    color: #e44727;
}
.discord {
    color: #7289da;
}
.tfgames {
    color: #405dc6;
}
.f95 {
    color: white;
}
.f95-zone {
    color: #ba4545;
}
</style>
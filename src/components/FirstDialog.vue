<template>
  <div class="text-xs-center">
    <!--  v-model это активатор - ЕГО НЕ ТРОГАТЬ -->
    <v-dialog v-model="$store.state.firstDialog" persistent dark width="420">
        <v-card class="text-xs-center">
          <!-- ENGLISH -->
          <section v-if="$store.state.lang">

            <v-card-title class="headline dark red"> You must be 18 or older to access this game </v-card-title>
              <v-card-text>
                  This game contains <b>explicit scenes of a sexual nature</b>, with a great bias in <b>femdom</b>!
                  <br><br>
                  By clicking on the "<b>Continue</b>" button, you confirm that you are at least 18 years old.
              </v-card-text>

            <v-card-actions>
              <v-layout align-center justify-space-around column>
                <v-flex>
                  <v-btn color="red" dark @click="$store.commit('firstDialog')">Enter</v-btn>
                </v-flex>
                <v-flex class="leave-btn">
                  <v-btn color="white darken-1" flat @click="Leave()">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>

          </section>
          <!-- RUSSIAN -->
          <section v-else>

            <v-card-title class="headline dark red"> Вы должны быть старше 18 лет для доступа к этой игре </v-card-title>
              <v-card-text>
                  Данная игра содержит <b>откровенные сцены сексуального характера</b>, с большим уклоном в <b>женское доминирование</b>!
                  <br><br>
                  Нажимая на кнопку «<b>Продолжить</b>», вы подтверждаете, что вам как минимум 18 лет.
              </v-card-text>

            <v-card-actions>
              <v-layout align-center justify-space-around column>
                <v-flex>
                  <v-btn color="red" :ripple="{ class: 'red--text' }" dark @click="$store.commit('firstDialog')">Продолжить</v-btn>
                </v-flex>
                <v-flex class="leave-btn">
                  <v-btn color="white darken-1" flat @click="Leave()">Отменить</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>

          </section>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    methods: {
      Leave(){
        location.href = "http://google.com"
      },
    }
  }
</script>

<style scoped>
h1 {
  text-align:left;
  font-size: 1.5em
}

.leave-btn {
  margin-top: 1%
}
</style>
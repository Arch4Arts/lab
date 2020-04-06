<template id="color-picker-template">
<v-layout justify-center>
<v-flex md4 text-center>
  <div class="color-picker">
    <div class="color-picker__overlay" v-if="isVisible" v-on:click="hide"></div>
    <transition name="pop">
      <div class="color-picker__flyout" v-if="isVisible">
    <div class="color-chip" v-bind:style="{'background': color}">
      <div class="color-chip__inner">
        <h1 class="color-chip__title">HSL</h1>
        <h3 class="color-chip__subtitle">{{ colorString }}</h3>
      </div>
    </div>
    <div class="color-picker__inner">
      <div class="control" v-bind:style="gradientH">
        <input type="range" min="0" max="360" v-model="h" />
      </div>
      <div class="control" v-bind:style="gradientS">
        <input type="range" min="0" max="100" v-model="s" />
      </div>
      <div class="control" v-bind:style="gradientL">
        <input type="range" min="0" max="100" v-model="l" />
      </div>
    </div>
  </div>
    </transition>
    <!-- <div class="swatch" v-bind:style="{'background': color}" v-on:click="toggle"></div> -->
    <v-icon :color="color" class="swatch" @click="toggle">fas fa-palette</v-icon>
  </div>
  </v-flex>
</v-layout>
</template>

<script>
import store from '../stores/store'

export default {
  template: "#color-picker-template",
  props: ["change", "initial", "extColor"],
  data: function() {
    return {
      isVisible: false, // Открывается окна по умолчанию.
      h: this.extColor.h,
      s: this.extColor.s,
      l: this.extColor.l
    }
  },
  computed: {
    color: function() {
      var hsl = hsb2hsl(parseFloat(this.h) / 360, parseFloat(this.s) / 100, parseFloat(this.l) / 100)

      var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";

      var s = "hsl(" + c + ")";
      this.change({
        color: s
      });
      return s;
    },
    colorString: function() {
      var c = this.h + ", " + this.s + "%, " + this.l + "%"
      return c;
    },
    gradientH: function() {
      var stops = [];
      for (var i = 0; i < 7; i++) {
        var h = i * 60;
        
        var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.s) / 100, parseFloat(this.l / 100))
        
        var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")
      }

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },
    gradientS: function() {
      var stops = [];
      var c;
      var hsl = hsb2hsl(parseFloat(this.h / 360), 0, parseFloat(this.l / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      var hsl = hsb2hsl(parseFloat(this.h / 360), 1, parseFloat(this.l / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },

    gradientL: function() {
      var stops = [];
      var c;

      var hsl = hsb2hsl(parseFloat(this.h / 360), 0, 0)
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      var hsl = hsb2hsl(parseFloat(this.h / 360), parseFloat(this.s / 100), 1)

      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    }
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
      this.$store.state.mChat.mChat_Enable = true
      // this.$store.state.appHeaderEnable = true
      this.$store.commit('updateStores');
    },
    toggle() {
      this.isVisible = !this.isVisible;
      this.$store.state.mChat.mChat_Enable = false
      // this.$store.state.appHeaderEnable = false
      this.$store.commit('updateStores');
    }
  },
  
/*   mounted: function () {
    this.h = parseInt(Math.random() * 360)
  } */
}

function hsb2hsl(h, s, b) {
  var hsl = {
    h: h
  };
  hsl.l = (2 - s) * b;
  hsl.s = s * b;

  if (hsl.l <= 1 && hsl.l > 0) {
    hsl.s /= hsl.l;
  } else {
    hsl.s /= 2 - hsl.l;
  }

  hsl.l /= 2;

  if (hsl.s > 1) {
    hsl.s = 1;
  }
  
  if (!hsl.s > 0) hsl.s = 0


  hsl.h *= 360;
  hsl.s *= 100;
  hsl.l *= 100;
  // console.log('1' + ' h:' + hsl.h + ' s:' + hsl.s + ' l:' + hsl.l)
  return hsl;
}
</script>

<style scoped>
.color-picker {
  position: relative;
}

.color-picker__overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0;
  background: black;
  z-index: 0;
  opacity: 0;
}

.color-picker__flyout {
  width: 240px;
  border: 4px solid #2a2a2b;
  border-radius: 6px;
  background: #222222;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.12);
  font-family: "Roboto", "Helvetica Neue", sans-serif;
  top: -1650%;
  right: 9%;
  position: absolute;
  z-index: 2;
}

.color-picker__inner {
  padding: 1.5rem 1rem;
}

.color-chip {
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 4px 4px 0 0;
}

.color-chip__inner {
  text-align: center;
}

.color-chip__subtitle {
  margin-top: 0.5rem;
  opacity: 0.7;
  font-weight: normal;
  font-size: 15px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.color-chip__title {
  color: white;
  margin: 0;
  font-size: 50px;
  letter-spacing: 4px;
  font-family: Helvetica Neue;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.control {
  width: 100%;
  height: 12px;
  border-radius: 12px;
  border: 1px solid black;
}

.control + .control {
  margin-top: 1rem;
}

.control input {
  width: 100%;
  margin: 0;
}

.control input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

.control input[type=range]:focus {
  outline: none;
}

.control input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.control input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #ddd;
  height: 20px;
  width: 20px;
  border-radius: 50px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  margin-top: -4px;
}

/* .swatch {
  width: 24px;
  height: 24px;
  margin: 1rem auto 0 auto;
  border: 2px solid #2a2a2b;
  border-radius: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.swatch:hover {
  opacity: 0.8;
  border-radius: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
} */

.pop-enter-active,
.pop-leave-active {
  transition: transform .5s, opacity .5s;
  transition-timing-function: cubic-bezier(.8, .3, 0.25, 1.75);
  transform: scale(1);
}

.pop-enter,
.pop-leave-active {
  opacity: 0;
  transform: scale(0);
}
</style>


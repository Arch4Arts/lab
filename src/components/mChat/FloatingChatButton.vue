<template>
  <vue-draggable-resizable 
    :x="x"
    :y="y"
    :z="3"

    @dragging="onDrag" 
    @dragstop="savePosition"
    :draggable="!$vuetify.breakpoint.xsOnly"
  >
    <!-- Иконка открывающая чат -->
    <div class="launcher hidden-sm-and-down" @mouseup="$store.state.mChat.show ? closeChat() : openChat()">
      <!-- Элемент показывающий кол-во сообщений рядом с эконкой -->
      <v-badge
        :content="unreadMessagesCount"
        :value="unreadMessagesCount"
        overlap
      >
        <v-btn text large fab icon><a-icon class="mChat-float-btn" :class="{ 'shake-slow shake-constant': unreadMessagesCount > 0 }" :icon="['fas', 'mobile-alt']" /></v-btn>
      </v-badge>
    </div>
  </vue-draggable-resizable>

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  data() {
    return {
      x: this.$store.state.mChat.posX_floatButton,
      y: this.$store.state.mChat.posY_floatButton,
      isDragNow: false,
    }
  },
  props: {
    unreadMessagesCount: {
      type: Number,
      required: true,
    }
  },
  methods: {
    onDrag(x, y) {
      this.x = x
      this.y = y
      this.isDragNow = true
    },
    savePosition(x, y){
      this.$store.state.mChat.posX_floatButton = x
      this.$store.state.mChat.posY_floatButton = y
      this.$store.commit('updateStore');
      // Задержка для отработки после события click
      setTimeout(() => { this.isDragNow = false }, 100);
    },
    openChat() {
      if (!this.isDragNow) 
        this.$store.commit('mChatShow', false);
    },
    closeChat() {
      if (!this.isDragNow) 
        this.$store.commit('mChatShow', false);
    },
  },
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
  }
}
</script>

<style lang='scss' scoped>

* { // Перезисываем глобальный класс, для badge
  --v-primary-base: var(--important-modal__header--background);
}

.mChat-float-btn {
  font-size: 28px;
}

.v-badge__badge {
  color: var(--h1--color) !important;
}

.v-btn {
  background: transparent !important;
  &:hover {
    background: transparent !important;
  }
}

.launcher {
  /* width: 60px;
  height: 60px;
  background-position: center;
  background-repeat: no-repeat; */
  position: fixed;
  // right: 2%;
  // bottom: 2%;
  /* border-radius: 50%;
  box-shadow: none; */
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  .new-msg-count {
    position: absolute;
    top: 6px;
    left: 55px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background: #ff4646;
    color: white;
    text-align: center;
    margin: auto;
    font-size: 12px;
    font-weight: 500;
    /* Чтобы красный кружок не перекрывался выделением кнопки */
    z-index: 1;
  }
  z-index: 1;
}

// Variables
$prefix: 'shake' !default;
$trigger: 'shake-trigger' !default;

// Placeholders
%shake {
  display: inherit;
  transform-origin: center center;
}

%paused   { animation-play-state: paused; }
%running  { animation-play-state: running; }

@function apply-random($input) {
  @return if($input != 0, random($input) - $input/2, 0);
}

/// Do The Shake
/// @param {String}  $name ['shake']              - Name for the keyframes animation
/// @param {Number}  $h [5px]                     - Max number for random to assign in x axis
/// @param {Number}  $v [5px]                     - Max number for random to assign in y axis
/// @param {Number}  $r [3deg]                    - Max number for random rotation
/// @param {Number}  $dur [100ms]                 - animation-duration; valid time value
/// @param {Number}  $precision [.1]              - Precision of the keyframes animation (i.e 2 > 2%, 4%, 6%...)
/// @param {Boolean} $opacity [false]             - To apply random animation also in the opacity property
/// @param {String}  $q [infinite]                - animation-iteration-count; valid value
/// @param {String}  $t [ease-in-out]             - animation-timing-function; valid value
/// @param {Number}  $delay [null]                - animation-delay; valid time value
/// @param {Number}  $chunk [100%]                - Part of 100% where apply the animation
@mixin do-shake(
  $name: 'shake', 
  $h: 5px, 
  $v: 5px, 
  $r: 3deg, 
  $dur: 100ms, 
  $precision: .02, 
  $opacity: false, 
  $q: infinite, 
  $t: ease-in-out, 
  $delay: null,
  $chunk: 100%
  ) {  

  $rotate: 0;
  $move-x: 0;
  $move-y: 0;

  $h: if(unitless($h) and $h != 0, $h * 1px, $h);
  $v: if(unitless($v) and $v != 0, $v * 1px, $v);
  $r: if(unitless($r) and $r != 0, $r * 1deg, $r);

  // Keyframes
  @at-root {
    @keyframes #{$name} {
      $interval: if($precision > 0 and $precision < 1, 100 * $precision, 10);
      $step: $interval * 1%;

      @while $step < $chunk {
        $rotate: apply-random($r);
        $move-x: apply-random($h);
        $move-y: apply-random($v);
        
        #{$step} {
          transform: translate($move-x, $move-y) rotate($rotate);
          @if $opacity { opacity: random(100) / 100; }
        }
        
        $step: $step + $interval;
      }

      #{ if($chunk < 100%, (0%, $chunk, 100%), (0%, 100%)) } {
        transform: translate(0, 0) rotate(0);
      }

    }
  }

  @extend %shake;

  &:hover,
  .#{$trigger}:hover &,
  &.#{$prefix}-freeze,
  &.#{$prefix}-constant {
    @if $delay { animation-delay: $delay; }
    animation-name: #{$name};
    animation-duration: $dur;
    animation-timing-function: $t;
    animation-iteration-count: $q;
  }

  &:hover,
  .#{$trigger}:hover & { @extend %running; }

}

.#{$prefix}-freeze,
.#{$prefix}-constant.#{$prefix}-constant--hover:hover,
.#{$trigger}:hover .#{$prefix}-constant.#{$prefix}-constant--hover {
  @extend %paused;
}

.#{$prefix}-freeze:hover,
.#{$trigger}:hover .#{$prefix}-freeze { @extend %running; }

.shake-slow { @include do-shake('shake-slow', 0, 0, 43, 6s, $chunk: 60%); }

</style>

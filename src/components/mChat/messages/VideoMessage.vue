<template>
  <div>
    <div class="message-title" v-if="isGroupChat">{{ author }}</div>
    <div @mouseenter="play" @mouseleave="pause" class="video-message" @click="saveVolumeSettings()"> 
      <video ref="videoPlayer" class="video-js" :key="$store.state.reRender_mChatPlayersVolume" />
    </div>
  </div>
</template>

<script>
import videojs from 'video.js/dist/alt/video.core.novtt.min.js';
import 'video.js/dist/video-js.css'

import eventBus from '../../../js/eventBus'

export default {
  name: "videojs",
  props: {
    data: {
      type: Object,
      required: true
    },
    isGroupChat: {
      type: Boolean,
      required: true
    },
    author: [String],
  },
  data() {
    return {
      player: null,
      options: {
        controls: true,
        loop: true,
        preload: 'none',
        // responsive: true,
        muted: !this.$store.state.soundSettings.isPlaySoundsEnable,
        volume: this.$store.state.mChat.videoVolume,
        poster: this.data.poster,
        sources: [
          {
            src: this.data.src,
          }
        ]
      }
    }
  },
  methods: {
    saveVolumeSettings() {
      this.$store.state.mChat.videoVolume = this.player.volume();
      this.$store.commit('updateStore');
    },
    play() {
      if (this.$store.state.mChat.autoplayVideoMessageOnHover) this.$refs.videoPlayer.play()
    },
    pause() {
      if (this.$store.state.mChat.autoplayVideoMessageOnHover) this.$refs.videoPlayer.pause();
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      // console.log('onPlayerReady', this);
    })

    // this.player.volume(this.$store.state.mChat.videoVolume)
    // if (this.$store.state.soundSettings.isPlaySoundsEnable === false) 
    //   this.player.muted(true);
    
    eventBus.on('setVideoVolumeMute', state => this.player.muted(state))
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
    eventBus.off('setVideoVolumeMute');
  }
}
</script>

<style lang='scss'>

.video-js {
  width: calc(var(--mChatWidth) / 100 * 75);
  height: calc(var(--mChatWidth) / 100 * 50);

  z-index: 1; // Не удалять!!!

  border-radius: calc(var(--mChatWidth) / 100 * 6);
  // Для border-radius
  mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

  overflow: hidden;

  &:hover {
    .vjs-big-play-button {
      opacity: .9;
      background: #00b3ff;
    }
    .vjs-control-bar {
      opacity: 1;
    }
  }

  .vjs-poster {
    background-size: cover;
  }

  .vjs-control-bar {
    background-color: transparent;
    opacity: 0;
    transition: .5s opacity;
    font-size: calc(var(--mChatWidth) / 100 * 3.5);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  .vjs-big-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 2em;
    height: 2em;
    border-radius: 50%;
    border: none;
    opacity: .6;
    background: #00b3ff;
    .vjs-icon-placeholder:before {
      position: absolute;
      height: initial;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .vjs-button {
    opacity: .9;
    &:hover {
      opacity: 1;
    }
  }

  .vjs-progress-control {   // на всю ширину поверх панели управления
    position: absolute;
    bottom: calc(var(--mChatWidth) / 100 * 9.5);
    left: 0;
    right: 0;
    width: 100%;
    height: 10px;
    .vjs-play-progress:before {
      opacity: 0;
    }
    &:hover {
      .vjs-play-progress:before {
        opacity: 1;
      }
    }
  }

  .vjs-volume-panel {
    .vjs-mute-control {
      width: 2em;
    }
  }

  .vjs-time-control {
    display: block;
    padding-left: 0px;
    padding-right: 0px;
  }
  .vjs-time-divider {
    padding-left: .9em;
  }
  .vjs-duration-display {
      opacity: 0.7;
  }
  .vjs-remaining-time {
    display: none;
  }


  .vjs-picture-in-picture-control {
    position: absolute;
    bottom: 0;
    // right: 16%;
    right: 16%;

    width: 2em;
    .vjs-icon-placeholder {
      background: url('https://gen.jut.su/templates/school/video-js-additional/pip-icon.png') center center no-repeat;
      background-size: contain;
      display: inline-block;
      width: calc(var(--mChatWidth) / 100 * 5);
      height: calc(var(--mChatWidth) / 100 * 5);
      &:before {
        content: none;
      }
    }
  }

  .vjs-fullscreen-control {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.vjs-fullscreen {
  .vjs-control-bar {
    background-color: transparent;
    font-size: calc(var(--mChatWidth) / 100 * 6);
  }
  .vjs-progress-control {   // на всю ширину поверх панели управления
    bottom: 100%;
  }
  .vjs-picture-in-picture-control {
    display: none;
  }
}

</style>
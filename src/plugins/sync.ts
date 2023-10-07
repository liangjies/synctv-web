import { ref, watch } from "vue";
import { roomStore } from "@/stores/room";
import { isDev } from "@/utils/utils";
import { useDebounceFn } from "@vueuse/core";
import { WsMessageType } from "@/types/Room";
const room = roomStore();

interface callback {
  "set-player-status": (
    data: string | ArrayBuffer | Blob,
    useBuffer?: boolean | undefined
  ) => boolean;
  "ws-send": (msg: string) => void;
}

const debounceTime = 250;

export const sync = (cbk: callback) => {
  return (art: Artplayer) => {
    const publishSeek = useDebounceFn((currentTime: number) => {
      if (!room.currentMovie.live)
        cbk["set-player-status"](
          JSON.stringify({
            Type: WsMessageType.SEEK,
            Seek: currentTime,
            Rate: art.playbackRate
          })
        );
      isDev() && console.log("视频空降，:", art.currentTime);
    }, debounceTime);

    const setAndNoPublishSeek = (seek: number) => {
      art.off("seek", publishSeek);
      art.seek = seek;
      art.once("seek", () => {
        art.on("seek", publishSeek);
      });
    };

    const publishPlay = useDebounceFn(() => {
      isDev() && console.log("视频播放,seek:", art.currentTime);
      if (!room.currentMovie.live)
        cbk["set-player-status"](
          JSON.stringify({
            Type: WsMessageType.PLAY,
            Seek: art.currentTime,
            Rate: art.playbackRate
          })
        );
    }, debounceTime);

    const setAndNoPublishPlay = () => {
      isDev() && console.log("视频播放(no publish),seek:", art.currentTime);
      art.off("play", publishPlay);
      art.play();
      art.once("play", () => {
        art.on("play", publishPlay);
      });
    };

    const publishPause = useDebounceFn(() => {
      isDev() && console.log("视频暂停,seek:", art.currentTime);
      if (!room.currentMovie.live)
        cbk["set-player-status"](
          JSON.stringify({
            Type: WsMessageType.PAUSE,
            Seek: art.currentTime,
            Rate: art.playbackRate
          })
        );
    }, debounceTime);

    const setAndNoPublishPause = () => {
      isDev() && console.log("视频暂停(no publish),seek:", art.currentTime);
      art.off("pause", publishPause);
      art.pause();
      art.once("pause", () => {
        art.on("pause", publishPause);
      });
    };

    const publishRate = () => {
      if (!room.currentMovie.live)
        cbk["set-player-status"](
          JSON.stringify({
            Type: WsMessageType.RATE,
            Seek: art.currentTime,
            Rate: art.playbackRate
          })
        );
      isDev() && console.log("视频倍速,seek:", art.currentTime);
    };

    const setAndNoPublishRate = (rate: number) => {
      art.off("video:ratechange", publishRate);
      art.playbackRate = rate;
      art.once("video:ratechange", () => {
        art.on("video:ratechange", publishRate);
      });
    };

    watch(
      () => room.currentMovieStatus.playing,
      () => {
        if (!art.option.isLive) {
          console.log("AAAAAAAA", room.currentMovieStatus.playing);
          console.log("AAAAAAAA", art.playing);
          if (room.currentMovieStatus.playing === art.playing) return;
          console.log("BBBBBBBBB");
          room.currentMovieStatus.playing ? setAndNoPublishPlay() : setAndNoPublishPause();
        }
      }
    );

    watch(
      () => room.currentMovieStatus.seek,
      () => {
        isDev() && console.log("seek变了：", room.currentMovieStatus.seek);
        if (!room.currentMovie.live) setAndNoPublishSeek(room.currentMovieStatus.seek);
      }
    );

    watch(
      () => room.currentMovieStatus.rate,
      () => {
        isDev() && console.log("rate变了：", room.currentMovieStatus.rate);

        if (!room.currentMovie.live) {
          room.currentMovieStatus.rate === art.playbackRate
            ? void 0
            : setAndNoPublishRate(room.currentMovieStatus.rate);
        }
      }
    );

    isDev() && console.log("art.seek:", art.currentTime);
    isDev() && console.log("room.seek:", room.currentMovieStatus.seek);

    art.once("ready", () => {
      if (!room.currentMovie.live) {
        setAndNoPublishSeek(room.currentMovieStatus.seek);
        console.log("seek同步成功:", art.currentTime);
      }

      // 无效切换导致playing状态错误
      // room.currentMovieStatus.playing ? setAndNoPublishPlay() : setAndNoPublishPause();
      cbk["ws-send"]("PLAYER：视频已就绪");

      art.on("play", publishPlay);

      // 视频暂停
      art.on("pause", publishPause);

      // 空降

      art.on("seek", publishSeek);

      // 倍速
      art.on("video:ratechange", publishRate);
    });
  };
};
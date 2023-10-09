import { roomStore } from "@/stores/room";
import { devLog, debounces } from "@/utils/utils";
import { useDebounceFn } from "@vueuse/core";
import { WsMessageType } from "@/types/Room";
import { ElNotification } from "element-plus";
const room = roomStore();

interface callback {
  "set-player-status": (
    data: string | ArrayBuffer | Blob,
    useBuffer?: boolean | undefined
  ) => boolean;
  "ws-send": (msg: string) => void;
}

interface resould {
  plugin: (art: Artplayer) => unknown;
  setAndNoPublishSeek: (seek: number) => void;
  setAndNoPublishPlay: () => void;
  setAndNoPublishPause: () => void;
  setAndNoPublishRate: (rate: number) => void;
}

const debounceTime = 500;

export const sync = (cbk: callback): resould => {
  const debounce = debounces(debounceTime);
  let player: Artplayer | undefined = undefined;
  const publishSeek = useDebounceFn((currentTime: number) => {
    if (!player || player.option.isLive) return;
    cbk["set-player-status"](
      JSON.stringify({
        Type: WsMessageType.ChangeSeek,
        Seek: currentTime,
        Rate: player.playbackRate
      })
    );
    devLog("视频空降，:", player.currentTime);
  }, debounceTime);

  const setAndNoPublishSeek = (seek: number) => {
    if (!player || player.option.isLive || Math.abs(player.currentTime - seek) < 2) return;
    player.currentTime = seek;
  };

  const publishPlay = () => {
    if (!player || player.option.isLive) return;
    cbk["set-player-status"](
      JSON.stringify({
        Type: WsMessageType.Play,
        Seek: player.currentTime,
        Rate: player.playbackRate
      })
    );
  };

  const publishPlayDebounce = debounce(publishPlay);

  const setAndNoPublishPlay = () => {
    if (!player || player.option.isLive || player.playing) return;
    player.off("play", publishPlayDebounce);
    player.once("play", () => {
      !player || player.on("play", publishPlayDebounce);
    });
    player.play().catch(() => {
      !player || (player.muted = true);
      !player || player.play();
      ElNotification({
        title: "温馨提示",
        type: "info",
        message: "由于浏览器限制，播放器已静音，请手动开启声音"
      });
    });
  };

  const publishPause = () => {
    if (!player || player.option.isLive) return;
    cbk["set-player-status"](
      JSON.stringify({
        Type: WsMessageType.Pause,
        Seek: player.currentTime,
        Rate: player.playbackRate
      })
    );
  };

  const publishPauseDebounce = debounce(publishPause);

  const setAndNoPublishPause = () => {
    if (!player || player.option.isLive || !player.playing) return;
    player.off("pause", publishPauseDebounce);
    player.once("pause", () => {
      !player || player.on("pause", publishPauseDebounce);
    });
    player.pause();
  };

  const publishRate = () => {
    if (!player || player.option.isLive) return;
    cbk["set-player-status"](
      JSON.stringify({
        Type: WsMessageType.ChangeRate,
        Seek: player.currentTime,
        Rate: player.playbackRate
      })
    );
    devLog("视频倍速,seek:", player.currentTime);
  };

  const setAndNoPublishRate = (rate: number) => {
    if (!player || player.option.isLive || player.playbackRate === rate) return;
    player.off("video:ratechange", publishRate);
    player.once("video:ratechange", () => {
      !player || player.on("video:ratechange", publishRate);
    });
    player.playbackRate = rate;
  };

  const plugin = (art: Artplayer) => {
    player = art;
    if (!art.option.isLive) {
      const intervals: number[] = [];

      art.once("ready", () => {
        console.log(room.currentMovieStatus.seek);
        setAndNoPublishSeek(room.currentMovieStatus.seek);
        console.log("seek同步成功:", art.currentTime);

        setAndNoPublishRate(room.currentMovieStatus.rate);
        console.log("rate同步成功:", art.playbackRate);
        room.currentMovieStatus.playing ? setAndNoPublishPlay() : setAndNoPublishPause();
        cbk["ws-send"]("PLAYER：视频已就绪");

        intervals.push(
          setInterval(() => {
            cbk["set-player-status"](
              JSON.stringify({
                Type: WsMessageType.CheckSeek,
                Seek: art.currentTime
              })
            );
          }, 5000)
        );
      });

      art.on("play", publishPlayDebounce);

      // 视频暂停
      art.on("pause", publishPauseDebounce);

      // 空降
      art.on("seek", publishSeek);

      // 倍速
      art.on("video:ratechange", publishRate);

      art.on("destroy", () => {
        player = undefined;
        intervals.forEach((interval) => {
          clearInterval(interval);
        });
        art.off("play", publishPlayDebounce);
        art.off("pause", publishPauseDebounce);
        art.off("seek", publishSeek);
        art.off("video:ratechange", publishRate);
      });
    } else {
      art.once("ready", () => {
        art.play().catch(() => {
          art.muted = true;
          art.play();
          ElNotification({
            title: "温馨提示",
            type: "info",
            message: "由于浏览器限制，播放器已静音，请手动开启声音"
          });
        });
        cbk["ws-send"]("PLAYER：视频已就绪");
      });
    }
  };

  return {
    plugin,
    setAndNoPublishSeek,
    setAndNoPublishPlay,
    setAndNoPublishPause,
    setAndNoPublishRate
  };
};

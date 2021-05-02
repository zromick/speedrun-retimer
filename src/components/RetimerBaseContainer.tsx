import React, { useState, useEffect } from 'react';
import RetimerBase from './RetimerBase';

const RetimerBaseContainer = () => {

  const [url, setURL] = useState("");
  const [copied, setCopied] = useState(false);
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [framerate, setFramerate] = useState("30");
  const [timeString, setTimeString] = useState("0h 0m 0s 0ms");

  const parseYoutubeId = (videoUrl: string) => {
    let reg1 = videoUrl.match(/youtube\..+?\/watch.*?v=(.*?)(?:&|\/|$)/);
    if (reg1 && reg1.length >= 2) {
      return reg1[1];
    }

    let reg2 = videoUrl.match(/youtu\.be\/(.*?)(?:\?|&|\/|$)/);
    if (reg2 && reg2.length >= 2) {
      return reg2[1];
    }

    let reg3 = videoUrl.match(/youtube\..+?\/embed\/(.*?)(?:\?|&|\/|$)/);
    if (reg3 && reg3.length >= 2) {
      return reg3[1];
    }

    return videoUrl;
  }

  const loadVideo = () => {
    let id = parseYoutubeId(url);
    onYouTubePlayerIframeAPIReady(id);
  }

  // Load the IFrame Player API code asynchronously.
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

  // Load page elements
  let videoDiv = document.getElementById('video-div');

  // Fallback Player
  let player = {
    seekTo: function (timestamp: number) {
      console.log('seekto fallback');
    },
    pauseVideo: function () {
      console.log('pausevideo fallback');
    },
    getCurrentTime: function () {
      console.log('getcurrenttime fallback');
    },
    playVideo: function () {
      console.log('playvideo fallback');
    }
  };

  // const validateFramerate = () => {
  //   framerate = parseInt(document.getElementById("framerate").value || "60");
  // }

  const updateCurrentTime = () => {
    let myTime: any = player.getCurrentTime();
    setCurrentTime(Math.floor(myTime * 1000));
    setCurrentFrame(Math.floor(myTime * parseInt(framerate)));
  }

  const setTime = (millis: number) => {
    console.log(millis, `in setTime`)
    player.pauseVideo();
    player.seekTo(millis);
  }

  const stepBy = (amount: number) => {
    player.pauseVideo();
    updateCurrentTime();
    setTime((currentFrame + amount) / parseInt(framerate));
  }

  const updateTotalTime = () => {
    if (startTime !== null && endTime !== null) {
      let timeDiff = parseInt(endTime) - parseInt(startTime);
      let timeStr = "";

      // handle negative time
      if (timeDiff < 0) {
        timeStr += "-";
        timeDiff *= -1;
      }

      let frames = (timeDiff / 1000) * parseInt(framerate);

      let minutes = 0;
      let seconds = Math.floor(frames / parseInt(framerate));
      frames %= parseInt(framerate);
      let ms = Math.round(frames / parseInt(framerate) * 1000);
      let msString = "", secondsString = "", minutesString = "", hoursString = "";
      if (ms < 10) {
        msString = '00' + ms;
      } else if (ms < 100) {
        msString = '0' + ms;
      }
      if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        secondsString = seconds < 10 ? '0' + seconds : '' + seconds;
      }
      if (minutes >= 60) {
        hoursString = '' + Math.floor(minutes / 60);
        minutes = minutes % 60;
        minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
      }

      timeStr += hoursString + 'h ' + minutesString + 'm ' + secondsString + 's ' + msString + 'ms';
      setTimeString(timeStr);
    }
  }

  useEffect(updateTotalTime, [framerate, startTime, endTime]);

  const onPlayerReady = () => {
    videoDiv = document.getElementById('video-div');
    player.playVideo();
    setInterval(updateCurrentTime, 50);

  }

  // Load the player.
  let youtube: YT.Player;
  const frameWidth = document.documentElement.clientWidth;
  const frameHeightRatio = 0.9;

  const onYouTubePlayerIframeAPIReady = (id: string) => {
    youtube = new YT.Player(videoDiv, {
      width: frameWidth,
      height: frameWidth * frameHeightRatio,
      videoId: id,
      events: {
        'onReady': () => onYoutubeReady()
      }
    });
  }

  const onYoutubeReady = () => {
    console.log("huih")
    player = {
      seekTo: function (timestamp) {
        youtube.seekTo(timestamp, true);
      },
      pauseVideo: function () {
        youtube.pauseVideo();
      },
      getCurrentTime: function () {
        return youtube.getCurrentTime();
      },
      playVideo: function () {
        youtube.playVideo();
      }
    };
    onPlayerReady();
  }

  const parseForTime = (event: any) => {
    // Get current frame from input field (either start time or end time)
    let frameFromInputText = (JSON.parse(event.target.value)).lct;
    if (typeof frameFromInputText !== 'undefined') {
      // Calculate the frame
      let frameFromObj = (time: number, fps: number) => Math.floor(time * fps) / fps; //round to the nearest frame
      let finalFrame = frameFromObj(frameFromInputText, parseInt(framerate));

      // Handle for start or end time
    }
  }


  return (
    <RetimerBase
      setURL={setURL}
      loadVideo={loadVideo}
      stepBy={stepBy}
      setCopied={setCopied}
      setFramerate={setFramerate}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      url={url}
      copied={copied}
      startTime={startTime}
      endTime={endTime}
      currentTime={currentTime}
      currentFrame={currentFrame}
      framerate={framerate}
      timeString={timeString}
    />
  )
}

export default RetimerBaseContainer;
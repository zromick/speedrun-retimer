import React, { Dispatch, SetStateAction } from 'react';
import { Snackbar, TextField, Button, Grid, Typography } from '@material-ui/core';
import styles from '../styling.module.scss';
import RetimingButtons from './RetimingButtons';

export interface RetimerBaseProps {
  setURL: Dispatch<SetStateAction<string>>,
  loadVideo: () => void,
  stepBy: (frames: number) => void,
  setCopied: Dispatch<SetStateAction<boolean>>,
  setFramerate: Dispatch<SetStateAction<string>>,
  setStartTime: Dispatch<SetStateAction<string>>,
  setEndTime: Dispatch<SetStateAction<string>>,
  url: string,
  copied: boolean,
  startTime: string,
  endTime: string,
  currentTime: number,
  currentFrame: number,
  framerate: string,
  timeString: string,
}

const RetimerBase = (props: RetimerBaseProps) => {
  const {
    setURL,
    loadVideo,
    stepBy,
    setCopied,
    setFramerate,
    setStartTime,
    setEndTime,
    url,
    copied,
    startTime,
    endTime,
    currentTime,
    currentFrame,
    framerate,
    timeString,
  } = props;
  return (
    <Grid container justify="center">
      <Grid container item xs={10} justify="center">
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Typography variant="h4">Speedrun Retimer</Typography>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.videoURLWidth}>
            <TextField
              label="Video URL"
              value={url}
              id="url"
              onChange={(event) => setURL(event.target.value)}
              fullWidth
            />
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => loadVideo()}
            >
              Load Video
            </Button>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div id="video-div" className={styles.basicMargin}>
            <div></div>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Typography variant="h6">Step Forwards or Backwards:</Typography>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <RetimingButtons stepBy={stepBy} />
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Typography id="current-time">Current time: {currentTime} ms</Typography>
            <Typography id="current-time">Current frame: {currentFrame}</Typography>
            <TextField
              label="Framerate"
              value={framerate}
              id="framerate"
              onChange={(event) => setFramerate(event.target.value)}
              fullWidth
            />
            <TextField
              label="Start Time"
              value={startTime}
              id="start-time"
              onChange={(event) => setStartTime(event.target.value)}
              fullWidth
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => setStartTime('' + currentTime)}
            >
              Set Start Time From Video
            </Button>
            <TextField
              label="End Time"
              value={endTime}
              id="end-time"
              onChange={(event) => setEndTime(event.target.value)}
              fullWidth
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => setEndTime('' + currentTime)}
            >
              Set End Time From Video
            </Button>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Typography>Result: {timeString}</Typography>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Typography>Mod Message: Time starts at {startTime} and ends at {endTime} at {framerate} fps to get a final time of {timeString}.</Typography>
            <Typography>Retimed using [speedrun-retimer](https://zromick.github.io/speedrun-retimer/)</Typography>
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <div className={styles.basicMargin}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(`Mod Message: Time starts at ${startTime} and ends at ${endTime} at ${framerate} fps to get a final time of ${timeString}.Retimed using [speedrun-retimer](https://zromick.github.io/speedrun-retimer/).`);
                setCopied(true);
              }}
            >
              Copy Mod Message
            </Button>
          </div>
        </Grid>
        <Snackbar
          open={copied}
          autoHideDuration={10000}
          onClose={() => setCopied(false)}
          message="Copied! Please paste the mod message into the comment of the run you are verifying."
        />
      </Grid>
    </Grid>
  );
}

export default RetimerBase;
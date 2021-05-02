import React from 'react';
import { Grid, Button } from '@material-ui/core';

export interface RetimingButtonProps {
  stepBy: (frames: number) => void;
}

const RetimingButtons = (props: RetimingButtonProps) => {
  const { stepBy } = props;
  return (
    <Grid container item justify="center">
      <Button variant="contained" onClick={() => stepBy(5000)}>+5000</Button>
      <Button variant="contained" onClick={() => stepBy(1000)}>+1000</Button>
      <Button variant="contained" onClick={() => stepBy(500)}>+500</Button>
      <Button variant="contained" onClick={() => stepBy(100)}>+100</Button>
      <Button variant="contained" onClick={() => stepBy(50)}>+50</Button>
      <Button variant="contained" onClick={() => stepBy(10)}>+10</Button>
      <Button variant="contained" onClick={() => stepBy(5)}>+5</Button>
      <Button variant="contained" onClick={() => stepBy(1)}>+1</Button>
      <Button variant="contained" onClick={() => stepBy(-5000)}>-5000</Button>
      <Button variant="contained" onClick={() => stepBy(-1000)}>-1000</Button>
      <Button variant="contained" onClick={() => stepBy(-500)}>-500</Button>
      <Button variant="contained" onClick={() => stepBy(-100)}>-100</Button>
      <Button variant="contained" onClick={() => stepBy(-50)}>-50</Button>
      <Button variant="contained" onClick={() => stepBy(-10)}>-10</Button>
      <Button variant="contained" onClick={() => stepBy(-5)}>-5</Button>
      <Button variant="contained" onClick={() => stepBy(-1)}>-1</Button>
    </Grid>
  )
}

export default RetimingButtons;


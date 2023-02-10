import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { ITeam } from '../../../models/team';
import { useAppSelector } from '../../../app/hooks/hooks';
import { useTeamsMutation } from '../../../features/team/teamApiSlice';
import { IPlayer } from '../../../models/player';
import { ListBlocks } from './ListBlocks';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

export function Lobby() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <ListBlocks />
    </Grid>
  );
}
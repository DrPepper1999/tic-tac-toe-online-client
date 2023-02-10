import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IPlayer } from '../../../models/player';

interface ListBlockProps {
  title: React.ReactNode,
   items: readonly IPlayer[]
};

const ListBlock = ({items, title}: ListBlockProps) => {
  return (
    <Card>
    <CardHeader
      sx={{ px: 2, py: 1 }}
      avatar={
        <Typography>
          Team 
        </Typography>
      }
      title={title}
    />
    <Divider />
    <List
      sx={{
        width: 200,
        height: 230,
        bgcolor: 'background.paper',
        overflow: 'auto',
      }}
      dense
      component="div"
      role="list"
    >
      {items.map((player) => {
        const labelId = `transfer-list-all-item-${player.id}-label`;

        return (
          <ListItem
            key={player.id}
            role="listitem"
          >
            <ListItemIcon>
              {player.profileImage != null
              ? <Avatar alt='Avatar' src={player.profileImage}/>
              : <Avatar alt="Avatar">{player.name.at(0)}</Avatar>}

            </ListItemIcon>
            <ListItemText id={labelId} primary={player.name} />
          </ListItem>
        );
      })}
    </List>
  </Card>
  )
}

export default ListBlock

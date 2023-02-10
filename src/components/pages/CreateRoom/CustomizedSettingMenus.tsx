import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks";
import { setRoom } from "../../../features/room/roomSlice";


const StyledSettingMenu = styled((props:any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

interface CustomizedSettingMenusProps {

};

export default function CustomizedSettingMenus({}:CustomizedSettingMenusProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const playersForStart = useAppSelector(
    (state) => state.room.gameSetting.maxPlayers
  );
  const mapSize = useAppSelector((state) => state.room.gameSetting.mapSize);
  const mapSizeRef = React.useRef<any>(mapSize);
  const playersForStartRef = React.useRef<any>(playersForStart);

  useEffect(() => {
    const playerForStartHasValue =
      playersForStartRef.current?.value != undefined; // current?.value
    const mapSizeHasValue = mapSizeRef.current?.value != undefined; // current?.value
    if (!open && (playerForStartHasValue || mapSizeHasValue)) {
      dispatch(
        setRoom({
          playersForStart: Number(playersForStartRef.current.value),
          game: { map: { size: Number(mapSizeRef.current.value) } },
        })
      );
    }
  }, [open]);
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledSettingMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <EditIcon />
          <TextField
            type="number"
            size="small"
            label="Max players"
            placeholder="max players"
            defaultValue={playersForStart}
            InputProps={{
              inputProps: { min: 2, max: 8, step: 1, pattern: '[0-9]*' },
              inputMode: "numeric"
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={playersForStartRef}
            fullWidth
          />
        </MenuItem>
        <MenuItem disableRipple>
          <FileCopyIcon />
          <TextField
            type="number"
            size="small"
            label="Map size"
            defaultValue={mapSize}
            placeholder="map size"
            InputProps={{
              inputProps: { min: 3, max: 12, step: 2, pattern: '[0-9]*' },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={mapSizeRef}
            fullWidth
          />
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <CloseIcon />
          Close
        </MenuItem>
      </StyledSettingMenu>
    </div>
  );
}

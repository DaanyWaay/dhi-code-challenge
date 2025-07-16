import { Popper } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface MapPopoverMenu {
  open: boolean;
  anchorEl: Element | null;
  handleClose: () => void;
}

export const MapPopoverMenu = ({
  open,
  anchorEl,
  handleClose,
}: MapPopoverMenu) => {
  return (
    <Popper
      id="map-menu"
      anchorEl={anchorEl}
      open={open}
      className="tw-bg-white tw-rounded-md"
    >
      <MenuItem onClick={handleClose}>Search</MenuItem>
      <MenuItem onClick={handleClose}>Import GeoJSON</MenuItem>
    </Popper>
  );
};

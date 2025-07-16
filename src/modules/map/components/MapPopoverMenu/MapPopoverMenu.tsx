import { ButtonGroup, Popper } from "@mui/material";
import Button from "@mui/material/Button";
import { useMapMenuActions } from "../../hooks/useMapMenuActions";
import { useCurrentAction } from "../../store/currentAction";

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
  const { onDrawPolygonClick } = useMapMenuActions();
  const currentAction = useCurrentAction((store) => store.action);

  return (
    <Popper
      id="map-menu"
      anchorEl={anchorEl}
      open={open}
      className="tw-bg-white tw-rounded-md"
    >
      <ButtonGroup orientation="vertical">
        <Button onClick={handleClose}>Search</Button>
        <Button onClick={handleClose}>Import GeoJSON</Button>
        <Button
          onClick={onDrawPolygonClick}
          variant={currentAction === "DRAW_POLYGON" ? "contained" : "outlined"}
        >
          Draw polygon
        </Button>
      </ButtonGroup>
    </Popper>
  );
};

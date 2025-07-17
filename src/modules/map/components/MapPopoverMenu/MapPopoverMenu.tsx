import { ButtonGroup, Popper } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback } from "react";
import { useDrawPolygon } from "../../hooks/useDrawPolygon";

export type MapMenuAction = "IMPORT" | "SEARCH" | "DRAW_POLYGON";

interface MapPopoverMenu {
  open: boolean;
  anchorEl: Element | null;
  handleClose: () => void;
  onActionClick: (action: MapMenuAction) => void;
}

export const MapPopoverMenu = ({
  open,
  anchorEl,
  handleClose,
  onActionClick,
}: MapPopoverMenu) => {
  const { onDrawPolygonClick, isActive } = useDrawPolygon();

  const onImportClick = useCallback(() => {
    onActionClick("IMPORT");
  }, [onActionClick]);

  const onSearchClick = useCallback(() => {
    onActionClick("SEARCH");
    handleClose();
  }, [handleClose, onActionClick]);

  return (
    <Popper
      id="map-menu"
      anchorEl={anchorEl}
      open={open}
      className="tw-bg-white tw-rounded-md"
    >
      <ButtonGroup orientation="vertical">
        <Button onClick={onSearchClick}>Search</Button>
        <Button onClick={onImportClick}>Import GeoJSON</Button>
        <Button
          onClick={onDrawPolygonClick}
          variant={isActive ? "contained" : "outlined"}
        >
          Draw polygon
        </Button>
      </ButtonGroup>
    </Popper>
  );
};

import { Menu } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useCallback, useRef, useState } from "react";
import { MapPopoverMenu } from "../MapPopoverMenu/MapPopoverMenu";

export const MapOptions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popoverAnchor = useRef<HTMLButtonElement>(null);

  const onMenuClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="tw-absolute tw-left-0 tw-top-16 tw-z-10">
      <IconButton
        data-testid="button-home"
        onClick={onMenuClick}
        ref={popoverAnchor}
      >
        <Menu />
      </IconButton>
      <MapPopoverMenu
        open={isMenuOpen}
        anchorEl={popoverAnchor.current}
        handleClose={handleClose}
      />
    </div>
  );
};

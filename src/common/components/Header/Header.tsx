import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="tw-flex tw-justify-between tw-h-12 tw-border-b-2">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Link to={"/"}>
          <IconButton data-testid="button-home">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to={"map"}>
          <Button data-testid="button-contact">Map</Button>
        </Link>
        <Link to={"utils"}>
          <Button data-testid="button-contact">Utils</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Link to={"profile"}>
          <Button data-testid="button-profile">Profile</Button>
        </Link>
      </Box>
    </div>
  );
};

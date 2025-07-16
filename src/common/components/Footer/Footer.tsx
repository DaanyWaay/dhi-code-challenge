import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <Box
      className="tw-flex-1 tw-h-6 tw-border-t-2 tw-overflow-hidden"
      sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <Link to={"contact"}>
        <Button data-testid="button-contact" size="small">
          Contact
        </Button>
      </Link>
      <Link to={"about"}>
        <Button data-testid="button-contact" size="small">
          About
        </Button>
      </Link>
    </Box>
  );
};

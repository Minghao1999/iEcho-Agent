import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoChatbox } from "react-icons/io5";

const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "black" }}
      component="header"
    >
      <Typography
        variant="h3"
        gutterBottom
        component="div"
        sx={{ p: 2.5, pb: 0, color: "white", display: "flex", alignItems: "center" }}
      >
        <IoChatbox style={{ marginRight: "1.2rem" }} /> INBOX
      </Typography>
    </Box>
  );
};

export default Header;

import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const MsgSkeletonLoading = () => {
  return (
    <Stack spacing={1}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={
          <Skeleton
            variant="text"
            width={100}
            sx={{ fontSize: "1rem" }}
          />
        }
        subheader={
          <Skeleton
            variant="text"
            width={200}
            sx={{ fontSize: "1rem" }}
          />
        }
      />
    </Stack>
  );
};

export default MsgSkeletonLoading;

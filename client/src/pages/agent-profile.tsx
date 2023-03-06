import { useOne } from "@pankod/refine-core";
import { Box, CircularProgress, Typography } from "@pankod/refine-mui";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

type Props = {};

const AgentProfile = (props: Props) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });
  const myProfile = data?.data ?? [];
  // console.log(user);
  if (isLoading)
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress color="inherit" size="60vh" />
      </Box>
    );
  if (isError) return <Typography>Error...</Typography>;
  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;

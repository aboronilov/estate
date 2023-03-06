import { useList } from "@pankod/refine-core";
import { Box, CircularProgress, Typography } from "@pankod/refine-mui";

import { AgentCard } from "components";

type Props = {};

const Agents = (props: Props) => {
  const { data, isLoading, isError } = useList({ resource: "users" });
  const allAgents = data?.data || [];

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
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Agents List
      </Typography>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#FCFCFC",
        }}
      >
        {allAgents.map(({ _id, name, email, avatar, allProperties }) => (
          <AgentCard
            key={_id}
            id={_id}
            name={name}
            email={email}
            avatar={avatar}
            noOfProperties={allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;

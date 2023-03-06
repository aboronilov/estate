import { useList } from "@pankod/refine-core";
import { Box, CircularProgress, Stack, Typography } from "@pankod/refine-mui";
import {
  PieChart,
  PropertyCard,
  PropertyReferrals,
  TopAgent,
  TotalRevenue,
} from "components";

type Props = {};

const Home = (props: Props) => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

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
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#275ae8", "#c4e8ef"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#275ae8", "#c4e8ef"]}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={["#275ae8", "#c4e8ef"]}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[75, 25]}
          colors={["#275ae8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#FCFCFC"
        display="flex"
        minWidth="100%"
        flexDirection="column"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142D">
          Latest Properties
        </Typography>
        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map(({ _id, title, location, price, photo }) => (
            <PropertyCard
              key={_id}
              id={_id}
              title={title}
              location={location}
              price={price}
              photo={photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

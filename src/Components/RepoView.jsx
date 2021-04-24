import { Box, Grid } from "@chakra-ui/react";
import RepoCard from "./RepoCard";

const RepoView = ({ repos, history }) => (
  <Box mt={10}>
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(30rem, 1fr))"
      gap="2rem"
    >
      {repos.map((repo, key) => (
        <RepoCard
          title={repo.name}
          key={key}
          tags={repo.tags}
          to={`/repos/${repo.id}`}
        />
      ))}
    </Grid>
  </Box>
);

export default RepoView;

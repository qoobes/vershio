import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export const Loader = () => (
  <Box d="flex" h="90vh" w="100%" alignItems="center" justifyContent="center">
    <Spinner size="xl" w="2rem" h="2rem" />
  </Box>
);

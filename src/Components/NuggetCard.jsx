import { Box, Heading } from "@chakra-ui/react";

const NuggetCard = ({ title }) => (
  <Box
    mb={5}
    w="100%"
    p={8}
    rounded="xl"
    position="relative"
    boxShadow="0px 2px 4px 0px #c0c0c0"
    transition="box-shadow 250ms"
    bgColor="white"
    userSelect="all"
    cursor="pointer"
    _hover={{
      boxShadow: "0px 2px 8px 2px #c0c0c0",
    }}
    _active={{
      boxShadow: "none",
    }}
  >
    <Heading size="md" fontWeight="normal">
      {title}
    </Heading>
  </Box>
);

export default NuggetCard;

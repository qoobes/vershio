import { Box, Heading, Text } from "@chakra-ui/react";
import NuggetCard from "./NuggetCard";

const NuggetView = ({ nuggets, summary }) => (
  <>
    <Box mt={10} d="flex" justifyContent="space-between">
      <Box w="100%" bgColor="#ffffffaa" p={8} rounded="xl">
        <Heading fontSize="x-large" mb={8}>
          Nuggets
        </Heading>
        {nuggets.map((nugget, key) => (
          <NuggetCard title={nugget.content} key={key} />
        ))}
      </Box>
      <Box
        boxShadow="0 2px 5px -1px gray"
        rounded="xl"
        w="60%"
        height="100%"
        ml={10}
        p={8}
        transition="box-shadow 250ms"
        cursor="pointer"
        _hover={{
          boxShadow: "0px 2px 8px 2px #c0c0c0",
        }}
        _active={{
          boxShadow: "none",
        }}
      >
        <Heading fontSize="x-large">Summary</Heading>
        <Text mt={5} fontSize="large" lineHeight="1.5">
          {summary}
        </Text>
      </Box>
    </Box>
  </>
);

export default NuggetView;

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, Tag } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import theme from "../helpers/theme";

const RepoCard = ({ title, tags, to }) => (
  <Box
    as={RouterLink}
    to={to}
    w="100%"
    h="8rem"
    p={8}
    rounded="xl"
    position="relative"
    bgColor="#ffffffaa"
    border="3px solid white"
    // boxShadow="2px 2px 4px 0px #c0c0c0"
    transition="box-shadow 250ms, border 200ms"
    cursor="pointer"
    _hover={{
      boxShadow: "0px 0px 6px 0px #c0c0c0",
    }}
    _active={{
      boxShadow: "none",
      border: `1px solid ${theme.colours.accent}`,
    }}
  >
    <Heading size="md" isTruncated>
      {title}
    </Heading>
    <Box position="absolute" bottom="8" left="8">
      {tags.map(tag => (
        <Tag mr={3} bgColor="#ffffff">
          {tag}
        </Tag>
      ))}
    </Box>
    <ChevronRightIcon
      color={theme.colours.accent}
      fontSize="xx-large"
      position="absolute"
      margin="auto 0"
      right="1rem"
    />
  </Box>
);

export default RepoCard;

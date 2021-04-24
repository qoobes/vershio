import { Box, Button, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../Components/Layout";

const Home = () => (
  <Layout>
    <Box
      w="100%"
      d="flex"
      alignItems="center"
      flexDir="column"
      userSelect="none" /* we won't let ppl select cause we're cool kids*/
    >
      <Heading
        mt="10rem"
        fontSize={{ base: "xx-large", lg: "xxx-large" }}
        bg="linear-gradient(89.95deg, #F49696 20.32%, #B596F4 118.37%)"
        bgClip="text"
      >
        AN INDEX OF EVERYTHING YOU NEED TO KNOW.
      </Heading>
      <Heading
        mt="5rem"
        fontSize={{ base: "xx-large", lg: "xxx-large" }}
        background="linear-gradient(89.95deg, #F49696 -3.89%, #15EEEE 182.75%)"
        bgClip="text"
        fontWeight="black"
        letterSpacing="2px"
      >
        EVERYWHERE.
      </Heading>
      <Button
        rounded="xl"
        color="white"
        fontSize="xl"
        as={RouterLink}
        to="/login"
        mt={20}
        _hover={{
          filter: "brightness(0.9)",
        }}
        _active={{
          filter: "brightness(1)",
          boxShadow: "0px 0px 5px 2px gray",
          outline: "none !important",
          border: "none !important",
        }}
        px="10"
        py="6"
        bg="linear-gradient(90deg, #F49696 50%, #A696F4 142.26%)"
        boxShadow="0px 4px 5px 0px #0000001A"
      >
        Start Now.
      </Button>
    </Box>
  </Layout>
);
export default Home;

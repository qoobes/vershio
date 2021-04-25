import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Fade,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tag,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Loader } from "../Components/Loader";
import NuggetView from "../Components/NuggetView";
import { useAuth } from "../contexts/authContext";
import firebase from "../firebase";

const Nuggets = props => {
  const { currentUser } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [nuggets, setNuggets] = useState([]);
  const [repo, setRepo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const repoid = props.match.params.repoid;
    if (!repoid) return;

    const unsub1 = firebase
      .firestore()
      .collection("repos")
      .doc(repoid)
      .onSnapshot(snapshot => setRepo(snapshot.data()));

    const unsub2 = firebase
      .firestore()
      .collection("nuggets")
      .where("repoId", "==", repoid)
      .onSnapshot(snapshot => {
        let docs = snapshot.docs;

        docs = docs.map(doc => doc.data());

        setNuggets(docs);
        setLoaded(true);
        console.log(docs);
      });

    return () => {
      unsub1();
      unsub2();
    };
  }, [currentUser, props.match.params.repoid]);

  if (!loaded)
    return (
      <Layout>
        <Box height="100%" d="flex" alignItems="center" justifyContent="center">
          <Loader w="80%" h="10rem" rounded="full" />
        </Box>
      </Layout>
    );

  return (
    <Layout>
      <Fade in={loaded}>
        <Box w="100%" height="100%" p="5rem">
          <Box
            id="title-search"
            d="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {keyword ? (
              <Heading fontSize="x-large" fontWeight="normal">
                Searching for <strong>{keyword}</strong>
              </Heading>
            ) : (
              <Box>
                <Heading fontWeight="normal" fontSize="x-large" mb={4}>
                  <strong>{repo.name}</strong> repo
                </Heading>
                {repo.tags.map((tag, key) => (
                  <Tag mr={3} key={key} px={5} rounded="full" py={1}>
                    {tag}
                  </Tag>
                ))}
              </Box>
            )}
            <Box>
              <InputGroup position="relative">
                <InputLeftElement
                  zIndex="-1"
                  children={<Search2Icon color="gray.400" />}
                />
                <Input
                  bgColor="#ffffff88"
                  _hover={{ filter: "brightness(1.1)" }}
                  _focus={{ bgColor: "#ffffff00", border: "1px solid white" }}
                  w="20rem"
                  h="2.5rem"
                  value={keyword}
                  position="relative"
                  onChange={e => setKeyword(e.target.value)}
                />

                {keyword && (
                  <InputRightElement
                    children={
                      <CloseIcon
                        color="gray.400"
                        fontSize="sm"
                        cursor="pointer"
                        onClick={() => setKeyword("")}
                      />
                    }
                  />
                )}
              </InputGroup>
            </Box>
          </Box>
          <NuggetView
            nuggets={
              keyword
                ? nuggets.filter(nugget =>
                    nugget.content.toLowerCase().includes(keyword.toLowerCase())
                  )
                : nuggets
            }
            summary={repo.summary}
          />
        </Box>
      </Fade>
    </Layout>
  );
};

export default Nuggets;

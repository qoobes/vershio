import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Layout from "../Components/Layout";
import { Loader } from "../Components/Loader";
import RepoView from "../Components/RepoView";
import { useAuth } from "../contexts/authContext";
import firebase from "../firebase";

const Repos = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [repos, setRepos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("repos")
      .where("creatorId", "==", currentUser.uid)
      .onSnapshot(snapshot => {
        let docs = snapshot.docs;

        docs = docs.map(doc => doc.data());

        setRepos(docs);
        setLoaded(true);
        console.log(docs);
      });

    return unsub;
  }, [currentUser]);

  if (!loaded)
    return (
      <Layout>
        <Box height="90vh" d="flex" alignItems="center" justifyContent="center">
          <Loader w="80%" h="10rem" rounded="full" />
        </Box>
      </Layout>
    );

  const create = () => {
    const id = uuid();
    firebase
      .firestore()
      .collection("repos")
      .doc(id)
      .set({
        id,
        name: "hey there people im bobby brown",
        tags: ["hi", "there", "ppls"],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: currentUser.uid,
      });
  };

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
              <Heading>Your Repos</Heading>
            )}
            <Box>
              <InputGroup position="relative">
                <InputLeftElement
                  zIndex="-1"
                  children={<Search2Icon color="gray.400" />}
                />
                <Input
                  w="20rem"
                  h="2.5rem"
                  value={keyword}
                  position="relative"
                  onChange={e => setKeyword(e.target.value)}
                />
                <Button onClick={create}>hello</Button>

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
          <RepoView
            repos={
              keyword
                ? repos.filter(repo => repo.name.includes(keyword))
                : repos
            }
            history={history}
          />
        </Box>
      </Fade>
    </Layout>
  );
};

export default Repos;

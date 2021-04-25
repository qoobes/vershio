import { Box, Grid, Heading, ScaleFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Loader } from "../Components/Loader";
import RepoCard from "../Components/RepoCard";
import { useAuth } from "../contexts/authContext";
import firebase from "../firebase";

const Feed = () => {
  const { currentUser } = useAuth();

  const [loaded, setLoaded] = useState(false);
  const [docs, setDocs] = useState([]);

  const getRandomRepo = () =>
    firebase
      .firestore()
      .collection("repos")
      .onSnapshot(snapshot => {
        let docs = snapshot.docs;
        docs = docs.map(doc => doc.data());
        setDocs(docs);
        setLoaded(true);
      });

  useEffect(() => {
    firebase
      .firestore()
      .collection("repos")
      .where("creatorId", "==", currentUser.uid)
      .onSnapshot(snapshot => {
        let docs = snapshot.docs;
        if (docs.length === 0) {
          getRandomRepo();
          return;
        }
        docs = docs.map(doc => doc.data());

        const index = Math.floor(Math.random() * docs.length);

        const selected = docs[index];

        const tags = selected.tags;

        if (tags === []) {
          getRandomRepo();
          return;
        }

        firebase
          .firestore()
          .collection("repos")
          .where("tags", "array-contains", tags[0])
          .onSnapshot(snap => {
            let newdocs = snapshot.docs;
            newdocs = newdocs.map(doc => doc.data());

            setDocs(newdocs);
            setLoaded(true);
          });
      });
  }, [currentUser]);

  if (!loaded)
    return (
      <Layout>
        <Box height="90vh" d="flex" alignItems="center" justifyContent="center">
          <Loader w="80%" h="10rem" rounded="full" />
        </Box>
      </Layout>
    );

  return (
    <Layout>
      <ScaleFade in={loaded}>
        <Box
          w="100%"
          h="100%"
          d="flex"
          justifyContent="center"
          flexDir="column"
          px={{ base: "1rem", md: "10rem", lg: "20rem" }}
          pt={20}
        >
          <Heading fontSize="xx-large">Your Feed</Heading>
          <Text fontSize="lg" mt={3} mb={10}>
            Personalized for <strong>you.</strong>
          </Text>

          <Grid
            gridTemplateColumns="repeat(auto-fill, minmax(30rem, 1fr))"
            gap="1rem"
            id="repos"
            w="100%"
          >
            {docs.map((repo, key) => (
              <RepoCard
                tags={repo.tags}
                title={repo.name}
                to={`/repos/${repo.id}`}
                key={key}
              />
            ))}
          </Grid>
        </Box>
      </ScaleFade>
    </Layout>
  );
};

export default Feed;

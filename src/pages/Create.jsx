import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  ScaleFade,
  SlideFade,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Layout from "../Components/Layout";
import { useAuth } from "../contexts/authContext";
import firebase from "../firebase";

const Create = () => {
  const toast = useToast();
  const history = useHistory();

  const [loaded, setLoaded] = useState();

  const [selected, setSelected] = useState("image");
  const [content, setContent] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [contentType, setContentType] = useState("image");

  const { currentUser } = useAuth();

  const nameRef = useRef();
  const tagRef = useRef();

  const textRef = useRef();

  useEffect(() => setLoaded(true), []);

  const onUploadImage = files => {
    let urls = [];
    files.forEach(file => {
      const extension = file.name.split(".")[1];
      const id = uuid();
      setIsUploading(true);

      firebase
        .storage()
        .ref("")
        .child(`${id}.${extension}`)
        .put(files[0])
        .then(snapshot => (urls = urls.concat(snapshot.ref.fullPath)))
        .then(() => {
          if (urls.length === files.length) {
            console.log(urls);
            setContent(urls);
            setIsUploading(false);
            setContentReady(true);

            if (extension === "mp4") setContentType("video");
            else setContentType("image");
          }
        });
    });
  };

  const saveText = () => {
    const text = textRef.current.value;
    setContent(text);
    setContentReady(true);
    setContentType("text");
  };

  const submit = () => {
    if (!contentReady)
      return toast({
        title: "Content not uploaded",
        description: "Either upload something or wait for it to finish",
        status: "error",
        duration: 1500,
      });

    const name = nameRef.current.value;
    let tags = tagRef.current.value;

    if (!tags) tags = ["new"];

    if (content === "" || content === [] || !name)
      return toast({
        title: "Content not found",
        description: "Please refresh the page and try again",
        status: "error",
        duration: 1500,
      });

    console.log(contentType);

    history.push("/repos");
    console.error(
      "this is a demo due to the rules provided by OpenAI, we can't have gpt3 running live."
    );
    console.log(currentUser);
    // the api is disabled
  };

  return (
    <Layout>
      <ScaleFade in={loaded}>
        <Heading
          userSelect="none"
          textAlign="center"
          mt="3rem"
          fontSize="xx-large"
        >
          Create Entry
        </Heading>
        <Box
          userSelect="none"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box id="formbox" w="100%" mx={{ base: "2rem", xl: "10rem" }}>
            <FormControl mb={10}>
              <FormLabel fontSize="x-large">
                <strong>Name</strong>
              </FormLabel>
              <Input
                fontSize="lg"
                border="1px solid transparent"
                transition="border 200ms, background-color 200ms"
                ref={nameRef}
                _focus={{
                  bgColor: "white",
                  border: "1px solid gray",
                }}
                py={6}
                backgroundColor="gray.50"
                placeholder="Eg. Bio Class 4/20"
              />
            </FormControl>

            <FormControl mb={10}>
              <FormLabel fontSize="x-large">
                <strong>Tags</strong> (comma separated)
              </FormLabel>
              <Input
                border="1px solid transparent"
                fontSize="lg"
                ref={tagRef}
                transition="border 200ms, background-color 200ms"
                _focus={{
                  bgColor: "white",
                  border: "1px solid gray",
                }}
                py={6}
                backgroundColor="gray.50"
                placeholder="Eg. bio, lesson"
              />
            </FormControl>

            <Heading fontSize="x-large" mb={5}>
              Content
            </Heading>
            <Box d="flex" justifyContent="space-between" alignItems="center">
              <Box
                w="12rem"
                mr={2}
                h="12rem"
                bgColor="gray.50"
                rounded="lg"
                d="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                transition="filter 200ms, border 300ms"
                _hover={{
                  filter: "brightness(0.9)",
                }}
                border={
                  selected === "image" ? "3px solid black" : "3px solid white"
                }
                onClick={() => setSelected("image")}
              >
                <Image src="icons/Image.png" />
              </Box>
              <Box
                w="12rem"
                mr={2}
                h="12rem"
                bgColor="gray.50"
                rounded="lg"
                d="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                transition="filter 200ms, border 300ms"
                _hover={{
                  filter: "brightness(0.9)",
                }}
                border={
                  selected === "video" ? "3px solid black" : "3px solid white"
                }
                onClick={() => setSelected("video")}
              >
                <Image src="icons/Video.png" />
              </Box>
              <Box
                w="12rem"
                h="12rem"
                mr={2}
                bgColor="gray.50"
                rounded="lg"
                d="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                transition="filter 200ms, border 300ms"
                _hover={{
                  filter: "brightness(0.9)",
                }}
                border={
                  selected === "text" ? "3px solid black" : "3px solid white"
                }
                onClick={() => setSelected("text")}
              >
                <Image src="icons/Text.png" />
              </Box>
            </Box>
          </Box>

          <Box id="uploadbox" w="100%" mx={{ base: "2rem", xl: "10rem" }}>
            <Box
              m="5rem"
              w="35rem"
              h="30rem"
              rounded="xl"
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              {contentReady ? (
                <SlideFade in={contentReady}>
                  <Heading>Your content has been uploaded</Heading>
                </SlideFade>
              ) : selected === "image" ? (
                isUploading ? (
                  <Heading>uploading</Heading>
                ) : (
                  <Box>
                    <Image src="icons/Upload.png" />
                    <ImageUploader
                      singleImage
                      style={{
                        boxShadow: "0px 2px 5px -1px gray",
                        borderRadius: "0.5rem",
                      }}
                      withIcon={false}
                      label=""
                      buttonStyles={{
                        backgroundColor: "green",
                        filter:
                          "drop-shadow(2px 4px 50px rgba(243, 169, 255, 0.8))",
                        background:
                          "linear-gradient(90.1deg, #FF6D6D 0.13%, #DF9AFF 99.96%)",
                      }}
                      buttonText="Choose Images"
                      imgExtension={[".jpg", ".png"]}
                      onChange={onUploadImage}
                    />
                  </Box>
                )
              ) : selected === "video" ? (
                isUploading ? (
                  <Heading>uploading</Heading>
                ) : (
                  <Box>
                    <Image src="icons/Upload.png" />
                    <ImageUploader
                      singleImage
                      style={{
                        boxShadow: "0px 2px 5px -1px gray",
                        borderRadius: "0.5rem",
                      }}
                      withIcon={false}
                      label=""
                      buttonStyles={{
                        backgroundColor: "green",
                        filter:
                          "drop-shadow(2px 4px 50px rgba(243, 169, 255, 0.8))",
                        background:
                          "linear-gradient(90.1deg, #FF6D6D 0.13%, #DF9AFF 99.96%)",
                      }}
                      buttonText="Upload a video"
                      imgExtension={[".mp4"]}
                      onChange={onUploadImage}
                    />
                  </Box>
                )
              ) : (
                <Box textAlign="center">
                  <Textarea
                    border="1px solid transparent"
                    fontSize="lg"
                    w="100%"
                    rows="5"
                    background="linear-gradient(90.1deg, #FF6D6D 0.13%, #DF9AFF 99.96%)"
                    ref={textRef}
                    mb={8}
                    bgClip="text"
                    transition="border 200ms, background-color 200ms"
                    _focus={{
                      bgColor: "white",
                      border: "1px solid gray",
                    }}
                    py={6}
                    placeholder="Talk about anything you like!"
                  />
                  <Button
                    color="white"
                    border="none"
                    transition="filter 200ms, box-shadow 200ms"
                    filter="drop-shadow(2px 4px 50px rgba(243, 169, 255, 0.8))"
                    style={{
                      backgroundColor: "green",
                      background:
                        "linear-gradient(90.1deg, #FF6D6D 0.13%, #DF9AFF 99.96%)",
                    }}
                    _hover={{
                      filter: "brightness(0.9)",
                      boxShadow: "2px 4px 50px rgba(243, 169, 255, 0.8)",
                    }}
                    _focus={{
                      border: "none",
                    }}
                    _active={{
                      border: "none",
                      filter: "none",
                      boxShadow: "none",
                    }}
                    onClick={saveText}
                  >
                    Save Text
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Flex w="100%" justifyContent="center">
          <Button
            px={6}
            py={5}
            size="lg"
            bgColor="black"
            color="white"
            onClick={submit}
            _hover={{
              color: "black",
              bgColor: "white",
              border: "1px solid black",
            }}
            _focus={{
              border: "none",
            }}
            _active={{
              filter: "brightness(0.9)",
              boxShadow: "none",
            }}
          >
            Submit
          </Button>
        </Flex>
      </ScaleFade>
    </Layout>
  );
};

export default Create;

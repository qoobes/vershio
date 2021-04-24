import { AtSignIcon, LockIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import firebase from "../firebase";
import theme from "../helpers/theme";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  const history = useHistory();

  return (
    <>
      <Box
        as="nav"
        w="100%"
        h="4.5rem"
        d="flex"
        justifyContent="space-around"
        alignItems="center"
        bgColor="#ffffff"
        boxShadow="0 2px 5px -1px gray"
      >
        <Heading
          fontWeight="black"
          as={RouterLink}
          to="/"
          cursor="pointer"
          transition="filter 200ms"
          _hover={{
            filter: "brightness(0.9)",
          }}
          userSelect="none"
          bgGradient="linear(to right, pink.300, teal.300)"
          bgClip="text"
        >
          vershio
        </Heading>
        <Box id="items" d="flex" justifyContent="space-between">
          <Button variant="ghost" as={RouterLink} to="/user" mr="4">
            Home
          </Button>
          <Button variant="ghost" as={RouterLink} to="/repos" mr="4">
            Repos
          </Button>
          <Button variant="ghost" as={RouterLink} to="/community" mr="4">
            Community
          </Button>
          {!currentUser ? (
            <>
              <Button
                variant="ghost"
                mr="4"
                ml="10"
                as={RouterLink}
                to="/login"
                colorScheme={theme.colours.accent}
              >
                Log In
              </Button>
              <Button
                mr="4"
                colorScheme={theme.colours.accent}
                as={RouterLink}
                to="/register"
              >
                Register
              </Button>
            </>
          ) : (
            <Menu closeOnBlur={true} zIndex="999">
              <MenuButton
                ml={10}
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                d="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Flex alignItems="center" color={`${theme.colours.accent}.900`}>
                  <Avatar mr="2" size="sm" />
                  <span>{currentUser.displayName}</span>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem
                  d="flex"
                  justifyContent="space-between"
                  as={RouterLink}
                  to="/@me"
                >
                  <span>My Profile</span>
                  <AtSignIcon mr="2" />
                </MenuItem>
                <MenuItem
                  d="flex"
                  justifyContent="space-between"
                  as={RouterLink}
                  to="/@me/settings"
                >
                  <span>Settings</span>
                  <SettingsIcon mr="2" />
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  d="flex"
                  justifyContent="space-between"
                  onClick={() =>
                    firebase
                      .auth()
                      .signOut()
                      .then(() => history.push("login"))
                  }
                >
                  <span>Log Out</span>
                  <LockIcon mr="2" />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Box>
      {children}
    </>
  );
};

export default Layout;

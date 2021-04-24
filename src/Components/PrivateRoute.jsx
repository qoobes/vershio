import { useToast } from "@chakra-ui/toast";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const toast = useToast();

  const mistakeToast = () =>
    toast({
      title: "You're not logged in",
      description: "Please log in to proceed",
      status: "error",
      isClosable: false,
      duration: 1000,
    });

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) return <Component {...props} />;
        else {
          mistakeToast();
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

import React from "react";
import {Navigate} from "react-router-dom";
import {token} from "../utils/getToken";

const PrivateRoute = ({element}) => {
  const authToken = token();
  return authToken ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

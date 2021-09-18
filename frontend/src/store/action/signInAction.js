import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";
// import { requestCart } from "./cartAction";

export const signIn = (response) => ({
  type: ActionTypes.SIGN_IN,
  payload: response,
});

export const signInError = (response) => ({
  type: ActionTypes.SIGN_IN_ERROR,
  payload: response,
});

export const requestSignIn = (credential) => {
  console.log(JSON.stringify(credential), "Signin");
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/signin",
        data: {
          email: credential.email,
          password: credential.password,
        },
      });
      console.log("Signin Successfull before");
      dispatch(signIn(response.data.userInfo));
      console.log(response.data.userInfo, "===response.data.userInfo");
      // dispatch(requestCart());
      dispatch(setLoaderValue(false));
      console.log("Signin Successfull after");
    } catch (err) {
      dispatch(signInError(err.message));
      dispatch(setLoaderValue(false));
      console.log(err, " Signin ===Error");
    }
  };
};

// class AuthM {

//     // authenticate a user. save a token string in local storage.
//     static authenticateUser(token) {
//           localStorage.setItem('token', token);
//     }

//     static isUserAuthenticated() {
//           return localStorage.getItem('token') !== null;
//     }

//     // deauthenticate a user. remove a token from local storage.
//     static deauthenticateUser() {
//           localStorage.removeItem('token');
//     }

//     static getToken() {
//           return localStorage.getItem('token');
//     }

// }

// export default AuthM;


import axios from "axios";
import swal from "sweetalert";
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    await axios.post("/api/users/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/login", user);
    // console.log(response);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get("/api/users/getallusers");
    // console.log(response.data);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAIL", payload: err });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    swal("User Deleted Succss!", "success");
    window.location.reload();
    // console.log(res);
  } catch (error) {
    swal("Errro While Deleteing User");
  }
};

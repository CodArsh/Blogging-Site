import { Box, Button, TextField, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 25px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;
const Image = styled("img")({
  width: 150,
  display: "flex",
  margin: "auto",
  padding: "40px 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
    text-transform:none;
    background:#FB641B;
    color#fff;
    height:48px;
    font-size:18px
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  font-size: 16px;
  box-shadow: 0 2px 5px 2px rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
  text-align: center;
`;
const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const signUpValues = {
    name: "",
    username: "",
    password: "",
  };
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, setAccount] = useState("login");
  const [signUp, setSignUp] = useState(signUpValues);
  const [error, setError] = useState("");
  const onInputeChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  // signup api integration
  const signupUser = async () => {
    const resp = await API.userSignup(signUp);
    if (resp?.isSuccess) {
      setError("");
      setSignUp(signUpValues);
      setAccount("login");
    } else {
      setError("Something went wrong");
    }
  };

  const loginInitValues = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInitValues);
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // login api integration
  const { setAcc } = useContext(DataContext);
  const loginUser = async () => {
    const resp = await API.userLogin(login);
    if (resp?.isSuccess) {
      setError("");
      console.log(resp);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${resp?.data?.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${resp?.data?.refreshToken}`
      );
      setAcc({ username: resp?.data?.username, name: resp?.data?.name });
      setIsAuth(true);
      navigate("/");
    } else {
      setError("Something went wrong! Please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Username"
            />
            <TextField
              variant="standard"
              type="password"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Password"
            />
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text>OR</Text>
            <SignupButton onClick={() => setAccount("signup")}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="name"
              onChange={(e) => onInputeChange(e)}
              label="Name"
            />
            <TextField
              variant="standard"
              name="username"
              onChange={(e) => onInputeChange(e)}
              label="Username"
            />
            <TextField
              variant="standard"
              name="password"
              onChange={(e) => onInputeChange(e)}
              label="Password"
            />
            {error && <Typography>{error}</Typography>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text>OR</Text>
            <LoginButton
              variant="contained"
              onClick={() => setAccount("login")}
            >
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;

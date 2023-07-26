import {
  Box,
  Button,
  FormControl,
  InputBase,
  styled,
  TextareaAutosize,
} from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
export default function CreatePost() {
  const initPost = {
    title: "",
    desc: "",
    pic: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  };
  const [post, setPost] = useState(initPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const { acc } = useContext(DataContext);
  const navigate = useNavigate();
  const url = post?.pic
    ? post?.pic.replace("/file", "/file/")
    : "https://img.freepik.com/free-vector/blue-futuristic-networking-technology_53876-100679.jpg?w=360";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //api call
        const resp = await API.uploadFile(data);
        post.pic = resp?.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = acc.username;
  }, [file]);
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    const resp = await API.createPost(post);
    if (resp?.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={url} alt={"banner"} />
      <StyledForm>
        <label htmlFor="fileInput">
          <AddIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          name="title"
          onChange={(e) => handleChange(e)}
          placeholder="Title"
        />
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledForm>
      <TextArea
        minRows={5}
        placeholder={"Write here"}
        onChange={(e) => handleChange(e)}
        name="desc"
      />
    </Container>
  );
}

// styling
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Container = styled(Box)`
  margin: 50px 100px;
`;

const StyledForm = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 10px;
  font-size: 20px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  border: none;
  outline: none;
`;

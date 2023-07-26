import { Box, Button, styled, TextareaAutosize } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Cmt from "./Cmt";

export default function Comments({ post }) {
  const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
  `;
  const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: "50%",
  });
  const Area = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
  `;
  const url = "https://cdn-icons-png.flaticon.com/512/6386/6386976.png";

  const initValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date(),
  };

  const [comment, setComment] = useState(initValues);
  const [comments, setComments] = useState([]);
  const { acc } = useContext(DataContext);
  useEffect(() => {
    const getData = async () => {
      const res = await API.getComment(post._id);
      if (res.isSuccess) {
        setComments(res.data);
      }
    };
    getData();
  }, [post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: acc.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const addComment = async (e) => {
    let res = await API.newComment(comment);
    if (res?.isSuccess) {
      setComment(initValues);
    }
  };
  return (
    <Box>
      <Container>
        <Image src={url} />
        <Area
          minRows={5}
          placeholder="write here"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button onClick={(e) => addComment(e)}>Comment</Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => <Cmt comment={comment} />)}
      </Box>
    </Box>
  );
}

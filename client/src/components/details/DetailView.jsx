import { Box, styled, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./comments/Comments";
function DetailView() {
  const Container = styled(Box)`
    margin: 50px 100px;
  `;

  const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  });

  const Edit = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
  `;

  const Delete = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
  `;

  const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
  `;
  const Description = styled(Typography)`
    word-break: break-word;
  `;

  const Author = styled(Box)(({ theme }) => ({
    color: "#878787",
    display: "flex",
    margin: "20px 0",

    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  }));

  const [post, setPost] = useState({});
  const { acc } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = post.pic
    ? post.pic.replace("file", "file/")
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let res = await API.getPostById(id);
      if (res?.isSuccess) {
        setPost(res?.data);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    let resp = await API.deletePost(post?._id);
    if (resp?.isSuccess) {
      navigate("/");
    }
  };
  return (
    <Container>
      <Image src={url} alt="blog" />
      <Box style={{ float: "right" }}>
        {acc?.username === post?.username && (
          <>
            <Link to={`/update/${post?._id}`}>
              <Edit color="primary" />
            </Link>
            <Delete onClick={() => deleteBlog()} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
        </Link>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.desc}</Description>
      <Comments post={post} />
    </Container>
  );
}

export default DetailView;

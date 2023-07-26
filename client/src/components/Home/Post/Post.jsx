import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { API } from "../../../service/api";
import OnePost from "./OnePost";
import { Link, useSearchParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    fetchData();
  }, [category]);
  const fetchData = async () => {
    const resp = await API.getAllPosts({ category: category || "" });
    if (resp?.isSuccess) {
      setPost(resp?.data);
    }
  };
  return (
    <>
      {post && post.length > 0 ? (
        post?.map((post) => (
          <Link
            to={`detail/${post?._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <OnePost post={post} />
          </Link>
        ))
      ) : (
        <Box style={{ margin: "30px" }}>No data</Box>
      )}
    </>
  );
}

export default Post;

import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import PostAuthor from "../components/PostAuthor";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post_detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail_container">
          <div className="post-detail_header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="post-detail_buttons">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn sm primary"
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail_thumbnail">
            <img
              src={`${import.meta.env.VITE_ASSETS_API_URL}/uploads/${
                post.thumbnail
              }`}
              alt=""
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;

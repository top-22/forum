import { useState } from "react";
import SurveyPost from "./surveyPost";
import TextPost from "./textPost";

interface PostProps {
  showTextPost: boolean;
}

function Post(props: PostProps) {
  if (props.showTextPost == false) {
    return <SurveyPost />;
  } else {
    return <TextPost />;
  }
}

const CreatePost = () => {
  const [showTextPost, setTextPost] = useState(false);

  const openSurveyPost = () => {
    setTextPost(false);
  };

  const openTextPost = () => {
    setTextPost(true);
  };

  return (
    <div className="bg-dark vh-100">
      <div>
        <h2 className="text-primary">Create a Post!</h2>
        <div>
          <button
            className="btn btn-primary m-1"
            type="button"
            onClick={openSurveyPost}
          >
            Survey Post
          </button>
          <button
            className="btn btn-primary m-1"
            type="button"
            onClick={openTextPost}
          >
            Text Post
          </button>
        </div>
      </div>

      <div>
        <Post showTextPost={showTextPost}></Post>
      </div>
    </div>
  );
};

export default CreatePost;

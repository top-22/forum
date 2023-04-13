import { useState, FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { Room, RoomUser } from "@prisma/client";

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

interface CreateProps {
  onHide: () => void
  show: boolean;
  room: Room & { users: RoomUser[] };
}

const CreatePost: FunctionComponent<CreateProps> = (props: CreateProps) => {

  const [showTextPost, setTextPost] = useState(true);

  const openSurveyPost = () => {
    setTextPost(false);
  };

  const openTextPost = () => {
    setTextPost(true);
  };

  return (
    <div className="bg-dark">

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      ba
      className="my-modal" 
    >
      <Modal.Header closeButton>
        <div>
          <h2 className="text-primary">Create a Post in {props.room.name}!</h2>
          <div>
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={openTextPost}
            >
              Text Post
            </button>
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={openSurveyPost}
            >
              Survey Post
            </button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Post showTextPost={showTextPost}></Post>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="save">Submit</Button>
      </Modal.Footer>
    </Modal>
    <style jsx>{`
        .my-modal {
          background-color: red;
        }
      `}</style>
      </div>
  );
};

export default CreatePost;

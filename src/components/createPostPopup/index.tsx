import { useState, FunctionComponent } from "react";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import { Room, RoomUser } from "@prisma/client";

import SurveyPost from "./surveyPost";
import TextPost from "./textPost";

interface PostProps {
  showTextPost: boolean;
  room: Room;
}

interface CreateProps {
  onHide: () => void;
  show: boolean;
  room: Room & { users: RoomUser[] };
}

function Post(props: PostProps): JSX.Element {
  if (props.showTextPost == false) {
    return <SurveyPost room={props.room} />;
  } else {
    return <TextPost room={props.room} />;
  }
}

const CreatePost: FunctionComponent<CreateProps> = (props: CreateProps) => {
  const router = useRouter();
  const [showTextPost, setTextPost] = useState(true);

  const openSurveyPost = (): void => {
    setTextPost(false);
  };

  const openTextPost = (): void => {
    setTextPost(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="my-modal"
    >
      <div className="bg-dark">
        <Modal.Header
          closeButton
          closeVariant="white"
          className="modal-footer border-0"
        >
          <div>
            <br />
            <h2 className="text-primary">
              Create a Post in {props.room.name}!
            </h2>
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
          <Post
            showTextPost={showTextPost}
            room={props.room}
            router={router}
          ></Post>
        </Modal.Body>
        <Modal.Footer className="modal-footer border-top-0">
          <Button type="submit" form="postForm">
            Submit
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CreatePost;

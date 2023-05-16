import { useState, FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { Room, RoomUser } from "@prisma/client";

import SurveyPost from "./surveyPost";
import TextPost from "./textPost";

interface PostProps {
  showTextPost: boolean;
  room: Room;
  username: string;
}

interface CreateProps {
  onHide: () => void;
  show: boolean;
  room: Room & { users: RoomUser[] };
  username: string;
}

function Post(props: PostProps): JSX.Element {
  if (props.showTextPost == false) {
    return <SurveyPost room={props.room} username={props.username} />;
  } else {
    return <TextPost room={props.room} username={props.username} />;
  }
}

const CreatePost: FunctionComponent<CreateProps> = (props: CreateProps) => {
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
      <div className="bg-dark rounded">
        <Modal.Header
          closeButton
          closeVariant="white"
          className="modal-footer border-0"
        >
          <div>
            <h2 className="text-primary">
              Create a Post in {props.room.name}!
            </h2>
            <div>
              <Button className="m-1" type="button" onClick={openTextPost}>
                Text Post
              </Button>
              <Button className="m-1" type="button" onClick={openSurveyPost}>
                Survey Post
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Post
            showTextPost={showTextPost}
            room={props.room}
            username={props.username}
          ></Post>
        </Modal.Body>
        <Modal.Footer className="modal-footer border-top-0">
          <Button type="submit" form="postForm">
            Create
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CreatePost;

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface TextProps {
  room: Room;
}

const TextPost = (props: TextProps): JSX.Element => {
  return (
    <div className="text-white px-4">
      <Form id="postForm" action="/api/createPost" method="POST">
        <br></br>
        <input type="hidden" name="room" value={props.room.id} />
        <input type="hidden" name="type" value="TEXT" />
        <Row className="my-2">
          <Col sm="3">
            <p className="fs-4">Title</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              id="title"
              name="name"
              required
              minLength={5}
              placeholder="title of your post"
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col sm="3">
            <p className="fs-4">Description</p>
          </Col>
          <Col>
            <Form.Control
              id="description"
              name="description"
              as="textarea"
              rows={3}
              placeholder="description of your post"
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col sm="3">
            <p className="fs-4">Tags</p>
          </Col>
          <Col>
            <Form.Control
              id="tags"
              name="tags"
              as="textarea"
              placeholder="#question #opinion"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="switch"
              id="readOnly"
              name="readOnly"
              label="Disable comments"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TextPost;

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface TextProps {
  room: Room;
}

const TextPost = (props: TextProps): JSX.Element => {
  return (
    <div>
      <Form id="postForm" action="/api/createPost" method="POST">
        <br></br>
        <input type="hidden" name="room" value={props.room.id} />
        <input type="hidden" name="type" value="TEXT" />
        <Row>
          <Col sm="3">
            <p>Title</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              id="title"
              name="name"
              required
              minLength={10}
              placeholder="title of your post"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Description</p>
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
        <br></br>
        <Row>
          <Col sm="3">
            <p>Tags</p>
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
        <br></br>
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

      <style jsx>{`
        p {
          font-size: 23px;
        }

        div {
          padding-left: 2em;
          padding-right: 2em;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TextPost;

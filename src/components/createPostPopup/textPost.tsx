import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface TextProps {
  room: Room;
  router: any;
}

const TextPost = (props: TextProps): JSX.Element => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (event.target.title.value) {
      // send a request to the server.
      try {
        const body = {
          title: event.target.title.value,
          description: event.target.description.value,
          room: event.target.room.value,
          tags: event.target.tags.value,
          commentsOff: event.target.commentsOff.checked,
        };

        const response = await fetch(`/api/createPost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        props.router.push(body.room + "/" + result.id);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("title required");
      return;
    }
  };

  return (
    <div>
      <Form id="postForm" onSubmit={handleSubmit}>
        <br></br>
        <input type="hidden" name="room" value={props.room.id} />
        <Row>
          <Col sm="3">
            <p>Title</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              id="title"
              name="title"
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
              id="commentsOff"
              name="commentsOff"
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

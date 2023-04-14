import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface SurveyProps {
  room: Room;
}

const SurveyPost = (props: SurveyProps) => {
  return (
    <div>
      <Form id="postForm" onSubmit={handleSubmit}>
        <br></br>
        <input type="hidden" name="room" value={props.room.id} />
        <Row>
          <Col sm="3">
            <p>Question</p>
          </Col>
          <Col>
            <Form.Control
              id="title"
              name="title"
              as="textarea"
              required
              minLength={10}
              placeholder="question of your survey"
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
              placeholder="Description of your question"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Answers</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              required
              minLength={1}
              placeholder="Option 1 (mandatory)"
            />
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              required
              minLength={1}
              placeholder="Option 2 (mandatory)"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3" />
          <Col>
            <Form.Control as="textarea" placeholder="Option 3" />
          </Col>
          <Col>
            <Form.Control as="textarea" placeholder="Option 4" />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Choose Tags</p>
          </Col>
          <Col>
            <Form.Select size="lg">
              <option>Choose tags which best describe your post</option>
              <option>Large select</option>
              <option>Test</option>
            </Form.Select>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Choose Endtime</p>
          </Col>
          <Col>
            <Form.Control
              id="tags"
              name="tags"
              as="textarea"
              placeholder="Fill in your #tags"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Check
              type="switch"
              id="custom-switch"
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

const handleSubmit = async (event) => {
  event.preventDefault();

  if (event.target.title.value) {
    // send a request to the server.
    console.log(event.target.room);
    try {
      const body = {
        title: event.target.title.value,
        description: event.target.description.value,
        room: event.target.room.value,
        tags: event.target.tags.value,
      };
      const response = await fetch(`/api/createPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      //console.log('test')
      //console.log(result)
      //alert(`Is this your thread: ${result.data}`)
      //await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("title required");
    return;
  }
};

export default SurveyPost;

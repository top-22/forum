import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface SurveyProps {
  room: Room;
}

const SurveyPost = (props: SurveyProps): JSX.Element => {
  return (
    <div>
      <Form id="postForm" action="/api/createPost" method="POST">
        <br></br>
        <input type="hidden" name="room" value={props.room.id} />
        <input type="hidden" name="type" value="SURVEY" />
        <Row>
          <Col sm="3">
            <p>Question</p>
          </Col>
          <Col>
            <Form.Control
              id="title"
              name="name"
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
              rows={3}
              placeholder="description of your survey"
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
              id="option1"
              name="option1"
              as="textarea"
              required
              minLength={1}
              placeholder="option 1 (mandatory)"
            />
          </Col>
          <Col>
            <Form.Control
              id="option2"
              name="option2"
              as="textarea"
              required
              minLength={1}
              placeholder="option 2 (mandatory)"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3" />
          <Col>
            <Form.Control
              id="option3"
              name="option3"
              as="textarea"
              placeholder="option 3"
            />
          </Col>
          <Col>
            <Form.Control
              id="option4"
              name="option4"
              as="textarea"
              placeholder="option 4"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Endtime</p>
          </Col>
          <Col>
            <Form.Select id="endtime" name="endtime" required size="lg">
              <option>1 hour</option>
              <option>3 hours</option>
              <option>1 day</option>
            </Form.Select>
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
        .test {
          font-size: 12px;
          color: red;
        }

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

export default SurveyPost;

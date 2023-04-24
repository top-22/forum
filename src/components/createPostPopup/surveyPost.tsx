import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Room } from "@prisma/client";

interface SurveyProps {
  room: Room;
  router: any;
}

const SurveyPost = (props: SurveyProps): JSX.Element => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (event.target.title.value) {
      // send a request to the server.
      try {
        const body = {
          title: event.target.title.value,
          description: event.target.description.value,
          room: event.target.room.value,
          tags: (event.target.tags.value ?? '').toLowerCase().split(" "),
          commentsOff: event.target.commentsOff.checked,
          options: [
            event.target.option1.value,
            event.target.option2.value,
            event.target.option3.value,
            event.target.option4.value,
          ],
          endtime: event.target.endtime.value,
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
              id="commentsOff"
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

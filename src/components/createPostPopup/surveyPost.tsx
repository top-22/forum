import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

       
const SurveyPost = () => {
  return (
    <div>
      <Form>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Question</p>
          </Col>
          <Col>
            <Form.Control as="textarea" placeholder="question of your survey" />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Description</p>
          </Col>
          <Col>
            <Form.Control
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
            <Form.Control as="textarea" placeholder="Option 1 (mandatory)" />
          </Col>
          <Col>
            <Form.Control as="textarea" placeholder="Option 2 (mandatory)" />
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
            <Form.Select size="lg">
              <option>Choose when the survey ends</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>1 day</option>
            </Form.Select>
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
          color: white
        }
      `}</style>
    </div>
  );
};

export default SurveyPost;

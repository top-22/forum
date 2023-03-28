import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const TextPost = () => {
  return (
    <div>
      <Form>
        <Row>
          <Col sm="3">
            <p>Choose Room:</p>
          </Col>
          <Col>
            <Form.Select size="lg">
              <option>Choose in which room to publish your post</option>
              <option>Large select</option>
              <option>Test</option>
            </Form.Select>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Title:</p>
          </Col>
          <Col>
            <Form.Control as="textarea" placeholder="title of your post" />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Subtitle:</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              placeholder="Short post describtion as a subtitle"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Description:</p>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description of your post goes here"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Choose Tags:</p>
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
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
        </Row>
      </Form>

      <style jsx>{`
        p {
          color: white;
          font-size: 26px;
        }

        div {
          padding: 5em;
        }
      `}</style>
    </div>
  );
};

export default TextPost;

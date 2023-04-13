import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

/*
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
*/

const TextPost = () => {
  return (
    <div>
      <Form id="save" onSubmit={saveThread}>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Title:</p>
          </Col>
          <Col>
            <Form.Control as="textarea"
            id="title"
            placeholder="title of your post"/>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="3">
            <p>Subtitle:</p>
          </Col>
          <Col>
            <Form.Control
              id="description"
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
              <option>Organization</option>
              <option>Study Question</option>
              <option>Ranting</option>
            </Form.Select>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Turn off comments"
            />
          </Col>
        </Row>
      </Form>

      <style jsx>{`
        p {
          font-size: 26px;
        }

        div {
          padding-left: 2em;
          padding-right: 2em;
        }
      `}</style>
    </div>
  );
};

const saveThread = (event: any) => {
  event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    console.log(`Hello ${title}, ${description}!`);

    //event.target.reset();
  
};

export default TextPost;

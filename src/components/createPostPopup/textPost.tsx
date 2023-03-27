import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const TextPost = () => {

  return (
    <div>
        <Form>
            <Row>
                <Col sm='3'>
                    <p>Choose Room:</p>
                </Col>
                <Col >
                    <Form.Select size="lg">
                        <option>Choose in which room to publish your post</option>
                        <option>Large select</option>
                        <option>Test</option>
                    </Form.Select>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col sm='3'>
                    <p>Question:</p>
                </Col>
                <Col>
                    <Form.Control as="textarea" placeholder="question of your survey" />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col sm='3'>
                    <p>Subtitle:</p>
                </Col>
                <Col>
                    <Form.Control as="textarea" placeholder="Short post describtion as a subtitle" />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col sm='3'>
                    <p>Answers:</p>
                </Col>
                <Col sm='3'>
                    <Form.Control as="textarea" placeholder="Option 1 (mandatory)" />
                </Col>
                <Col sm='3'>
                    <Form.Control as="textarea" placeholder="Option 2 (mandatory)" />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col sm='3'/>
                <Col sm='3'>
                    <Form.Control as="textarea" placeholder="Option 3" />
                </Col>
                <Col sm='3'>
                    <Form.Control as="textarea" placeholder="Option 4" />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col sm='3'>
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
                <Col sm='3'>
                    <p>Choose Endtime:</p>
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
  )
}

export default TextPost;

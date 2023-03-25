import { useState } from 'react'
import SurveyPost from './surveyPost';
import TextPost from './textPost';
import Button from 'react-bootstrap/Button';


interface Props{
  showTextPost: boolean
}

function Post(props: Props) {
if (props.showTextPost == false){
    return(<SurveyPost/>);
}
else {
    return(<TextPost/>);
}
}

interface CreatePostProps {
    setShow: (show: boolean) => void;
    show: boolean;
  }
  
const CreatePost = () => {

    const [showTextPost, setTextPost] = useState(false);

    
        const openSurveyPost = () => {
        setTextPost(false);
        }
    
    const openTextPost = () => {
        setTextPost(true);
    }


    return (
        <div className="bg-dark vh-100">
            <div>
                <h2 className="text-primary">Create a Post!</h2>
                <div>
                    <button className="btn btn-primary m-1" type="button" onClick={openSurveyPost} >Survey Post</button>
                    <button className="btn btn-primary m-1" type="button" onClick={openTextPost}>Text Post</button>
                </div>
            </div>

            <div>
                <Post showTextPost={showTextPost}></Post>
            </div>
        </div>
    )
}

export default CreatePost;

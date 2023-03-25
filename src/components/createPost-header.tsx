//import Head from 'next/head';
//import { Room, PrismaClient } from '@prisma/client';
//import { GetServerSideProps, NextPage } from 'next';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import SurveyPost from '../pages/createPost/surveyPost';


const CreatePostHeader = forwardRef((_props, _ref) => {
  //displayName: 'CreatePostHeader',
  const [showTextPost, setTextPost] = useState(false);

  const openSurveyPost = () => {
    setTextPost(false);
  }

  const openTextPost = () => {
    setTextPost(true);
  }
  //console.log(showTextPost)

  useImperativeHandle(_ref, () => ({
    getPostType: () => {
        return showTextPost;
    },
  }));

  return (
    <div>
        <button className="btn btn-primary m-1" type="button" onClick={openSurveyPost}>Text Post</button>
        <button className="btn btn-primary m-1" type="button" onClick={openTextPost} >Survey Post</button>
    </div>
  );

});
CreatePostHeader.displayName = 'CreatePostHeader';

export default React.memo(CreatePostHeader);

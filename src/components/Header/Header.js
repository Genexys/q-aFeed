import React from 'react';
import styled from 'styled-components';
import {Helmet} from "react-helmet";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f6c101;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Title = styled.h1`
  pointer-events: none;
`;

const Header = () => (
    <>
      <Helmet>
        <title>Q&A Feed</title>
        <meta name='description' content='Community Feed StackOver FLow' />
      </Helmet>

      <HeaderWrapper>
        <Title>Q&A Feed</Title>
      </HeaderWrapper>
    </>
);

export default Header;

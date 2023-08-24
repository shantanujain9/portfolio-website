import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Layout } from '@components';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import '../PathfindingVisualizer/PathfindingVisualizer.css';

// Styled components for the content container and the link container
const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 1100px; // or any value that suits your design
  background: white;
  padding: 80px; // you can adjust this value as needed
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // subtle shadow
  margin: 0 auto; // this centers the container on the page
  h1 {
    color: #777; // or 'black' or any color you desire
  }
`;

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const pathfindingalgorithm = ({ location }) => (
  <Layout location={location}>
    <StyledContentContainer>
      <h1>Pathfinding Algorithm Visualizer Project</h1>
      <PathfindingVisualizer />
      <StyledLinkContainer>
        <button>
          <Link to="/">Go to Home</Link>
        </button>
      </StyledLinkContainer>
    </StyledContentContainer>
  </Layout>
);

export default pathfindingalgorithm;

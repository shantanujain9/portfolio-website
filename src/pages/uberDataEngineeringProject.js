import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';

// Styled components for the iframe and the button
const StyledIframeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-bottom: 1px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledContentContainer = styled.div`
  padding-top: 120px; // Adjust this value based on the height of your navbar
  padding-left: 80px;
  padding-right: 80px;
`;

const uberDataEngineeringProject = ({ location }) => (
  <Layout location={location}>
    <StyledContentContainer>
      <h1>Uber Data Engineering Project</h1>
      <p>
        {' '}
        A data engineering project for analyzing New York City taxi data. I have created a Datapipe
        line, which loads the data from google bucket (cloud storage), then used mage pipline to
        transform and process the data, then exports the data to Google BigQuery Warehouse. The mage
        pipeline itself is deployed on google Virtual Instance. Then, utilized looker dashboard to
        visualize and analyze the findings.
      </p>
      <h4>The Project should take about a minute to load up.</h4>
      {/* ... rest of your content ... */}
    </StyledContentContainer>
    {/* Embedding your iframe */}
    <StyledIframeContainer>
      <iframe
        title="Uber Data Visualization"
        width="950"
        height="600"
        src="https://lookerstudio.google.com/embed/reporting/94aee7da-4059-49ef-829e-ccbc3e333a8b/page/7DfaD"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen></iframe>
    </StyledIframeContainer>

    <StyledButtonContainer>
      <Link to="/">Go back to Home</Link>
    </StyledButtonContainer>
  </Layout>
);

export default uberDataEngineeringProject;

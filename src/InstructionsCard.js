// InstructionsCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function InstructionsCard() {
  const listItemStyle = {
    listStyle: 'none', // Remove bullet points
  };

  return (
    <Card style={{textAlign: 'left', background: '#000000', color: 'white',  margin: '20px'}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body1">
          Welcome to our search tool. Here's how to use it:
        </Typography>
        <ul style={{ padding: 0 }}>
          <li style={listItemStyle}>1. Enter your search repository in the search bar. Format: username/reponame</li>
          <li style={listItemStyle}>2. Select your search options using the radio buttons. The radio buttons help you choose embedding features.</li>
          <li style={listItemStyle}>3. Click the "Search" button to find results.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default InstructionsCard;

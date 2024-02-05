// InstructionsCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function InstructionsCard() {
  const listItemStyle = {
    listStyle: 'none', // Remove bullet points
  };

  return (
    <Card style={{textAlign: 'left', background: '#FFFFFF', color: 'black',  margin: '20px'}}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="h4">
          Welcome to our search tool. Here's how to use it:
        </Typography>
        <ul style={{ padding: 0 }}>
          <li style={listItemStyle}><h4>1. Enter your search repository in the search bar. Format: username/reponame</h4></li>
          <li style={listItemStyle}><h4>2. Select your search options using the radio buttons. The radio buttons help you choose embedding features.</h4></li>
          <li style={listItemStyle}><h4>3. Click the "Search" button to find results.</h4></li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default InstructionsCard;

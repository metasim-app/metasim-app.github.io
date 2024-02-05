import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './App.css'; // Import your CSS file for styling
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InstructionsCard from './InstructionsCard'; // Import the InstructionsCard component


function App() {

  useEffect(() => {
    document.title = "MetaSim"; // Set the page title
  }, []); // The empty array means this effect runs once after the initial render

  const [data, setData] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('1');
  const [noResultsDialogOpen, setNoResultsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);  
  const [resultStatus, setResultStatus] = useState(0);
  

  const BoldHeader = ({ children }) => {
      return (
        <th style={{ fontWeight: 'bold' }}>
          {children}
        </th>
      );
  };
  const columns = [
    { field: 'id', headerName: 'ID', type: 'number', width: 5,
        type: 'string', 
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'ID'}
              </strong>
       ),
    },
    { field: 'repo_id', headerName: 'Repository Id',  type: 'number', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Repo Id'}
              </strong>
       ),
    },
      
    { field: 'title', headerName: 'Repo', 
      type: 'string', width: 200,
      renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Repo Full Name'}
              </strong>
       ),
        // Use a custom render function for the cell
        renderCell: (params) => {
          const url = params.row.url;
          return (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {params.value}
            </a>
          );
        },
    
    },
    { field: 'description', headerName: 'Description',  type: 'string', 
        type: 'string', width: 400,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Description'}
              </strong>
       ),
       renderCell: (params) => {
          return (
              params.value == "None" ? <p></p> : <p>{params.value}</p>
          );
        },
    },
    { field: 'sim_score', headerName: 'Similarity', type: 'string', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Similarity(%)'}
              </strong>
       ),
    },
    { field: 'stargazers_count', headerName: 'Star',  type: 'number', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Star'}
              </strong>
       ),
    },
    { field: 'forks_count', headerName: 'Fork',  type: 'number', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Fork'}
              </strong>
       ),
    },
    { field: 'topics', headerName: 'Topics',  type: 'string', width: 300,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Topics'}
              </strong>
       ),
    },
    { field: 'language', headerName: 'Language',  type: 'string', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Language'}
              </strong>
       ),
    },
    { field: 'archived', headerName: 'Archived',  type: 'string', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'archived'}
              </strong>
       ),
    },
    { field: 'created_at', headerName: 'created_at',  type: 'dateTime', width: 150,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Creation At'}
              </strong>
       ),
       valueGetter: ({ value }) => value && new Date(value),
    },
    { field: 'homepage', headerName: 'Homepage',  type: 'string', width: 150,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Homepage'}
              </strong>
       ),
       // Use a custom render function for the cell
        renderCell: (params) => {
          return (
            (params.value == "None" || params.value == "") ? <p></p> : 
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                  {params.value}
                </a>
          );
        },
    },
    { field: 'license', headerName: 'License',  type: 'string', width: 150,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'License'}
              </strong>
       ),
       // Use a custom render function for the cell
        renderCell: (params) => {
          return (
            (params.value == "None" || params.value == "") ? <p></p> : 
                <p>
                  {params.value}
                </p>
          );
        },
    },
    { field: 'open_issues_count', headerName: 'Open Issues',  type: 'number', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Open Issues'}
              </strong>
       ),
    },
    { field: 'size', headerName: 'Size',  type: 'number', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'Size(KB)'}
              </strong>
       ),
    },
    { field: 'user_type', headerName: 'User Type', type: 'string', width: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
              <strong>
                {'User Type'}
              </strong>
       ),
    },
  ];

  const generateRowsWithIds = (data) => {
    // Generate rows with unique IDs using row index
    return data.map((item, index) => ({ ...item, id: index + 1 }));
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    setHasData(false);
    try {
      const response = await fetch(`https://metadatas.net/api/get_data/?search=${searchTerm}&radio=${selectedRadio}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);

      // Generate rows with unique IDs
      const rowsWithIds = generateRowsWithIds(jsonData['data']);
      setSearchResults(rowsWithIds);

      setCurrentPage(1);
      // console.log(jsonData);

      if (jsonData['status_code'] === 404) {
        setNoResultsDialogOpen(true);
        setResultStatus(1);
      } else if (jsonData['status_code'] === 403 || jsonData['status_code'] === 429) {
        setNoResultsDialogOpen(true);
        setResultStatus(2);
      } else {
        setResultStatus(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setHasData(true);
    }
  };

  useEffect(() => {
    // You can also fetch initial data here if needed
  }, []);

  const openLinkInNewWindow = (link) => {
    window.open(link, '_blank');
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseNoResultsDialog = () => {
    setNoResultsDialogOpen(false);
  };


  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#003da5',  padding: '5px', textAlign: 'center' }}>
      		<h1 style={{ color: '#ffb81c' }}>MetaSim: Quantifying the importance of metadata features in
repository similarity
	  	</h1>
      </header>
      <Grid container >
        <Grid item xs={12} sm={9}>
          <InstructionsCard />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" style={{ margin: '5px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Enter search repo"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            placeholder="facebookresearch/llama"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <RadioGroup
            aria-label="Search Options"
            name="searchOptions"
            value={selectedRadio}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Name,Description"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Name,Description,Topics"
            />
          </RadioGroup>
        </Grid>
                  
        <Grid item xs={12} sm={12} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    classes={{ root: 'customButton' }}
                  >
                    Search
                  </Button>
        </Grid>
      </Grid>

      <Grid container style={{ minHeight: 'calc(100vh - 168px)', padding: '20px' }}>
        <Grid item xs={12}>
          {isLoading ? (
            <div className="loader-container">
              <CircularProgress />
              <Typography variant="body1">Please wait for 10~15 seconds</Typography>
            </div>
          ) : null}
          {hasData ? (
            <div style={{ width: '100%', height: 'calc(100vh - 250px)',  overflowX: 'auto' }}>
              <DataGrid
                rows={searchResults}
                columns={columns}
                pagination
                pageSize={resultsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                slots={{ toolbar: GridToolbar }}
                sx={{ overflowX: 'scroll' }}
              />
            </div>
          ) : null}
        </Grid>
      </Grid>
      <footer style={{ backgroundColor: '#003da5', color: '#FFFFFF', textAlign: 'center', padding: '5px', position: 'fixed', bottom: '0', width: '100%' }}>
      <p>
        &copy; {2024} MAVERICS @ UCRiverside.
      </p>
    </footer>
      {/* No Results Dialog */}
      <Dialog open={noResultsDialogOpen} onClose={handleCloseNoResultsDialog}>
        <DialogTitle>No Results Found</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
              {resultStatus===1 ? "No results found. Please provide an active repo, or follow Input format match." : "GitHub API limit exceeded. Please try again after 60 minutes."}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoResultsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default App;

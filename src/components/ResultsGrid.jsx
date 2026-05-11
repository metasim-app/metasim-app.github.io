import { Grid, Box } from '@mui/material'
import RepoCard from './RepoCard.jsx'

export default function ResultsGrid({ items }) {
  return (
    <Grid container spacing={2.5}>
      {items.map((repo, i) => (
        <Grid item xs={12} sm={6} lg={4} key={repo.id}>
          <Box className="reveal" sx={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}>
            <RepoCard repo={repo} rank={i + 1} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

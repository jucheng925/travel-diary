import { Box, Stack } from '@mui/material'
import React from 'react'

const SearchBar = ({onSearch, filterRating}) => {
  return (
    <Stack direction="row" spacing={3}>
      <Box>
        <label htmlFor="search" style={{fontSize: 20, fontWeight: "bold"}}>Search Posts:</label>
        <input
          type="text"
          id="search"
          placeholder="Type a term to search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </Box>
      <Box>
        <label style={{fontSize: 20, fontWeight: "bold"}}>Filter by Rating:</label>
          <select onChange={(e)=> filterRating(e.target.value)}>
            <option value="all">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </select>

      </Box>
    </Stack>
  )
}

export default SearchBar

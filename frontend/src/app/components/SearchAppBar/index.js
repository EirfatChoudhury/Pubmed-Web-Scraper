'use client';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdvancedSearch, selectFrom, selectTo, selectTerm, setTerm } from '@/slices/searchSlice';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '8ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

const SearchAppBar = () => {
  const dispatch = useDispatch();
  const from = useSelector(selectFrom)
  const to = useSelector(selectTo)
  const advancedSearch = useSelector(selectAdvancedSearch)
  const term = useSelector(selectTerm)

  useEffect(() => {
    const STATE = {
      from,
      to,
      advancedSearch,
      term
    }

    console.log("STATE:", STATE)
  }, [from, to, advancedSearch, term])

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'red' }}>
      <AppBar position="static" style={{ background: 'darkred', color: 'whitesmoke' }}>
        <Toolbar>
          <Sidebar />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}
          >
            Pubmed Abstract Scraper
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => dispatch(setTerm(event.target.value))}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar

import React from 'react';
import { Box } from '@mui/material';
import CategoryFormComponent from '../components/categoryComponents/CategoryFormComponent';
import ShowCategoryComponent from '../components/categoryComponents/ShowCategoryComponent';

export default function CategoryPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: 7,
          height: '85vh',
        }}
      >
        <Box
          sx={{
            flex: '0 1 auto',
          }}
        >
          <CategoryFormComponent />
        </Box>
        <Box
          sx={{
            flex: '1 1 auto',
            overflow: 'auto',
          }}
        >
          <ShowCategoryComponent />
        </Box>
      </Box>
    </>
  );
}

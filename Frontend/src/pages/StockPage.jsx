import React, { useState } from 'react';

import {
  Box
} from '@mui/material';

import StockFormComponent from '../components/stockComponents/StockFormComponent.jsx';
import ShowStockComponent from '../components/stockComponents/ShowStockComponent.jsx'

export default function StockPage() {
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
          <StockFormComponent />
        </Box>
        <Box
          sx={{
            flex: '1 1 auto',
            overflow: 'auto',
          }}
        >
          <ShowStockComponent />
        </Box>
      </Box>
    </>
  )
}

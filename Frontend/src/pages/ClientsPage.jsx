import React, { useState } from 'react';
import { Box} from '@mui/material';

import ClientFormComponent from '../components/clientComponents/ClientFormComponent.jsx'
import ShowClientComponent from '../components/clientComponents/ShowClientComponent.jsx';

export default function ClientsPage() {

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
          <ClientFormComponent />

        </Box>
        <Box
          sx={{
            flex: '1 1 auto', 
            overflow: 'auto', 
          }}
        >
          <ShowClientComponent />
        </Box>
      </Box>
    </>
  );
}

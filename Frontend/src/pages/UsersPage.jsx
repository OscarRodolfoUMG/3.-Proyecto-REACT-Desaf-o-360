import React, { useState } from 'react';

import {
  Box
} from '@mui/material';

import UserFormComponent from '../components/userComponents/UserFormComponent.jsx'
import ShowUserComponent from '../components/userComponents/ShowUserComponent.jsx';

export default function UsersPage() {
 
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
          <UserFormComponent />
        </Box>
        <Box
          sx={{
            flex: '1 1 auto', 
            overflow: 'auto', 
          }}
        >
          <ShowUserComponent />
        </Box>
      </Box>
    </>
  );
}

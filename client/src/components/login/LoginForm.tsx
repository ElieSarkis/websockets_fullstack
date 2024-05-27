import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Typography } from '@mui/material';
import { users } from './usersData.ts';
import webSocketService from '../../services/WebSocketService.ts';

const StyledContainer = styled('div')({
  width: '30%',
  margin: 'auto',
  marginTop: '5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  '@media (max-width: 600px)': {
    width: '70%',
  },
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
  padding: '10px',
});

interface LoginFormProps {
  onLogin: (status: boolean, userRole: 'user' | 'admin') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      console.log('Login successful');
      setError('');
      onLogin(true, user.role as 'user' | 'admin');
      webSocketService.connect();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <StyledContainer>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;

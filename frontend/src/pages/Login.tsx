import { useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { Container, FormControl, TextField, Button } from '@mui/material';

import { AuthContext } from '../context/authContext';
import { loginUser } from '../api/Users';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useContext(AuthContext);

  const onLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUserMutation.mutate({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
  };

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: { userId: string; token: string }) => {
      console.log(data);
      auth.login(data.userId, data.token);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <Container
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        border: 1,
        borderRadius: 2,
        borderColor: 'primary.main',
        mt: 2,
      }}
      onSubmit={onLoginHandler}
    >
      <FormControl>
        <TextField label="Email" variant="outlined" inputRef={emailRef} />
      </FormControl>
      <FormControl>
        <TextField label="Password" variant="outlined" inputRef={passwordRef} />
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        sx={{
          px: 4,
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;

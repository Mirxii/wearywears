import { useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { Container, FormControl, TextField, Button } from '@mui/material';

import { AuthContext } from '../context/authContext';
import { signUpUser } from '../api/Users';

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useContext(AuthContext);

  const onSignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUpUserMutation.mutate({
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
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
      onSubmit={onSignUpHandler}
    >
      <FormControl>
        <TextField label="Name" variant="outlined" inputRef={nameRef} />
      </FormControl>
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
        Sign Up
      </Button>
    </Container>
  );
};

export default Signup;

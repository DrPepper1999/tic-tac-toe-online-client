import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../authApiSlice';
import { useAppDispatch } from '../../../app/hooks/hooks';
import { setCredentials } from '../authSlice';
import { MyBackdrop } from '../../../components/common/MyBackdrop';
import { ErrorMessage } from '../../../components/common/ErrorMessage';

export default function Login() {
    const emailRef = useRef<any>();
    const errRef = useRef<any>();
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      setErrMsg("");
    }, [password, email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await login({ email, password })
      .unwrap()
      .catch((e:any) => setErrMsg(e.data.title));

      dispatch(
        setCredentials({
          id: userData.id,
          email,
          name: userData.name,
          token: userData.token,
        })
      );
      setPwd("");
      navigate("/roomCreater");
    } catch (err:any) {
      setErrMsg(err?.data.title);
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e:any) => setEmail(e.target.value);

  const handlePwdInput = (e:any) => setPwd(e.target.value);

  return (
    isLoading ? (
      <MyBackdrop  isLoading={isLoading}/>
    ) : (
      <Grid container component="main" sx={{ height: 'calc(100vh - 161px)' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/login/LoginGachi.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <ErrorMessage errRef={errRef} errMsgs={[errMsg]}/>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                inputRef={emailRef}
                value={email}
                onChange={handleEmailInput}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={errMsg != '' ? errMsg : ''}
                error={errMsg != ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handlePwdInput}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errMsg != '' ? errMsg : ''}
                error={errMsg != ''}
              />
              <Grid container item justifyContent='left'>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  );
}
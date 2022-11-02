import './App.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import DownloadOutlined from '@mui/icons-material/FileDownloadSharp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';

import InstallService from './InstallService';

import logo from './logo.svg';

export const App: React.FC = () => {

  const urlMain = "https://abstracts.codes";
  const urlCli = "https://abstracts.codes/client";
  const urlDoc = "https://abstracts.codes/document";

  const abstractsTheme: any = createTheme({
    palette: {
      primary: {
        main: '#4594D0',
        dark: '#4594D0',
        light: '#4594D0',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#FFFFFF',
        dark: '#FFFFFF',
        light: '#FFFFFF',
        contrastText: '#4594D0'
      }
    }
  });

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showDBPassword, setShowDBPassword] = useState<boolean>(false);
  const [showAPISecret, setShowAPISecret] = useState<boolean>(false);
  const [showDialogRequirements, setShowDialogRequirements] = useState<boolean>(false);
  const [showDialogRequirementA, setShowDialogRequirementA] = useState<boolean>(false);
  const [showDialogRequirementB, setShowDialogRequirementB] = useState<boolean>(false);
  const [showDialogError, setShowDialogError] = useState<any>(null);
  const [showDialogSuccess, setShowDialogSuccess] = useState<any>(null);

  const { register, handleSubmit, trigger, setValue, getValues, formState: { errors } } = useForm();

  const formGroup: any = {
    site_name: register('site_name', {
      required: 'Site Name is required'
    }),
    type: register('type', {
      required: 'Type is required'
    }),
    name: register('name', {
      required: 'Name is required'
    }),
    username: register('username', {
      required: 'Username is required'
    }),
    password: register('password', {
      required: 'Password is required'
    }),
    confirm_password: register('confirm_password', {
      required: 'Confirm Password is required',
      validate: value => value === getValues('password') || 'Passwords do not match'
    }),
    database_host: register('database_host', {
      required: 'Database Host is required'
    }),
    database_name: register('database_name', {
      required: 'Database Schema is required'
    }),
    database_login: register('database_login', {
      required: 'Database Login is required'
    }),
    database_password: register('database_password'),
    password_salt: register('password_salt', {
      required: 'Password Salt is required'
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClickShowDBPassword = () => {
    setShowDBPassword(!showDBPassword);
  };

  const handleClickShowAPISecret = () => {
    setShowAPISecret(!showAPISecret);
  };

  const onSubmit = async (value: any) => {

    setShowLoading(true);

    await InstallService.config(value).then(async (configData: any) => {
      await InstallService.database(value).then(async (databaseData: any) => {
        await InstallService.directories(value).then(async (directoriesData: any) => {
          await InstallService.server(value).then(async (serverData: any) => {
            setShowDialogSuccess(databaseData);
          }).catch((error: any) => {
            setShowDialogError(error);
          });
        }).catch((error: any) => {
          setShowDialogError(error);
        });
      }).catch((error: any) => {
        setShowDialogError(error);
      });
    }).catch((error: any) => {
      setShowDialogError(error);
    });

    setShowLoading(false);

  }

  useEffect(() => {
    setShowDialogRequirements(true);
  }, []);

  return (
    <ThemeProvider theme={abstractsTheme}>

      <div className="app">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <div className="main-content">
                <div className="framework-detail">
                  <a href={urlMain} target="_blank">
                    <img src={logo} alt="logo" />
                  </a>
                  <div>
                    <Typography sx={{ fontSize: 14, mb: '1rem', color: 'rgba(255, 255, 255, 75%)' }}
                      gutterBottom
                    >
                      Codeless API/web framework<br />
                      Powered by <a href={urlMain} target="_blank">
                        Abstracts
                      </a>
                    </Typography>
                  </div>
                  <div>
                    <a href={urlCli} target="_blank">
                      <Button color="secondary" variant="outlined" sx={{ mx: '2px' }}>
                        Client
                      </Button>
                    </a>
                    <a href={urlDoc} target="_blank">
                      <Button color="secondary" variant="outlined" sx={{ mx: '2px' }}>
                        Document
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ m: '1.5rem' }}>
                  <Card variant='elevation'
                    elevation={16}
                    sx={{
                      '@media only screen and (min-width: 768px)': {
                        maxHeight: 'calc(100vh - 3.5rem)',
                      },
                      overflow: 'auto'
                    }}
                  >
                    <CardContent sx={{ m: '1rem' }}>
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase', mb: '1rem' }}
                        color="text.secondary" gutterBottom
                      >
                        Site
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="name">Site Name</InputLabel>
                        <OutlinedInput
                          id="site_name"
                          type="text"
                          label="Site Name"
                          autoComplete="off"
                          {...formGroup.site_name}
                        />
                        <ErrorMessage errors={errors} name="site_name"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                          id="type"
                          label="Type"
                          defaultValue="web"
                          onChange={async (e: ChangeEvent<HTMLInputElement>) => {

                            if (e.target.value !== getValues('type')) {
                              setValue('type', e.target.value);
                              trigger();
                            }
                          }}
                          {...formGroup.type}
                        >
                          <MenuItem value="web">
                            Web
                          </MenuItem>
                          <MenuItem value="api">
                            API only
                          </MenuItem>
                        </Select>
                        <ErrorMessage errors={errors} name="type"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase', my: '1rem' }}
                        color="text.secondary" gutterBottom
                      >
                        Creator Account
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                          id="name"
                          type="text"
                          label="Name"
                          autoComplete="off"
                          {...formGroup.name}
                        />
                        <ErrorMessage errors={errors} name="name"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                          id="username"
                          type="text"
                          label="Username"
                          autoComplete="off"
                          {...formGroup.username}
                        />
                        <ErrorMessage errors={errors} name="username"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          autoComplete="off"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          onChange={() => trigger()}
                          {...formGroup.password}
                        />
                        <ErrorMessage errors={errors} name="password"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          label="Confirm Password"
                          autoComplete="off"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...formGroup.confirm_password}
                        />
                        <ErrorMessage errors={errors} name="confirm_password"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                      </FormControl>
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase', my: '1rem' }}
                        color="text.secondary" gutterBottom
                      >
                        Database
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="database-host">Host</InputLabel>
                        <OutlinedInput
                          id="database-host"
                          type="text"
                          label="Host"
                          {...formGroup.database_host}
                        />
                        <ErrorMessage errors={errors} name="database_host"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                        <div className="form-help">
                          Ex. localhost
                        </div>
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="database-name">Schema</InputLabel>
                        <OutlinedInput
                          id="database-name"
                          type="text"
                          label="Schema"
                          {...formGroup.database_name}
                        />
                        <ErrorMessage errors={errors} name="database_name"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                        <div className="form-help">
                          Name of schema you created
                        </div>
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="database-login">Login</InputLabel>
                        <OutlinedInput
                          id="database-login"
                          type="text"
                          label="Login"
                          {...formGroup.database_login}
                        />
                        <ErrorMessage errors={errors} name="database_login"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                        <div className="form-help">
                          User's login to access this schema
                        </div>
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="database-password">Password</InputLabel>
                        <OutlinedInput
                          id="database-password"
                          type={showDBPassword ? 'text' : 'password'}
                          label="Password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowDBPassword}
                                edge="end"
                              >
                                {showDBPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...formGroup.database_password}
                        />
                        <ErrorMessage errors={errors} name="database_password"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                        <div className="form-help">
                          User's password to access this schema
                        </div>
                      </FormControl>
                      <Typography sx={{ fontSize: 14, textTransform: 'uppercase', my: '1rem' }}
                        color="text.secondary" gutterBottom
                      >
                        Security
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel htmlFor="password-salt">Password Salt</InputLabel>
                        <OutlinedInput
                          id="password-salt"
                          type="text"
                          label="Password Salt"
                          {...formGroup.password_salt}
                        />
                        <ErrorMessage errors={errors} name="password_salt"
                          render={({ message }) =>
                            <div className="form-help error">
                              {message ? message : ''}
                            </div>
                          }
                        />
                        <div className="form-help">
                          Salt is string of characters known only to the site added to password before it is hashed, makes your hashed password unique from another site for security improvement
                        </div>
                      </FormControl>
                    </CardContent>
                    <CardActions sx={{ mx: '1rem', mb: '1.5rem', px: '1rem' }}>
                      <Button fullWidth variant="outlined"
                        type="submit"
                        startIcon={<DownloadOutlined />}
                      >
                        Install
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Backdrop open={showLoading ? true : false}>
        <CircularProgress color="secondary" />
      </Backdrop>

      <Dialog disableEscapeKeyDown
        open={showDialogSuccess ? true : false}
        onClose={(e: {}, reason: "backdropClick" | "escapeKeyDown") => {
          if (reason !== "backdropClick") {
            setShowDialogSuccess(false)
          }
        }}
      >
        <DialogTitle sx={{ mt: '1.5rem', textAlign: 'center' }}>
          <CheckCircleOutlineRounded sx={{ fontSize: 60, color: '#2ab771' }} />
        </DialogTitle>
        {
          showDialogSuccess && showDialogSuccess.key && showDialogSuccess.secret ?
            <DialogContent sx={{ minWidth: '200px' }}>
              <DialogContentText sx={{ textAlign: 'center', mb: '1.5rem' }}>
                Successfully installed!<br />
                <span className="form-help">
                  *Note down API <strong>Key</strong> and <strong>Secret</strong> to use with <strong>Abstracts Client</strong>
                </span>
              </DialogContentText>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel htmlFor="api-key">Key</InputLabel>
                <OutlinedInput
                  id="api-key"
                  type="text"
                  label="Key"
                  value={showDialogSuccess.key}
                  readOnly={true}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel htmlFor="api-secret">Secret</InputLabel>
                <OutlinedInput
                  id="api-secret"
                  type={showAPISecret ? 'text' : 'password'}
                  label="Secret"
                  value={showDialogSuccess.secret}
                  readOnly={true}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle secret visibility"
                        onClick={handleClickShowAPISecret}
                        edge="end"
                      >
                        {showAPISecret ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </DialogContent>
            : <></>
        }
        <DialogActions>
          <Button
            endIcon={<ArrowForwardRounded />}
            onClick={() => window.location.reload()}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog disableEscapeKeyDown
        open={showDialogRequirements}
        onClose={(e: {}, reason: "backdropClick" | "escapeKeyDown") => {
          if (reason !== "backdropClick") {
            setShowDialogRequirements(false)
          }
        }}
      >
        <DialogTitle>
          Requirements
        </DialogTitle>
        <DialogContent sx={{ minWidth: '200px' }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked !== showDialogRequirementA) {
                setShowDialogRequirementA(e.target.checked)
              }
            }
            } />} value={true} label="Set permission 777 to the root of your project" />
            <FormControlLabel control={<Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked !== showDialogRequirementB) {
                setShowDialogRequirementB(e.target.checked)
              }
            }
            } />} value={true} label="Create a database schema" />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!showDialogRequirementA || !showDialogRequirementB}
            onClick={() => setShowDialogRequirements(false)}
            endIcon={<ArrowForwardRounded />}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={() => setShowDialogError(false)} open={showDialogError ? true : false}>
        <DialogTitle sx={{ mt: '1.5rem', textAlign: 'center' }}>
          <ErrorOutlineRounded sx={{ fontSize: 60, color: '#b72a3d' }} />
        </DialogTitle>
        <DialogContent sx={{ minWidth: '200px' }}>
          <DialogContentText sx={{ textAlign: 'center' }}>
            {showDialogError}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialogError(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider >
  );
}

export default App;

import React, { useState } from 'react';

//All Material UI Imports
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  IconButton,
  Snackbar,
  Tooltip,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    minHeight: '25vh',
  },
  title: {
    fontSize: 14,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  action: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));

export default function AddNote() {
  const classes = useStyles();

  const CHARACTER_LIMIT = 255;

  const [value, setValue] = React.useState('');
  const [check, setCheck] = React.useState(0);
  const [temp, setTemp] = React.useState({ text: 'temp', id: 'note-0' });
  const [list, setList] = React.useState([
    { text: 'test', id: 0, checked: false },
    {
      text: 'test 2',
      id: 1,
      checked: false,
    },
  ]);
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackText, setSnackText] = React.useState('');
  const [snackStatus, setSnackStatus] = React.useState('');

  function displayPagination() {
    if (list.length <= 0) {
      return null;
    } else {
      return [...Array(Math.ceil(list.length / 36)).keys()].map((k, i) => (
        <Button
          key={k}
          style={{
            padding: '0rem !important',
            marginLeft: '6px',
            borderRadius: '5rem',
            border: '1px solid rgba(0,0,0,.1)',
          }}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </Button>
      ));
    }
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const Add = () => {
    if (value.replace(/\s*/gi, '').length <= 0) {
      setSnackText('Empty Text Field');
      setSnackStatus('error');
      setOpenSnack(true);
      setValue('');
    } else {
      setList((prev) => {
        return [
          ...prev,
          { text: value.trim(), id: list.length, checked: false },
        ];
      });
      setValue('');
    }
  };

  const Swap = () => {
    var temp = JSON.parse(JSON.stringify(list));

    let s = [];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].checked === true) {
        s.push(i);
      }
    }
    [temp[s[0]].text, temp[s[1]].text] = [temp[s[1]].text, temp[s[0]].text];
    [temp[s[0]].checked, temp[s[1]].checked] = [false, false];
    setCheck(0);
    setList(temp);
    setSnackText('Note Swapped Successfully!');
    setSnackStatus('success');
    setOpenSnack(true);
  };

  const DeleteWindow = () => {
    const [deleteValue, setDeleteValue] = React.useState(temp);

    const Delete = (data) => {
      var temp = JSON.parse(JSON.stringify(list));
      if (data.checked === true) {
        setCheck(check - 1);
      }
      temp.splice(data.id, 1);
      setList(temp);
      setDeleteOpen(false);

      setSnackText('Note was Deleted Successfully!');
      setSnackStatus('error');
      setOpenSnack(true);
    };

    return (
      <div>
        <Dialog
          open={deleteOpen}
          onClose={(e) => {
            setDeleteOpen(false);
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Confirm Delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {deleteValue.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                setDeleteOpen(false);
              }}
              color='primary'
            >
              No
            </Button>
            <Button
              onClick={(e) => {
                Delete(deleteValue);
              }}
              color='primary'
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const EditWindow = () => {
    const [editValue, setEditValue] = React.useState(temp);

    const Edit = (data) => {
      var temp = JSON.parse(JSON.stringify(list));

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === data.id) {
          temp[i].text = data.text;
        }
      }
      setList(temp);
      setEditOpen(false);
      setSnackText('Note Edited Successfully!');
      setSnackStatus('success');
      setOpenSnack(true);
    };

    // window.alert(JSON.stringify(editValue.text.length));
    return (
      <div>
        <Dialog
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
          }}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Edit Note</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Edit Note for {editValue.id}</DialogContentText> */}
            <TextField
              autoFocus
              multiline
              margin='dense'
              id='editNote'
              label='Edit Note '
              fullWidth
              name='text'
              value={editValue.text}
              onChange={(event) => {
                // setEditValue(event.target.value);
                const value = event.target.value;

                setEditValue({
                  ...editValue,
                  [event.target.name]: value,
                });
              }}
              helperText={`${editValue.text.length}/${CHARACTER_LIMIT}`}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setEditOpen(false);
              }}
              color='primary'
            >
              Cancel
            </Button>
            <Button onClick={() => Edit(editValue)} color='primary'>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const Notes = () => {
    const handleCheckChange = (event, data) => {
      var temp = JSON.parse(JSON.stringify(list));
      if (check >= 2 && event === true) {
        setSnackText('Only 2 Notes allowed for swap at a time');
        setSnackStatus('error');
        setOpenSnack(true);
      } else {
        if (event === true) {
          setCheck(check + 1);
        } else {
          setCheck(check - 1);
        }

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === data.id) {
            temp[i].checked = event;
          }
        }
        setList(temp);
      }
    };

    return (
      <Grid
        container
        spacing={2}
        alignItems='center'
        justify='center'
        style={{ marginTop: '10px', padding: '10px' }}
      >
        {list.slice((page - 1) * 36, page * 36).map((note) => (
          <Grid item xs={8} sm={4} lg={2}>
            <Card className={classes.root} style={{ position: 'relative' }}>
              <div className='card_circle'> </div>

              <CardContent style={{ minHeight: '80%', marginTop: '90px' }}>
                <Typography variant='h6' color='textPrimary' component='p'>
                  {note.text}
                </Typography>
              </CardContent>
              <CardActions
                style={{ justifyContent: 'center', padding: 0, margin: 0 }}
              >
                <Tooltip title='Edit'>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      setEditOpen(true);
                      setTemp(note);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Select'>
                  <Checkbox
                    checked={note.checked}
                    onChange={(event) => {
                      handleCheckChange(event.target.checked, note);
                    }}
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Tooltip>
                <Tooltip title='Delete'>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      setDeleteOpen(true);
                      setTemp(note);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <div>
      <TextField
        id='newNote'
        multiline
        rowsMax={4}
        required
        label='Add new note here'
        inputProps={{
          maxLength: CHARACTER_LIMIT,
        }}
        value={value}
        helperText={`${value.length}/${CHARACTER_LIMIT}`}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        variant='outlined'
      />
      <br />
      <Button variant='contained' color='primary' onClick={Add}>
        Add Note
      </Button>
      <div style={{ marginTop: '15px' }}>
        {check === 2 ? (
          <Button
            variant='outlined'
            color='primary'
            style={{ marginLeft: '5px' }}
            onClick={Swap}
          >
            Swap
          </Button>
        ) : (
          <Button
            variant='outlined'
            color='primary'
            style={{ marginLeft: '5px' }}
            // onClick={Add}
            disabled
          >
            Swap
          </Button>
        )}
      </div>
      <div style={{ marginTop: '15px' }}>{displayPagination()}</div>
      <Notes />
      <EditWindow />
      <DeleteWindow />
      <Snackbar
        // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ width: '100%', padding: 0, margin: 0 }}
        open={openSnack}
        autoHideDuration={2500}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity={snackStatus}>
          {snackText}
        </Alert>
      </Snackbar>
    </div>
  );
}

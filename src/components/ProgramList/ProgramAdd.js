import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function ProgramAdd() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [program, setProgram] = useState({ name: '' });
  const [product, setProduct] = useState({ 
    name: '',
    active: true,
    programKey: localStorage.getItem('gramid')
  });
  const [project, setProject] = useState({
    name: '',
    productKey: localStorage.getItem('ductid'),
    active: true
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Handle Submit', program)
    axios
      .post(`http://localhost:3232/api/programs`, program)
      .then(res => window.location.reload())
      .catch(err => console.log('error', err))
    setOpen(false);
  }




  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create New Program</h2>
      <br />
      <label for="programName"><b>Program Name:</b></label><br />
      <input type="programName" placeholder="Enter Program Name" name="name" value={program.name} onChange={(e) => setProgram({ name: e.target.value })} required />
      <br />
      <label for="prodectName"><b>Product Name:</b></label><br />
      <input type="prodectName" placeholder="Enter Product Name" name="name" value={product.name} onChange={(e) => setProduct({ name: e.target.value })} required />
      <br />
      <label for="name"><b>Project Name:</b></label><br />
      <input type="name" placeholder="Enter Project Name" name="name" value={program.name} onChange={(e) => setProgram({ name: e.target.value })} required />
      <br /><br />
      <Button onClick={handleSubmit}>Submit!</Button>
    </div>
  );

  return (
    <div>
      <Button type="button" color="primary" onClick={handleOpen}>
        Create New Program
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
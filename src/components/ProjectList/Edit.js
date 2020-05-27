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
const ProgramEdit = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [program, setProgram] = useState({
        name: '',
    });
    const id = props.props
    console.log(props.props)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(program)
        axios
            .put(`http://localhost:3232/api/projects/${id}`, program)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => console.log('error', err))
            .finally(window.location.reload())
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Create New Program</h2>
            <br />
            <label for="programName"><b>Program Name:</b></label><br />
            <input type="programName" placeholder="Enter Program Name" name="name" value={program.name} onChange={(e) => setProgram({ name: e.target.value })} required />
            <br />
            <Button onClick={handleSubmit}>Submit!</Button>
        </div>
    );
    return (
        <div>
            <Button type="button" color="primary" onClick={handleOpen}>
                Edit
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
export default ProgramEdit;
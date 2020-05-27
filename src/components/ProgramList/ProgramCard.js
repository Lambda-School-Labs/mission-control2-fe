import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import ProgramDel from './ProgramDel'
import ProgramEdit from './ProgramEdit'
const useStyles = makeStyles(() => ({
    ProgramListView: {
        display: 'flex',
        margin: '5%',
        justifyContent: 'space-between'
    },
    ProgramListData: {
        marginLeft: '40px',
    }
}));
const ProgramCard = (data) => {

    const history = useHistory()
    const classes = useStyles();
    const push = (e) => {
        e.preventDefault()
        console.log('got here boss!')
        history.push(`/program/${data.id}`)
        localStorage.setItem('gramid', data.id)
    }
    return (
        <div className={classes.cards} >
            <Grid container direction='row' className={classes.ProgramListView} onClick={push} >
                <h3 className={classes.ProgramListData}>ID: {data.id}</h3>
                <h3 className={classes.ProgramListData}>Program Name: {data.name}</h3>

            </Grid>
            <ProgramDel props={data.id} />
            <ProgramEdit props={data.id} />
        </div>
    )
};

export default ProgramCard;
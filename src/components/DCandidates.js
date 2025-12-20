import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { dCandidate } from "../reducers/dCandidate";
import * as actions from "../actions/dCandidate";
import DCandidateform from "./DCandidateform";
import { Grid, Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Button } from "@mui/material";
import { withStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon  from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const styles = theme =>({

    root: {
        "&. MuiTableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper :{
        //margin: theme.spacing(2),
        //padding : theme.spacing(2)

}
})
const DCandidates= ({classes,...props}) => {

const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates();
    }, [])

    const onDelete = id =>{
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id,()=>{window.alert('Deleted Successfully.')})

    }

    return (
        <Paper className={classes.paper} elevation={3}>
             <Grid container>
            <Grid size={{xs:6}}>
                <DCandidateform {...({ currentId, setCurrentId })} />
            </Grid>
            <Grid size={{xs:6}}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>BloodGroup</TableCell>
                            <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            props.dCandidateList.map ((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                               
                                                    <Button> <EditIcon color ="primary"
                                                    onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    

                                                    <Button> <DeleteIcon color ="secondary" 
                                                    onClick={()=> onDelete(record.id)}/> </Button>
                                                
                                            </TableCell>
                                            </TableRow>)
                            })
                        }
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            </Grid>
        </Paper>
       
    );
}
const mapStateToProps = state => ({
        dCandidateList : state.dCandidate.list
    })

const mapActionToProps ={
       fetchAllDCandidates : actions.fetchAll,
       deleteDCandidate:actions.Delete
    }

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (DCandidates));
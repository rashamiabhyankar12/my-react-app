import React,{useRef, useState, useEffect} from "react";
import { Grid, TextField, FormControl, InputLabel, Select, Button, MenuItem, MenuList, FormHelperText } from "@mui/material";
import { withStyles } from '@mui/styles';
//import { Grid, TextField, withStyles,FormControl, InputLabel, Select, MenuItem, MenuList, FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
//import { Button } from "@material-ui/core";
import useForm from "./useForm";
import * as actions from "../actions/dCandidate";
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import {withStyles} from '@mui/material/styles';

const theme = createTheme({
  spacing: 4,
});

theme.spacing(2);

const styles = theme => ({
    root: {
        
    //'& .MuiTextField-root' :{
      '& .MuiOutlinedInput-root':{
       //margin : theme.spacing(1),
       minWidth: 230,
    }
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 230,
    },
    //smMargin: {
    //    margin: theme.spacing(1)
    //}
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}


const DCandidateform = ({classes, ...props}) => {

const validate =(fieldValues= values) =>{
    let temp ={ ...errors}
    if ('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required"
    if ('mobile' in fieldValues)
        temp.mobile = fieldValues.mobile ? "" : "This field is required"
    if ('bloodGroup' in fieldValues)
        temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required"
    if('email' in fieldValues)
        temp.email = (/^$|.+@.+..+/).test(fieldValues.email)? "": "Email is not valid"
    setErrors({
        ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
}

const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
    } =useForm (initialFieldValues, validate, props.setCurrentId )

    const inputLabel = React.useRef(50);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    const handleSubmit = async e => {
        e.preventDefault()
        console.log(values)

        if(validate()){
            {
               if (props.currentId==0)
                props.createDCandidate(values, ()=>{window.alert('inserted.')}) 
                //window.alert('validation success')
                else
                    props.updateDCandidate(props.currentId, values,()=>{window.alert('Updated.')})
            const onSuccess =() =>{
             console.log(values)   
            }

        }
            //props.createDCandidate(values,()=>{window.alert('inserted.')})
             //if (props.currentId == 0)
                //props.createDCandidate(values,onSuccess)
            //else
                //props.createDCandidate(props.currentId, values,onSuccess)
        }
        resetForm()
    }
        useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dCandidateList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return ( 
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid size={{xs:5}}>
                    <TextField
                    name="fullName"
                    variant="outlined"
                    label= "FullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                    {...(errors.fullName && {error:true, helperText:errors.fullName})}
                    />
                    <TextField
                    name="email"
                    variant="outlined"
                    label= "Email"
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && {error:true, helperText:errors.email})}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...errors.bloodGroup && {error:true}}
                    >
                        
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid size={{xs:5}}>
                    <TextField
                    name="mobile"
                    variant="outlined"
                    label= "Mobile"
                    value={values.mobile}
                    onChange={handleInputChange}
                    {...(errors.mobile && {error:true, helperText:errors.mobile})}
                    />
                    <TextField
                    name="age"
                    variant="outlined"
                    label= "Age"
                    value={values.age}
                    onChange={handleInputChange}
                    //{...(errors.age && {error:true, helperText:errors.age})}
                    />
                    <TextField
                    name="address"
                    variant="outlined"
                    label= "Address"
                    value={values.address}
                    onChange={handleInputChange}
                    //{...(errors.address && {error:true, helperText:errors.address})}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            //className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            //className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
        dCandidateList : state.dCandidate.list
    })

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateform));
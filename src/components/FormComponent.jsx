import { Box, Grid, makeStyles, Paper, TextField, Typography ,ListItemText ,ListItem, ListItemAvatar, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { List } from '@material-ui/core';

import { indigo,red,green,grey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import  DeleteForeverIcon  from '@material-ui/icons/DeleteForever';
import {createMuiTheme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        maxWidth:"1140px",
        margin: "24px auto",
        padding: theme.spacing(2),
    },
        formContainer:{
            padding: theme.spacing(3),
        },
        heading:{
            textAlign:"center",
            color:indigo[500],
            marginBottom:theme.spacing(4)
        },
        secondColumn:{
            margin:theme.spacing(4,0,3,0),
        },
        ListContainer:{
            minHeight:"300px",
            height:"auto",
            background:"white",
            padding:theme.spacing(2)
        },
        ListContainerTitle:{
            marginBottom:theme.spacing(2),
            paddingLeft:theme.spacing(2),
            color:indigo[500],
        },
        remainTaskAvatar:{
            backgroundColor: indigo["A400"],
            color:"white",
        },
        completeTaskAvatar:{
            backgroundColor:green[600],
            color:"white",
        },
        emptyMsg:{
            textAlign:"center",
            color:grey[400],
            marginTop:theme.spacing(3),
        },
}));
export default function FormComponent() {
    const classes = useStyles();
    const [inputData, setInputData] = useState("");
    const [inputError, setInputError] = useState("");

    const [remainingTaskList, setRemaininTaskList] = useState([]);
    const [completedTaskList, setCompletedTaskList] = useState([
    // { id:Math.random(),title:"day of the task",currentTime:"12pm"}
    ]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Form submitted');
        if(inputData.length > 4 && inputData !== ""){
            const taskList ={
                id:Math.random(),
                title:inputData
            }
            const list = [ ...remainingTaskList]
            list.push(taskList)
            setRemaininTaskList(list);
            setInputData("");
        }
    };
    const handleOnChange = ({target}) => {
       target.value.length <= 4 ? setInputError('Task should have atleast 5 character'):setInputError('');
        setInputData(target.value);
    };

    const handleCheck = (id) => {
        const initial =[...remainingTaskList];
        const initialCompleteTask =[...completedTaskList];
        const currentTime = getCurrentTime(new Date())

        const Index  = initial.findIndex((item) => item.id === id);
       remainingTaskList[Index].currentTime=currentTime
        initialCompleteTask.push(remainingTaskList[Index]);

        const updatedRemainingTask= initial.filter((item) => item.id !== id);

        setRemaininTaskList(updatedRemainingTask);
        setCompletedTaskList(initialCompleteTask);
    }; 
    const handleDelete = (id) => {
        const initial =[...remainingTaskList]
        const updated = initial.filter((item) => item.id !== id)
        setRemaininTaskList(updated);
    };

        const getCurrentTime =(date) => {
            let hour = date.getHours()
            let minutes = date.getMinutes()
            let amPm = hour >= 12 ? "pm" : "am";
            
            hour = hour % 12;
            hour = hour ? hour : 12 
            minutes = minutes < 10 ? "0" + minutes : minutes

            let currentTime=hour + ":" +minutes +amPm
            return currentTime
        }



    return (
       <Box className={classes.container}>
           <Grid container>
               <Grid item xs={12}>
                   <Paper elevation={3}>
                   <form onSubmit={handleSubmit} className={classes.formContainer}>
                    
                        <Typography variant="h5" className={classes.heading}>{""} React Todo List</Typography>
                       <Grid container justify="center">
                           <Grid item xs={8}>
                           <TextField id="inputTaskField" label="Press Enter To Add A Task" variant="outlined"
                            fullWidth={true}
                            size="small"
                            value={inputData}
                            onChange={handleOnChange}
                            error={inputError? true : false}
                            helperText={inputError}
                            />
                           </Grid>
                       </Grid>
                   </form>
                   </Paper>
               </Grid>

               <Grid item xs={12} className={classes.secondColumn}>

                   <Grid container  spacing={2}>
                       <Grid item xs={12} sm={6} lg={6}>
                       <List className={classes.ListContainer} dense={true}>
        <Typography className={classes.ListContainerTitle} variant="h5">Remaining Task</Typography>
        {remainingTaskList.length > 0 ? remainingTaskList.map((item,i) => ( 
        <ListItem key={i}>
            <ListItemAvatar>
              <Avatar className={classes.remainTaskAvatar}>
               {item.title[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} />
            <ListItemSecondaryAction>
                <IconButton style={{color:green[500]}}
                 onClick={() => handleCheck (item.id)}>
                    <DoneOutlinedIcon/>
                </IconButton>
                <IconButton style={{color:red[600]}}
                onClick={() => handleDelete(item.id)}>
                    <DeleteForeverIcon/>
                </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          )) 
           :
               <Typography className={classes.emptyMsg}>
              No Task added yet !....
              </Typography>
            }
     
      </List>
                       </Grid>
                     <Grid item xs={12} sm={6} lg={6}>
                       <List className={classes.ListContainer} dense={true}>
        <Typography className={classes.ListContainerTitle} variant="h5">Completed</Typography>
        {completedTaskList.length > 0 ? completedTaskList.map((item,i) => ( 
        <ListItem key={i}>
            <ListItemAvatar>
              <Avatar className={classes.completeTaskAvatar}>
               {item.title[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.currentTime}/>
           
          </ListItem>
          )) 
           :
               <Typography className={classes.emptyMsg}>
              No Task Completed !....
              </Typography>
            }
    
      </List>
                      
                        </Grid>
                </Grid>
                
                   
                   
               </Grid>
              
           </Grid>
       </Box>
    )
}

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper,Button } from '@mui/material';

export default function Student() {

    const paperstyle={padding:'50px 20px', width:600, margin:"20px auto"};

    const[name,setName]=useState("");
    const[address,setAddress]=useState("");

    const[students,setStudents]=useState([]);

    const handleClick=(e)=>{
        e.preventDefault();
        const std={name,address};
        console.log(std);
        fetch("http://localhost:8080/save",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(std)
        }).then(()=>{
            console.log("New Student Added");
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/findAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
     )
    },[])


  return (
    <Container >
        <Paper elevation={3} style={paperstyle} >
            <h1 style={{color:"blue",textAlign:"center"}}>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '480' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic fullWidth" 
      label="Student Name" 
      variant="outlined" 
      size='small' 
      fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}/>

      <TextField id="standard-basic fullWidth" 
      label="Student Address" 
      variant="outlined" 
      size='small' 
      fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}/>

      <Button variant="outlined" onClick={handleClick}>Submit</Button>
    </Box>
    </Paper>

    <Paper elevation={3} style={paperstyle} >
        <h1>Students</h1>
        {students.map(std => (
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={std.id}>
                Id:{std.id} <br />
                Name:{std.name} <br/>
                Address:{std.address}
            </Paper>
        ))
       }
    </Paper>
    </Container>
  );
}

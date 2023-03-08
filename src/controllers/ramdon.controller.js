import {fork} from 'child_process';

const getRamdoms = (req, res) => { 

    const {cant } = req.query; 
    const childProcess = fork("child.js")
    const quantity = cant ? cant : 10000000;

    childProcess.send(quantity);

    childProcess.on('message', (response) => {
        res.json(response)
    })
    }
   //res.send("Ruta ramdoms desde su controller");}

   export const ramdonController = { getRamdoms }

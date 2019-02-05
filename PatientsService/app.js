const express = require('express')
const fs = require('fs');
const cors = require('cors');

const app = express()
const port = 3000

//Loading patient data
console.log("Loading Data...");
console.log("\n");
var db = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
console.log("Data output: " + JSON.stringify(db));
console.log("\n");

//Use cors so that other localhost/url can access this service
app.use(cors());

//the Url pattern for this is: "http://localhost:3000/patients/{nric}"
//Sample call http://localhost:3000/patients/S1234567A
app.get('/patients/:nric', function (req, res) {
    res.header("Content-Type",'application/json');
    //Obtain NRIC from the request
    var nric = req.params.nric;

    //Access the data array from the data.json file
    var data = db.data;

    //For loop the array to find the patient
    for(var i = 0; i < data.length; i ++){
      var patient = data[i];
      if(patient.nric == nric){
        console.log("Obtaining patient(" + nric + "): " + JSON.stringify(patient, null, 2));
        var result = {status:"success", nric: nric, name: patient.name, birthdate: patient.birthdate, gender: patient.gender , address: patient.address}
        res.send(result);
        return;
      }
    }

    //If patient not found
    var data = {status:"error", message: "Patient not found"};
    res.send(JSON.stringify(data, null, 2));
    return;
  })
  


//Listen on port 3000 
app.listen(port, () => console.log(`Patient Data Service listening on port ${port}!`))

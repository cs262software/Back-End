/**
* this has to be merged with front-end's filePage,
* after meging, variable names and file names could be different!
* user uploads file to backend server
*
*/
const express = require('express');
const fileUpload = require('fileUploadModel');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file on backend server
  sampleFile.mv('/parsing/output/filename.docx', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

/**
* sample html format for upload button
*
**/
<html>
  <body>
    <form ref='uploadForm'
      id='uploadForm'
      action='http://localhost:8000/upload'
      method='post'
      encType="multipart/form-data">
        <input type="file" name="uploadThing" />
        <input type='submit' value='Upload!' />
    </form>
  </body>
</html>

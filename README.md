To install from scratch.

* Create a "theatre-suite" folder

* Open up a terminal, if you don't have one open already, and cd into that folder.

* Pull the master branch on GIT. (Run "git clone ") You will know you did this correctly when you see a "Back-End" folder within the "theatre-suite" folder you created.

* cd into the "Back-End" folder and run "npm install". This will install larger dependency files that are not worth storing in git.

* You will need to create a "theaterSuiteUser" in your database. Do this by running the SQL query:

  `GRANT ALL PRIVILEGES ON theatreappsuite.* TO 'theatreSuiteUser'@'localhost' IDENTIFIED BY 'password';`

* Create a copy of `Back-End/models/modelPasswords-template.js`, and name it `modelPasswords.js`. 
  Then, within your new `modelPasswords.js` file, change the passwords for "theatreSuiteUserPass" to be your new 'password':
  
  eg. `var theatreSuiteUserPass = "password";`

* To test, run "npm start" from within the "Back-End" folder.

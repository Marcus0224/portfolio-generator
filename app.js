const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site');

 const generatePage = require('./src/page-template');

  const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "what is your name?",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Enter you Github Username');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'would you liek to enter some information about yourself for an "About" ssection?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };

  //promptUser().then(answers => console.log(answers));

  const promptProject = portfolioData => {
    portfolioData.prjects - [];
    // if there's np 'projects array property, crete one
    if (!portfolioData.prjects) {
      portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Enter name of project');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: "Provide a description of the project (Required)",
        validate: nameInput => {
          if (nameInput) {
            return true;
          }else {
            console.log('enter Project description');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (check all that apply)',
        choices: ['javaScript', 'HTML', 'CSS', 'ES6', 'JQUERY', 'BOOTSTRAP', "Node"]
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Githib link to your project. (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('enter project Github link');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
  };

  promptUser()
    .then(promptProject)
    .then(portfolioData => {
      return generatePage(portfolioData);
    })
    .then(pageHTML => {
      return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
    })
    .then(copyFileResponse => {
      console.log(copyFileResponse);
    })
    .catch(err => {
      console.log(err);
    });
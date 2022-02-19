const inquirer = require('inquirer');
// const fs = require('fs');

// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

// inquirer
//   .prompt([
//     {
//       type:'input',
//       name: 'name',
//       message: 'What is your name?'
//     }
//   ])
//   .then(answers => console.log(answers));

  const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "what is your name"
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
  };

  promptUser().then(answers => console.log(answers));

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
        message: 'What is the name of the project?'
      },
      {
        type: 'input',
        name: 'description',
        message: "Provide a description of the project (Required)"
      },
      {
        type: 'checkbox',
        name: 'language',
        message: 'What did you build this project with? (check all that apply)',
        choices: ['javaScript', 'HTML', 'CSS', 'ES6', 'JQUERY', 'BOOTSTRAP', "Node"]
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Githib link to your project. (Required)',
        default: false
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
      console.log(portfolioData);
    });
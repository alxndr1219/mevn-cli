const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');

const showBanner = require('../external/banner');

let dplyfn = () => {

  showBanner();

  let data = fs.readFileSync('./mevn.json', 'utf8');
  let appname = JSON.parse(data);
  shell.cd(appname.project_name);
  let appdir = process.cwd() + '';
  shell.cd('client')

  setTimeout(() => {

    shell.exec('npm install', (err) => {
      if(err) {
        throw err;
      }

      shell.exec('npm run build', (err) => {
        if(err) {
          throw err;
        }
  
        shell.exec('sudo cp -a /' + process.cwd() + '/dist /' + appdir + '/server', (err) => {
          if(err) {
            throw err;
          }
  
          shell.exec('cd ..', (err) => {
            if(err) {
              throw err;
            }

            shell.cd('server', (err) => {
              if(err) {
                throw err;
              }

              shell.exec('sudo heroku container:login', (err) => {
                if(err) {
                  throw err;
                }
                console.log('\n\ncreating a heroku app\n')
                shell.exec('heroku create', (err) => {
                  if(err) {
                    throw err;
                  }
    
                  inquirer.prompt([{
                    name: 'url-name',
                    type: 'input',
                    message: 'Please enter the name of heroku app(url)',
              
                  }]).then((answers) => {
    
                    shell.exec('sudo heroku container:push web -a ' + answers.url-name, (err) => {
                      if(err) {
                        throw err;
                      }
            
                      shell.exec('sudo heroku container:release web -a ' + answers.url-name, (err) => {
                        if(err) {
                          throw err;
                        }
                        appdir              
                        shell.exec('heroku open -a' + answers.url-name,(err) => {
                          if(err) {
                            throw err;
                          }
                        
                        })
                      
                      })
                    
                    })
    
                  })  
          
                })
              
              }) 
            })

          });
  
        })
      
      })
    
    })
    
  }, 100);
  
  
}
module.exports = dplyfn;
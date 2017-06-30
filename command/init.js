'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const emoji = require('node-emoji')
const utils = require('../utils');

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (!templates.tpl[tplName]) {
      console.log(`${emoji.get(':warning:')}' ${chalk.red('Template does not exit!')}`)
      process.exit()
    }
    gitUrl = templates.tpl[tplName].url
    branch = templates.tpl[tplName].branch

    let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

    console.log(chalk.white('\n Start generating... \n'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      // let initGitStr = `rm -rf ./${projectName}/.git/ && git init && git add . && git commit -m "chore(*): init project by goze-cli"`
      // exec(initGitStr, (error, stdout, stderr) => {
      //   if (error) {
      //     console.log(error)
      //     process.exit()
      //   }

      //   console.log(`${emoji.get(':sparkles:')}' ${chalk.green('√ Generation completed!')}`)
      //   console.log(`\n cd ${projectName} && npm install \n`)
      //   process.exit()
      // })
      utils.gitInit(projectName, function (error) {
        if (error) {
          console.log(error)
          process.exit()
        }
        
        console.log(`${emoji.get(':sparkles:')}' ${chalk.green('√ Generation completed!')}`)
        console.log(`\n cd ${projectName} && npm install \n`)
        process.exit()
      })
    })
  })
}
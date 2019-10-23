const core = require('@actions/core');
const github = require('@actions/github');
const exec  = require('child_process');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  exec('ansible-playbook test.yml', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

  });

} catch (error) {
  core.setFailed(error.message);
}
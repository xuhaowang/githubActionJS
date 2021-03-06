const core = require('@actions/core');
const github = require('@actions/github');
const exec  = require('@actions/exec');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  (async() => {
    
    try{
      await exec.exec('gittt', ['clone', 'https://github.com/xuhaowang/githubActionJS.git']);

      await exec.exec('export', ["KUBECONFIG=\"$(kind get kubeconfig-path)\""])
    
      await exec.exec('ansible-playbook', ['-v', 'githubActionJS/test.yml']);
    } catch(err) {
      core.setFailed(err.message)
    }
    // your code
    // ...

  })();

  // exec.exec('git', ['clone', 'https://github.com/xuhaowang/githubActionJS.git']);

  // exec.exec('ansible-playbook', ['-v', 'githubActionJS/test.yml']);
  

} catch (error) {
  core.setFailed(error.message);
}

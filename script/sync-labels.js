const copyGitHubLabels = require('copy-github-labels')();
const argv = require('minimist')(process.argv.slice(2));

if (argv.username && argv.password && argv.repository) {
  copyGitHubLabels.authenticate({
    type: 'basic',
    username: argv.username,
    password: argv.password,
  });

  // Copy labels from master repository to another
  copyGitHubLabels.copy(
    'iGitScor/contributing',
    argv.username + '/' + argv.repository
  );

  console.log('Label synchronization OK!');
} else {
  console.error('A parameter is missing.');
  process.exit(0);
}

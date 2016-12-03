const prompt = require('prompt');
const copyGitHubLabels = require('copy-github-labels')();

var schema = {
  properties: {
    username: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Username must be only letters or dashes',
      required: true,
    },
    password: {
      hidden: true,
      required: true,
    },
    repository: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Repository must be only letters or dashes',
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, function (err, result) {
  if (!err) {
    copyGitHubLabels.authenticate({
      type: 'basic',
      username: result.username,
      password: result.password,
    });

    // Copy labels from master repository to another
    copyGitHubLabels.copy(
      'iGitScor/contributing',
      result.username + '/' + result.repository
    );

    console.log('Label synchronization OK!');
  } else {
    console.error('Prompt has encountered a problem.');
    process.exit(0);
  }
});

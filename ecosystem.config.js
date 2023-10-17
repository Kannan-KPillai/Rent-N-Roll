module.exports = {
    apps: [
      {
        name: 'rent-n-roll', // Replace with your application name
        script: 'backend/server.js', // Path to your application's entry file
        interpreter: 'node',
        interpreter_args: '--experimental-modules', // Add this line to enable ESM
      },
    ],
  };
  
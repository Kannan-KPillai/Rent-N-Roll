module.exports = {
    apps: [
      {
        name: 'rent-n-roll', 
        script: 'backend/server.js',
        interpreter: 'node',
        interpreter_args: '--experimental-modules', 
      },
    ],
  };
  
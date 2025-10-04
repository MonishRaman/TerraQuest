const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting NASA Exoplanet Hackathon Application...\n');

// Get the project root directory
const projectRoot = __dirname;

// Start Backend
console.log('📡 Starting Backend Server...');
const backend = spawn('python', ['app.py'], {
  cwd: path.join(projectRoot, 'backend'),
  shell: true,
  stdio: 'inherit'
});

// Wait a moment for backend to start
setTimeout(() => {
  // Start Frontend
  console.log('🌐 Starting Frontend Server...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(projectRoot, 'frontend'),
    shell: true,
    stdio: 'inherit'
  });

  console.log('\n✅ Both servers are starting...');
  console.log('🔗 Backend: http://localhost:5000');
  console.log('🔗 Frontend: http://localhost:3000\n');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

}, 3000);

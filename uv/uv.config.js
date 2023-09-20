/* ORIGINAL CONFIG
self.__uv$config = {
    prefix: '/uv/service/',
    bare: 'https://bare.mathlearning.tech/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
*/

/* BETA CONFIG */

// Define an array to store multiple bare servers
let bareServers = [];

// Load the list of bare servers when the script runs
async function loadBareServers() {
  try {
    const response = await fetch('/data/bare-servers.json'); // Assuming the JSON file is in the /data directory
    const data = await response.json();
    bareServers = data.servers || [];
    
    // Populate the dropdown menu with server options
    const select = document.getElementById('bareServerSelect');
    bareServers.forEach(server => {
      const option = document.createElement('option');
      option.value = server;
      option.textContent = server;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading bare servers:', error);
  }
}

// Function to handle user selection and update the 'bare' property
function handleServerSelection() {
  const select = document.getElementById('bareServerSelect');
  const selectedServer = select.value;
  self.__uv$config.bare = selectedServer;
}

// Load the list of bare servers when the script runs
loadBareServers();

self.__uv$config = {
  prefix: '/uv/service/',
  bare: 'https://tomp.app/', // Default server
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  sw: '/uv/uv.sw.js',
};

// Add an event listener to handle user selection
document.getElementById('bareServerSelect').addEventListener('change', handleServerSelection);

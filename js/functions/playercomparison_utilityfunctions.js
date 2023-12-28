


/**
 * dotProduct function
 * @param {number|object} a values of a (values should be from 0.0 to 1.0).
 * example: a = [x: 0.3, y: 0.6, z: 0.82]
 * @param {number|object} b values of b (values should be from 0.0 to 1.0)
 * @returns {number} the dot product of the values in a and b
 */
function dotProduct(a, b) {
  return a.reduce((acc, val, i) => acc + val * b[i], 0);
}

/**
 * norm function (Euclidean norm or magnitude)
 * @param {number|object} vector vector
 * @returns {number} magnitude of the vector
 */
function norm(vector) {
  // squaring each component, then summing the squares, then square rooting the sum
  return Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
}

/**
 * cosineDistance function used to measure similarity between a and b (2 players)
 * @param {number|object} a values of a. ex: [x: 0.3, y: 0.6, z: 0.82]
 * @param {number|object} b values of b
 * @returns {number} the cosine distance of a and b
 */
function cosineDistance(a, b) {
  // if a and b are objects then they are converted to arrays
  a = Array.isArray(a) ? a : [a.x, a.y, a.z];
  b = Array.isArray(b) ? b : [b.x, b.y, b.z];

  // get the dot product of a and b
  const dot = dotProduct(a, b);

  // get the magnitudes/norms of a and b 
  const normA = norm(a);
  const normB = norm(b);

  // return the cosine distance
  // 1 - dot(a,b) / (|a| * |b|)
  return 1 - dot / (normA * normB);
}


export function test() {
  // This file can also use kdTree globally
  // Example usage:
  if (typeof kdTree !== 'undefined') {
    // Use kdTree here
    console.log(kdTree);
  } else {
    console.error('kdTree is not defined. Make sure kdTree.js is loaded before this script.');
  }

  // Sample data: Replace with your actual data
  const playersData = [
    { x: 0.8, y: 0.2, z: 0.6 },
    { x: 0.6, y: 0.5, z: 0.7 },
    { x: 0.9, y: 0.9, z: 0.9 },
    { x: 0.2, y: 0.3, z: 0.25 },
    { x: 0.75, y: 0.5, z: 0.34 },
      // Add more player data
  ];

  const dimensions = ['x', 'y', 'z'];

  // Create a KD-tree for fast nearest neighbor search
  const kdtree = new kdTree(playersData, cosineDistance, dimensions); // Use cosineDistance as the distance function

  // Query player data (replace with your query player's data)
  const queryPlayerData = { x: 0.75, y: 0.3, z: 0.65 };

  // Find the top 3 most similar players
  const nearestNeighbors = kdtree.nearest(queryPlayerData, 3);

  // 'nearestNeighbors' contains the top matches
  nearestNeighbors.reverse().forEach((nn, index) => {
    console.log("%s,  Cosine Distance: %f, Data: %o", index+1, nn[1], nn[0]);
  });

} 

// Function to load CSV data using Fetch API and manual parsing
async function loadCSV() {
  const response = await fetch("../../player-information/NHL23-HUT-Base-PlayerAttributes.csv");
  const text = await response.text();

  // Split the CSV into rows and extract header
  const rows = text.split('\n');
  const header = rows[0].split(',');

  // Parse the remaining rows into an array of objects
  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    const player = {};
    header.forEach((key, index) => {
      if (key.trim() === 'Name' || key.trim() === 'main-position') {
        player[key.trim()] = values[index].trim();
      }
      else {
        player[key.trim()] = parseFloat(values[index].trim());
      }
    });
    return player;
  });

  return data;
}

// Example usage
loadCSV().then(players => {

  players.forEach((player, index) => {
    if (player.Name == "Steven Stamkos") {
      console.log(player);
      console.log(index);
    }
  });
  // Now you have your player data, and you can proceed with normalization and building the KD-tree
});

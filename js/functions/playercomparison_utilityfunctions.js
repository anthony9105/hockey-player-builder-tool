import * as Constants from "../variables/constants.js";

// global variable for the player data
let playerData;

/**
 * loadCSV function to load the CSV data
 * @returns the data in an array of objects
 */
async function loadCSV() {
  const response = await fetch("../../player-information/NHL23-HUT-Base-PlayerAttributes.csv");
  const text = await response.text();

  // split the CSV into rows and extract header (first row)
  const rows = text.split('\n');
  const header = rows[0].split(',');

  // parse the remaining rows into an array of objects
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

/**
 * fetchPlayerData function used to get the player data from
 * loadCSV and assign it to the global variable playerData
 */
async function fetchPlayerData() {
  const players = await loadCSV();
  playerData = players;
}

/**
 * normalizePlayerData function used to normalize the
 * player numeric data to a scale of 0.0 to 1.0 rather than
 * 0 to 100, as it is initially.
 * @param {object} player object representing one player
 * @returns the player with its numeric data normalized
 */
function normalizePlayerData(player) {
  const normalizedData = {
    Name: player.Name,
    'main-position': player['main-position'],
  };

  // Iterate over the selected attributes
  selectedAttributeNames.forEach(attr => {
    if (typeof player[attr] === 'number') {
      // normalize numeric attributes
      normalizedData[attr] = player[attr] / 100;
    } else {
      // copy non-numeric attributes as is
      normalizedData[attr] = player[attr];
    }
  });
  return normalizedData;
}

/**
 * initialize global variables to be used later
 */
  // get the player data
  await fetchPlayerData();

  // attribute names, and attribute names selected to be used for the comparisons
  const attributeNames = Object.keys(playerData[0]);
  const selectedAttributeNames = attributeNames.slice(2, -8);

  // normalizing the numeric values to a scale of 0.0 to 1.0
  playerData = playerData.map(player => normalizePlayerData(player));

  // sample player data to be used for comparisons (to be changed later)
  const samplePlayer = {};
  const minVal = 0.68;
  const maxVal = 0.95

  selectedAttributeNames.forEach(attr => {
    samplePlayer[attr] = parseFloat((Math.random() * (maxVal - minVal) + minVal).toFixed(2));
  });

  // key names for name and main-position
  const nameKey = Object.keys(playerData[0])[0];
  const positionKey = Object.keys(playerData[0])[1];

  // which attribute weights to use (to be modified later)
  let attributeWeights = Constants.ATTRIBUTE_WEIGHTS['C'];

  playerData.forEach((player, index) => {
    if (player.Name == "Steven Stamkos") {
      console.log(player);
      console.log(index);
    }
  });
/**
 * 
 */



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
  a = Array.isArray(a) ? [...a] : selectedAttributeNames.map(attr => a[attr]);
  b = Array.isArray(b) ? [...b] : selectedAttributeNames.map(attr => b[attr]);

  // names of a and b for later
  const nameA = a.Name;
  const nameB = b.Name;

  // remove 'Name' and 'main-position' from the arrays
  a = a.filter(attr => attr !== nameKey && attr !== positionKey);
  b = b.filter(attr => attr !== nameKey && attr !== positionKey);

  // apply specific attribute weights
  a = a.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]] || 1));
  b = b.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]] || 1));
   
  // get the dot product of a and b
  const dot = dotProduct(a, b);

  // get the magnitudes/norms of a and b 
  const normA = norm(a);
  const normB = norm(b);

  // return the cosine distance
  // 1 - dot(a,b) / (|a| * |b|)
  return {distance: 1 - dot / (normA * normB), nameA, nameB};
}

/**
 * findSimilarPlayers function used to find the most similar and least similar players
 */
export function findSimilarPlayers() {
  // create a KD-tree for fast nearest neighbor search
  const kdtree = new kdTree(playerData, cosineDistance, selectedAttributeNames);

  // sample player w/ attributes of Steven Stammkos (for testing)
  let samplePlayer = {
    Acceleration: 0.91,
    Agility: 0.88,
    Balance: 0.83,
    BodyChecking: 0.78,
    DefensiveAwareness: 0.83,
    Deking: 0.88,
    Discipline: 0.79,
    Durability: 0.7,
    Endurance: 0.82,
    Faceoffs: 0.81,
    FightingSkill: 0.77,
    HandEye: 0.85,
    OffensiveAwareness: 0.88,
    Passing: 0.88,
    PuckControl: 0.88,
    ShotBlocking: 0.75,
    SlapshotAccuracy: 0.87,
    SlapshotPower: 0.89,
    Speed: 0.89,
    StickChecking: 0.83,
    Strength: 0.83,
    WristshotAccuracy: 0.85,
    WristshotPower: 0.87,
  }

  // Find the top 3 most similar players
  const nearestNeighbors = kdtree.nearest(samplePlayer, 3);

  nearestNeighbors.sort((a, b) => a[1].distance - b[1].distance);

  console.log("Most Similar:");
  // 'nearestNeighbors' contains the top matches
  nearestNeighbors.forEach((nn, index) => {
    console.log("%s  %o  Distance: %f, ", index + 1, nn[0], nn[1]['distance']);
  });
  console.log("");


// Calculate cosine distances between the query player and all players in the dataset
const allDistances = playerData.map((player, index) => {
  const info = cosineDistance(samplePlayer, player);
  const distance = info.distance;
  return { index, distance };
});


// Sort all players based on distances in descending order
const sortedPlayers = allDistances.sort((a, b) => b.distance - a.distance);


// Display the 3 least similar players (farthest neighbors)
// let j = 1;
// console.log("Most Similar:");
// for (let i = sortedPlayers.length - 1; i > sortedPlayers.length - 3 - 1; i--) {
//   const { index, distance } = sortedPlayers[i];
//   const nearestPlayer = playerData[index];
//   console.log("%s %o Distance: %f", j, nearestPlayer, distance);
//   j++;
// }
// console.log("");

let k = 1;
console.log("Least Similar:");
for (let i = 0; i < 3; i++) {
  const { index, distance } = sortedPlayers[i];
  const farthestPlayer = playerData[index];
  console.log("%s %o Distance: %f", k, farthestPlayer, distance);
  k++;
}


} 

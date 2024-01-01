import * as Constants from "../variables/constants.js";
import * as Variables from "../variables/global_variables.js";
import * as UtilityFunctions from "../functions/utility_functions.js";

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
  const selectedAttributeNames = attributeNames.slice(2, attributeNames.length);

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
      // console.log(player);
      // console.log(index);
    }
    else if (player.Name == "Alex Ovechkin") {
      // console.log(player);
      // console.log(index);
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
 * cosineSimilarity function used to measure similarity between a and b (2 players)
 * @param {number|object} a values of a. ex: [x: 0.3, y: 0.6, z: 0.82]
 * @param {number|object} b values of b
 * @returns {number} the cosine similarity of a and b
 */
function cosineSimilarity(a, b) {
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

  // return the cosine similarity
  // dot(a,b) / (|a| * |b|)
  return { distance: dot / (normA * normB), nameA, nameB };
}

/**
 * getCategoryAverage function used to get the average of the category
 * @param {object} playerAttributes all the attributes for the player
 * @param {String[]} attributeNames the attribute names for the current category
 * @returns the average
 */
function getCategoryAverage(playerAttributes, attributeNames) {
  const sum = attributeNames.reduce((acc, attributeNames) => acc + playerAttributes[attributeNames], 0);
  return sum / attributeNames.length;
}

/**
 * getCategoryAverages function used to calculate each attribute category's average.
 * Note: fighting skill, discipline, endurance, and faceoffs are left out of any of these averages.
 * @param {object} playerAttributes all the attributes of the player 
 * @returns {object} the category averages
 */
function getCategoryAverages(playerAttributes) {
  const Skating_AVG = getCategoryAverage(playerAttributes, Constants.skatingAttributes);
  const Defense_AVG = getCategoryAverage(playerAttributes, Constants.defenseAttributes);
  const Shooting_AVG = getCategoryAverage(playerAttributes, Constants.shootingAttributes);
  const Physicality_AVG = getCategoryAverage(playerAttributes, Constants.physicalityAttributes);
  const Puckskills_AVG = getCategoryAverage(playerAttributes, Constants.puckSkillsAttributes);

  return { Skating_AVG, Defense_AVG, Shooting_AVG, Physicality_AVG, Puckskills_AVG };
}

/**
 * 
 * @param {object} playerAttributes all the attributes of the player
 * @param {object} playerType the player type and its information
 * @param {object} categoryAvgs the attribute category averages
 * @returns {boolean} whether the player meets the given player type requirements
 */
function meetsRequirements(playerAttributes, playerType, categoryAvgs) {

  // checking the minimum requirements
  if (playerType.minimums != undefined) {
    for (const category in playerType.minimums) {
      if (typeof playerType.minimums[category] === 'object') {
        for (const attribute in playerType.minimums[category]) {
          let playerAttributeToCheck;
          if (attribute.includes("AVG")) {
            playerAttributeToCheck = categoryAvgs[attribute];
          }
          else {
            playerAttributeToCheck = playerAttributes[attribute];
          }

          const minVal = playerType.minimums[category][attribute];

          if (playerAttributeToCheck < minVal) {
            console.log("", playerType, "\n", attribute, " too low");
            return false;
          }
        }
      }
      else {
        let playerAttributeToCheck;
        if (category.includes("AVG")) {
          playerAttributeToCheck = categoryAvgs[category];
        }
        else {
          playerAttributeToCheck = playerAttributes[category];
        }

        const minVal = playerType.minimums[category];

        if (playerAttributeToCheck < minVal) {
          console.log("", playerType, "\n", category, " too low");
          return false;
        }
      }
    }
  }

  // checking maximum requirements
  if (playerType.maximums != undefined) {
    for (const category in playerType.maximums) {
      if (typeof playerType.maximums[category] === 'object') {
        for (const attribute in playerType.maximums[category]) {
          let playerAttributeToCheck;
          if (attribute.includes("AVG")) {
            playerAttributeToCheck = categoryAvgs[attribute];
          }
          else {
            playerAttributeToCheck = playerAttributes[attribute];
          }

          const maxVal = playerType.maximums[category][attribute];

          if (playerAttributeToCheck > maxVal) {
            console.log("", playerType, "\n", attribute, " too high");
            return false;
          }
        }
      }
      else {
        let playerAttributeToCheck;
        if (category.includes("AVG")) {
          playerAttributeToCheck = categoryAvgs[category];
        }
        else {
          playerAttributeToCheck = playerAttributes[category];
        }

        const maxVal = playerType.maximums[category];

        if (playerAttributeToCheck > maxVal) {
          console.log("", playerType, "\n", category, " too high");
          return false;
        }
      }
    }
  }

  console.log("\n\n\nPLAYER MEETS REQUIREMENTS FOR:");
  console.log(playerType);
  // if this point is reached, it means that all requirments are met,
  // so return true.
  return true;
}

/**
 * calculateScore function used to calculate the score (difference above the player
 * type minimum attribute values).  This is used when a player meets the requirements
 * of more than 1 player type, to determine which one is the best.
 * @param {object} playerAttributes the attributes for the player
 * @param {object} playerType the player type information
 * @param {object} categoryAvgs the attribute category averages
 * @returns the score
 */
function calculateAttributeScore(playerAttributes, playerType, categoryAvgs) {
  let minimumsScore = 0;
  let count = 0;

  // checking the minimum requirements
  if (playerType.minimums != undefined) {
    for (const category in playerType.minimums) {
      if (typeof playerType.minimums[category] === 'object') {
        for (const attribute in playerType.minimums[category]) {
          let playerAttributeToCheck;
          if (attribute.includes("AVG")) {
            playerAttributeToCheck = categoryAvgs[attribute];
          }
          else {
            playerAttributeToCheck = playerAttributes[attribute];
          }

          const minVal = playerType.minimums[category][attribute];

          // update the score and the count
          minimumsScore += playerAttributeToCheck - minVal;
          count++;
        }
      }
      else {
        let playerAttributeToCheck;
        if (category.includes("AVG")) {
          playerAttributeToCheck = categoryAvgs[category];
        }
        else {
          playerAttributeToCheck = playerAttributes[category];
        }

        const minVal = playerType.minimums[category];

        // update the score and the count
        minimumsScore += playerAttributeToCheck - minVal;
        count++;
      }
    }
  }

  return minimumsScore / count;

  // return averageScore;
}

function calculateAbilityScore(playerType) {
  let abilityScore = 0;
  let alrFoundMainAbilityMatch = false;
  let secAbilityMatchesFound = 0;


  // selected abilities
  const selectedAbilities = Array.from(document.getElementsByClassName(Constants.ABILITY_DISPLAY_NAME_CLASSNAME));
  const selectedAbilityNames = [selectedAbilities[0].textContent, selectedAbilities[1].textContent];

  // selected main ability
  const selectedMainAbilityName = document.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_NAME_CLASSNAME)[0].textContent;

  const selectedAbilityTypes = [];
  let selectedMainAbilityType;

  // getting the selected ability types, by finding the name matches
  selectedAbilityNames.forEach(selectedAbilityName => {
    Variables.abilityTypes.forEach(ability => {
      if (selectedAbilityName == ability.name) {
        selectedAbilityTypes.push(ability.type);
      }

      if (selectedMainAbilityName == ability.name) {
        selectedMainAbilityType = ability.type;
      }
    });
  });



  selectedAbilityTypes.forEach(selectedAbilityType => {
    // main skills
    playerType.MainSkills.forEach(mainSkill => {
      if (secAbilityMatchesFound >= 2 && alrFoundMainAbilityMatch) {
        // move to next iteration of this inner forEach
        return;
      }
      if (selectedMainAbilityType == mainSkill && !alrFoundMainAbilityMatch) {
        abilityScore += 10;
        alrFoundMainAbilityMatch = true;
      }
      if (selectedAbilityType == mainSkill && secAbilityMatchesFound < 1) {
        abilityScore += 6;
        secAbilityMatchesFound++;
      }
    });

    // secondary skills
    playerType.SecondarySkills.forEach(secSkill => {
      if (secAbilityMatchesFound >= 2 && alrFoundMainAbilityMatch) {
        // move to next iteration of this inner forEach
        return;
      }
      if (selectedMainAbilityType == secSkill && !alrFoundMainAbilityMatch) {
        abilityScore += 4;
        alrFoundMainAbilityMatch = true;
      }
      if (selectedAbilityType == secSkill && secAbilityMatchesFound < 1) {
        abilityScore += 4;
        secAbilityMatchesFound++;
      }
    });
  });

  console.log("SCORE FOR: ", playerType, " below:");
  console.log(abilityScore);

  return abilityScore;
}

/**
 * determineBestPlayerType function used to determine the best player type for the
 * current player
 * @param {object} playerAttributes the attributes for the player
 * @param {object} playerTypes the player type information
 * @param {object} categoryAvgs the attribute category averages
 * @returns {object} the player type that is best fit for the current player
 */
function determineBestPlayerType(playerAttributes, playerTypes, categoryAvgs) {
  let highestScore = null;
  let scores = [];
  let bestPlayerTypes = [];
  let bestPlayerTypeFit = null;

  // for each player type
  for (const typeName in playerTypes) {
    const playerType = playerTypes[typeName];

    // check if all requirements are met
    if (meetsRequirements(playerAttributes, playerType, categoryAvgs)) {

      if (highestScore = null) {
        highestScore = calculateAbilityScore(playerType);
        scores.push(highestScore);
        // highestScore = calculateAttributeScore(playerAttributes, playerType, categoryAvgs);
      }
      else {
        const tempScore = calculateAbilityScore(playerType);
        scores.push(tempScore);
        // const tempScore = calculateAttributeScore(playerAttributes, playerType, categoryAvgs);

        // update highestScore if tempScore is greater
        if (tempScore > highestScore) {
          highestScore = tempScore;
          bestPlayerTypes.push(playerType);
        }
        else if (tempScore == highestScore) {
          highestScore = "tied";
          bestPlayerTypes.push(playerType);
        }
      }
    }
  }

  // if no player type requirements were met
  if (bestPlayerTypes.length == 0) {
    console.log("No player type requirements were met");
  }
  // if 1 player type was determined as the best from the abilities scoring method
  else if (bestPlayerTypes.length == 1) {
    bestPlayerTypeFit = bestPlayerTypes[0];
  }
  // if theres still multiple eligible player types because the previous scoring resulted in a tie.
  // Use the other scoring method based off the player type's minimum requirement attributes.
  else {
    let tieBreakerHighestScore = null;
    bestPlayerTypes.forEach(bestPlayerType => {
      if (tieBreakerHighestScore = null) {
        tieBreakerHighestScore = calculateAttributeScore(playerAttributes, bestPlayerType, categoryAvgs);
        bestPlayerTypeFit = bestPlayerType;
      }
      else {
        const tempScore = calculateAttributeScore(playerAttributes, bestPlayerType, categoryAvgs);

        // update highestScore if tempScore is greater
        if (tempScore > tieBreakerHighestScore) {
          tieBreakerHighestScore = tempScore;
          bestPlayerTypeFit = bestPlayerType;
        }
      }
    });
  }

  return bestPlayerTypeFit;
}

/**
 * getPlayerType function used to get the specific player type of the player.
 * Needed for the attribute weights for the comparison.
 * @param {object} playerAttributes all the attributes of the player
 */
function getPlayerType(playerAttributes, playerPosition) {
  const categoryAvgs = getCategoryAverages(playerAttributes);

  // using forward ('C' or 'W') or defense ('D') player types
  const playerTypesToUse = playerPosition == 'D' ? Constants.PLAYER_TYPES.Defense : Constants.PLAYER_TYPES.Forward;

  console.log("\n\nBEST PLAYER TYPE FOR THIS PLAYER:", determineBestPlayerType(playerAttributes, playerTypesToUse, categoryAvgs));

}

/**
 * scalePlayerDataAttributes function used to scale player data attributes if they are too low or high
 * @param {number} scalingFactor scaling factor multiplied to all the player data attributes 
 */
function scalePlayerDataAttributes(scalingFactor) {
  for (let i=0; i < playerData.length; i++) {
    for (const attribute in playerData[i]) {
      if (typeof playerData[i][attribute] === 'number') {
        playerData[i][attribute] = parseFloat((playerData[i][attribute] * scalingFactor).toFixed(2));
      }
    }
  }
}

/**
 * findSimilarPlayers function used to find the most similar and least similar players
 */
export function findSimilarPlayers() {
  // create a KD-tree for fast nearest neighbor search
  const kdtree = new kdTree(playerData, cosineSimilarity, selectedAttributeNames);

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

  scalePlayerDataAttributes(1.035);
  samplePlayer = playerData[818];

  UtilityFunctions.getAttributeObject();

  console.log("Player being used:");
  console.log(samplePlayer);

  getPlayerType(samplePlayer, 'D');

  // Find the top 3 most similar players
  // (subject to change: finding 871 (all players) for nearest neighbours)
  const nearestNeighbors = kdtree.nearest(samplePlayer, playerData.length);

  // sorting by ascending order
  // nearestNeighbors.sort((a, b) => a[1].distance - b[1].distance);
  // sort by descending order
  nearestNeighbors.sort((a, b) => b[1].distance - a[1].distance);

  // getting the top 3 nearest/most similar
  const top3Neighbors = nearestNeighbors.slice(0, 3);


  console.log("\n\n\nMost Similar:");
  // 'nearestNeighbors' contains the top matches
  top3Neighbors.forEach((nn, index) => {
    console.log("%s  %o  Similarity: %f, ", index + 1, nn[0], nn[1]['distance']);
  });

  // getting the 3 least similar
  const bottom3neighbours = nearestNeighbors.slice(-3, nearestNeighbors.length);

  bottom3neighbours.sort((a, b) => a[1].distance - b[1].distance);

  console.log("\n\n\nLeast Similar:");
  // 'nearestNeighbors' contains the top matches
  bottom3neighbours.forEach((nn, index) => {
    console.log("%s  %o  Similarity: %f, ", index + 1, nn[0], nn[1]['distance']);
  });
  console.log("");

    // playerData.forEach((player, index) => {
  //   if (player.Name == "Erik Karlsson") {
  //     console.log(player);
  //     console.log(index);
  //   }
  //   else if (player.Name == "Alex Ovechkin") {
  //     console.log(player);
  //     console.log(index);
  //   }
  // });

  // // Calculate cosine distances between the query player and all players in the dataset
  // const allDistances = playerData.map((player, index) => {
  //   const info = cosineDistance(samplePlayer, player);
  //   const distance = info.distance;
  //   return { index, distance };
  // });

  // // Sort all players based on distances in descending order
  // const sortedPlayers = allDistances.sort((a, b) => b.distance - a.distance);

  // let k = 1;
  // console.log("\n\nLeast Similar:");
  // for (let i = 0; i < 3; i++) {
  //   const { index, distance } = sortedPlayers[i];
  //   const farthestPlayer = playerData[index];
  //   console.log("%s %o Similarity: %f", k, farthestPlayer, distance);
  //   k++;
  // }

} 

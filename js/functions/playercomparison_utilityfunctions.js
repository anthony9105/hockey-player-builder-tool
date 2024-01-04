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
  let attributeWeights = Variables.attributeWeightsInfo['Sniper'];

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
  const playerInfoCopy = b;

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
  // a = a.map((value, i) => {
  //   console.log(attributeWeights[selectedAttributeNames[i]]);
  //   const weight = attributeWeights[selectedAttributeNames[i]];
  //   console.log(`Attribute: ${selectedAttributeNames[i]}, Weight: ${weight}`);
  //   return value * weight;
  // });
  a = a.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]]));
  b = b.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]]));

   
  // get the dot product of a and b
  const dot = dotProduct(a, b);

  // get the magnitudes/norms of a and b 
  const normA = norm(a);
  const normB = norm(b);

  // return the cosine similarity
  // dot(a,b) / (|a| * |b|)
  return { similarity: dot / (normA * normB), nameB };
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
 * calculateScore function used to calculate the score (average value
 * of the important attributes for this player type (the minimum values)).  
 * This is used when a player meets the requirements of more than 1 player 
 * type, to determine which one is the best.
 * @param {object} playerAttributes the attributes for the player
 * @param {object} playerType the player type information
 * @param {object} categoryAvgs the attribute category averages
 * @returns the score
 */
function calculateAttributeScore(playerAttributes, playerType, categoryAvgs) {
  let minimumsScore = 0;
  let count = 0;

  console.log(playerAttributes);

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

          //const minVal = playerType.minimums[category][attribute];
          console.log(playerAttributeToCheck);
          // update the score and the count
          //minimumsScore += playerAttributeToCheck - minVal;
          minimumsScore += playerAttributeToCheck;
          count++;
        }
      }
      else {
        let playerAttributeToCheck;
        console.log(category);
        if (category.includes("AVG")) {
          playerAttributeToCheck = categoryAvgs[category];
        }
        else {
          playerAttributeToCheck = playerAttributes[category];
        }

        console.log(playerAttributeToCheck);

        //const minVal = playerType.minimums[category];

        // update the score and the count
        //minimumsScore += playerAttributeToCheck - minVal;
        minimumsScore += playerAttributeToCheck;
        count++;
      }
    }
  }

  console.log(minimumsScore / count);

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
 * @param {string} position the general position of the player ('Forward' or 'Defense')
 * @returns {object} the player type that is best fit for the current player
 */
function determineBestPlayerType(playerAttributes, categoryAvgs, position) {
  let highestScore = null;
  let bestPlayerTypes = [];
  let bestPlayerTypeFit = null;

  // for each player type
  for (const typeName in Variables.playerTypesInfo[position]) {
    const playerType = Variables.playerTypesInfo[position][typeName];

    // check if all requirements are met
    if (meetsRequirements(playerAttributes, playerType, categoryAvgs)) {

      // determining the highest score using the ability scoring system
      if (highestScore = null) {
        highestScore = calculateAbilityScore(playerType);
      }
      else {
        const tempScore = calculateAbilityScore(playerType);

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
      // determining the highest score now using the attribute scoring
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

function euclideanDistance(a, b) {
  const squaredDifferences = selectedAttributeNames.reduce((sum, attr) => {
    const diff = (a[attr] - b[attr]) * attributeWeights[attr];
    return sum + diff * diff;
  }, 0);

  const eucDistance = Math.sqrt(squaredDifferences);

  return {distance: eucDistance, player: b};
}

/**
 * getPlayerType function used to get the specific player type of the player.
 * Needed for the attribute weights for the comparison.
 * @param {object} playerAttributes all the attributes of the player
 * @param {char} playerPosition character representing the player position 'C', 'W', or 'D' 
 * @returns {object} the best player type fit
 */
function getPlayerType(playerAttributes, playerPosition) {
  const categoryAvgs = getCategoryAverages(playerAttributes);

  // using forward ('C' or 'W') or defense ('D') player types
  const playerTypesToUse = playerPosition == 'D' ? Variables.playerTypesInfo.Defense : Variables.playerTypesInfo.Forward;
  const position = playerPosition == 'D' ? 'Defense' : 'Forward';

  let bestPlayerTypeFit;
  bestPlayerTypeFit = determineBestPlayerType(playerAttributes, categoryAvgs, position);

  // while bestPlayerType is null (meaning that no best player type was found)
  while (bestPlayerTypeFit == null) {
    // scaling down all the player type minimum requirements (by x amount.  Current attribute minimum minus x amount)
    scalePlayerTypeRequirements(0.01, playerPosition);
    bestPlayerTypeFit = determineBestPlayerType(playerAttributes, categoryAvgs, position);
  }

  console.log("BEST PLAYER TYPE FOR THIS PLAYER:");
  console.log(bestPlayerTypeFit);
  return bestPlayerTypeFit;
}

/**
 * scalePlayerDataAttributes function used to scale player data attributes if they are too low or high
 * @param {number} scalingFactor scaling factor multiplied to all the player data attributes 
 */
function scalePlayerDataAttributes(scalingFactor) {
  for (let i=0; i < playerData.length; i++) {
    for (const attribute in playerData[i]) {
      if (typeof playerData[i][attribute] === 'number') {
        if (attribute != "WristshotAccuracy" && attribute != "WristshotPower" && attribute != "SlapshotAccuracy" && attribute != "SlapshotPower") {
          playerData[i][attribute] = parseFloat((playerData[i][attribute] * scalingFactor).toFixed(2));
        }
      }
    }
  }
}

/**
 * scalePlayerTypeRequirements function used to scale player type requirement attributes if they are too low or high
 * @param {number} scalingModifier scaling scalingModifier subtracted to all the player data attributes 
 * @param {char} position the character representing the position 'D' for 'Defense', 'C' or 'W' for 'Forward'
 */
function scalePlayerTypeRequirements(scalingModifier, position) {
  const positionKeyName = position == 'D' ? 'Defense' : 'Forward';

  // console.log(Variables.playerTypesInfo[positionKeyName]);

  // for each player type
  Object.values(Variables.playerTypesInfo[positionKeyName]).forEach((playerType, index) => {
    // console.log(index);
    // console.log("\n\n\nBEFORE:\n", Object.values(Variables.playerTypesInfo[positionKeyName])[index]);
    if (playerType.minimums != undefined) {
      for (const category in playerType.minimums) {
        // if playerType.minimums[category] value is an object.  Meaning both category and attribute are needed and it follows 
        // something like this:   Skating: {Acceleration: 0.86}, so theres one more extra step before getting the 0.86 value
        if (typeof playerType.minimums[category] === 'object') {
          for (const attribute in playerType.minimums[category]) {

            // console.log("\n\n\n\n");
            // console.log(attribute);
            // console.log(Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category][attribute]);
            Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category][attribute] -= scalingModifier;
            // console.log(Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category][attribute]);
            
          }
        }
        // if the playerType.minimums[category] is not an object, can just use category to get the value.  Ex: {Acceleration: 0.86}
        else {
          // console.log("\n\n\n\n");
          // console.log(category);
          // console.log(Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category]);
          Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category] -= scalingModifier;
          // console.log(Object.values(Variables.playerTypesInfo[positionKeyName])[index].minimums[category]);
        }
      }
    }
    // console.log("\n\n\AFTER:\n", Object.values(Variables.playerTypesInfo[positionKeyName])[index]);
  });
}

/**
 * findSimilarPlayers function used to find the most similar and least similar players
 */
export function findSimilarPlayers() {
  // create a KD-tree for fast nearest neighbor search
  // const kdtree = new kdTree(playerData, cosineSimilarity, selectedAttributeNames);

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

  console.log(playerData.length);
  playerData.forEach((player, index) => {
    if (player.Name == "Alex Ovechkin") {
      console.log(player);
      console.log(index);
    }
    else if (player.Name == "Steven Stamkos") {
      console.log(player);
      console.log(index);
    }
  });

  scalePlayerDataAttributes(1.025);
  samplePlayer = playerData[540];

  samplePlayer = UtilityFunctions.getAttributeObject();
  samplePlayer['Name'] = 'Created Player';
  samplePlayer['main-position'] = 'W';
  samplePlayer = normalizePlayerData(samplePlayer);

  console.log("Player being used:");

  console.log(samplePlayer);

  const playerPosition = samplePlayer['main-position'];

  const bestPlayerType = getPlayerType(samplePlayer, samplePlayer['main-position']);
  attributeWeights = Variables.attributeWeightsInfo[bestPlayerType.DisplayName];

  // if (playerPosition == 'C') {
  //   if (bestPlayerType.DisplayName != "Faceoff Specialist" && bestPlayerType.DisplayName != "Two-way Liability") {
  //     if (bestPlayerType.DisplayName.toLowerCase().includes("two-way")) {
  //       attributeWeights.Faceoffs = 0.1;
  //     }
  //     else {
  //       attributeWeights.Faceoffs = 0.01;
  //     }
  //   }
  // }
  // console.log(attributeWeights);

  // console.log(euclideanDistance(samplePlayer, playerData[741]));

  // // Find the top 3 most similar players
  // // (subject to change: finding 871 (all players) for nearest neighbours)
  // const nearestNeighbors = kdtree.nearest(samplePlayer, playerData.length);

  // // sorting by ascending order
  // // nearestNeighbors.sort((a, b) => a[1].distance - b[1].distance);
  // // sort by descending order
  // nearestNeighbors.sort((a, b) => b[1].similarity - a[1].similarity);

  // console.log(nearestNeighbors);

  // // getting the top 3 nearest/most similar
  // const top3Neighbors = nearestNeighbors.slice(0, 10);


  // console.log("\n\n\nMost Similar:");
  // // 'nearestNeighbors' contains the top matches
  // top3Neighbors.forEach((nn, index) => {
  //   console.log("%s  %o  Similarity: %f, ", index + 1, nn.player, nn.simi);
  // });

  // // getting the 3 least similar
  // const bottom3neighbours = nearestNeighbors.slice(-3, nearestNeighbors.length);

  // bottom3neighbours.sort((a, b) => a[1].similarity - b[1].similarity);

  // console.log("\n\n\nLeast Similar:");
  // // 'nearestNeighbors' contains the top matches
  // bottom3neighbours.forEach((nn, index) => {
  //   console.log("%s  %o  Similarity: %f, ", index + 1, nn[0], nn[1]['similarity']);
  // });
  // console.log("");

  const generalPlayerPosition = playerPosition == 'D' ? 'D' : 'F';

  // // Calculate cosine distances between the query player and all players in the dataset
  const allDistances = playerData.map((currPlayer, index) => {
    // const info = cosineSimilarity(samplePlayer, player);
    // const similarity = info.similarity;
    // return { index, similarity };

    // so only forwards are compares to forwards and defenseman to defenseman
    if (generalPlayerPosition == 'F' && (currPlayer['main-position'] == 'C' || currPlayer['main-position'] == 'W')) {
      const info = euclideanDistance(samplePlayer, currPlayer);
      return info;
    }
    else if (generalPlayerPosition == 'D' && currPlayer['main-position'] == 'D')
    {
      const info = euclideanDistance(samplePlayer, currPlayer);
      return info;
    }
    
    return null;
  }).filter(info => info != null);

  // Sort all players based on distances in descending order
  const sortedPlayers = allDistances.sort((a, b) => a.distance - b.distance);

  console.log(sortedPlayers);
  console.log(sortedPlayers[392]);

  sortedPlayers.forEach((sp, index) => {
    if (sp.player.Name == "Alex Ovechkin") {
      console.log(sp);
      console.log(index);
    }
  });

  let k = 1;
  console.log("\n\nMost Similar:");
  for (let i = 0; i < 50; i++) {
    console.log("%s %o eucDistance: %f", k, sortedPlayers[i].player, sortedPlayers[i].distance);
    k++;
  }

  const sortedPlayers2 = allDistances.sort((a, b) => b.distance - a.distance);

  let j = 1;
  console.log("\n\nLeast Similar:");
  for (let i = 0; i < 10; i++) {
    console.log("%s %o eucDistance: %f", j, sortedPlayers[i].player, sortedPlayers[i].distance);
    j++;
  }

} 

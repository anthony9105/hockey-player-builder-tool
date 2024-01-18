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



// /**
//  * dotProduct function
//  * @param {number|object} a values of a (values should be from 0.0 to 1.0).
//  * example: a = [x: 0.3, y: 0.6, z: 0.82]
//  * @param {number|object} b values of b (values should be from 0.0 to 1.0)
//  * @returns {number} the dot product of the values in a and b
//  */
// function dotProduct(a, b) {
//   return a.reduce((acc, val, i) => acc + val * b[i], 0);
// }

// /**
//  * norm function (Euclidean norm or magnitude)
//  * @param {number|object} vector vector
//  * @returns {number} magnitude of the vector
//  */
// function norm(vector) {
//   // squaring each component, then summing the squares, then square rooting the sum
//   return Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
// }

// /**
//  * cosineSimilarity function used to measure similarity between a and b (2 players)
//  * @param {number|object} a values of a. ex: [x: 0.3, y: 0.6, z: 0.82]
//  * @param {number|object} b values of b
//  * @returns {number} the cosine similarity of a and b
//  */
// function cosineSimilarity(a, b) {
//   const playerInfoCopy = b;

//   // if a and b are objects then they are converted to arrays
//   a = Array.isArray(a) ? [...a] : selectedAttributeNames.map(attr => a[attr]);
//   b = Array.isArray(b) ? [...b] : selectedAttributeNames.map(attr => b[attr]);

//   // names of a and b for later
//   const nameA = a.Name;
//   const nameB = b.Name;

//   // remove 'Name' and 'main-position' from the arrays
//   a = a.filter(attr => attr !== nameKey && attr !== positionKey);
//   b = b.filter(attr => attr !== nameKey && attr !== positionKey);

//   // apply specific attribute weights
//   // a = a.map((value, i) => {
//   //   console.log(attributeWeights[selectedAttributeNames[i]]);
//   //   const weight = attributeWeights[selectedAttributeNames[i]];
//   //   console.log(`Attribute: ${selectedAttributeNames[i]}, Weight: ${weight}`);
//   //   return value * weight;
//   // });
//   a = a.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]]));
//   b = b.map((value, i) => value * (attributeWeights[selectedAttributeNames[i]]));

   
//   // get the dot product of a and b
//   const dot = dotProduct(a, b);

//   // get the magnitudes/norms of a and b 
//   const normA = norm(a);
//   const normB = norm(b);

//   // return the cosine similarity
//   // dot(a,b) / (|a| * |b|)
//   return { similarity: dot / (normA * normB), nameB };
// }

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
  const Physical_AVG = getCategoryAverage(playerAttributes, Constants.physicalityAttributes);
  const Puckskills_AVG = getCategoryAverage(playerAttributes, Constants.puckSkillsAttributes);

  return { Skating_AVG, Defense_AVG, Shooting_AVG, Physical_AVG, Puckskills_AVG };
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

          // console.log(playerAttributeToCheck);
          // update the score and the count
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

        // console.log(playerAttributeToCheck);

        // update the score and the count
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
  let bestPlayerTypeFit = null;
  let bestPlayerTypeOptions = [];

  // for each player type
  for (const typeName in Variables.playerTypesInfo[position]) {
    const playerType = Variables.playerTypesInfo[position][typeName];

    // check if all requirements are met
    if (meetsRequirements(playerAttributes, playerType, categoryAvgs)) {

      // determining the highest score using the ability scoring system
      if (highestScore == null) {
        highestScore = calculateAbilityScore(playerType);
        bestPlayerTypeOptions.push(playerType);
        console.log(highestScore);
      }
      else {
        const tempScore = calculateAbilityScore(playerType);

        console.log(tempScore);
        console.log(highestScore);

        // if tempScore is the same as highestScore, or its only greater than highest score by 3 or less, consider this a "tie"
        if (tempScore == highestScore || (tempScore > highestScore && tempScore - highestScore <= 3)) {
          highestScore = "tied";
          bestPlayerTypeOptions.push(playerType);
        }
        // update highestScore if tempScore is greater than highestScore by 4 or more
        else if (tempScore > highestScore + 3) {
          highestScore = tempScore;
          bestPlayerTypeOptions = [];
          bestPlayerTypeOptions.push(playerType);
        }
      }
    }
  }

  // if no player type requirements were met
  if (bestPlayerTypeOptions.length == 0) {
    console.log("No player type requirements were met");
  }
  // if 1 player type was determined as the best from the abilities scoring method
  else if (bestPlayerTypeOptions.length == 1) {
    bestPlayerTypeFit = bestPlayerTypeOptions[0];
  }
  // if theres still multiple eligible player types because the previous scoring resulted in a tie.
  // Use the other scoring method based off the player type's minimum requirement attributes.
  else {
    let tieBreakerHighestScore = null;
    console.log(categoryAvgs);
    bestPlayerTypeOptions.forEach(bestPlayerType => {
      // determining the highest score now using the attribute scoring
      if (tieBreakerHighestScore == null) {
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
 * euclideanDistance function used to calculate the euclidean distance of
 * a and b.  Used to determine similarity.
 * Euclidean distance formula: d(a,b) = sqrt(sum((ai - bi))^2)
 * @param {object} a values of a. ex: {x: 0.3, y: 0.6, z: 0.82} 
 * @param {*} b values of b
 * @returns the distance which represents how similar a and b are 
 * (the closer to 0 the more similar)
 */
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

  let count = 0;

  // while bestPlayerType is null (meaning that no best player type was found)
  while (bestPlayerTypeFit == null && count < 3) {
    // scaling down all the player type minimum requirements (by x amount.  Current attribute minimum minus x amount)
    scalePlayerTypeRequirements(0.01, playerPosition);
    bestPlayerTypeFit = determineBestPlayerType(playerAttributes, categoryAvgs, position);
    count++;
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
        // applying thescaling factor to all numerical values except for the shooting attributes
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
  // samplePlayer = playerData[540];

  let samplePlayer = UtilityFunctions.getAttributeObject();
  samplePlayer['Name'] = 'Created Player';
  samplePlayer['main-position'] = document.getElementById('position-selection').value;
  samplePlayer = normalizePlayerData(samplePlayer);

  console.log("Player being used:");

  console.log(samplePlayer);

  const playerPosition = samplePlayer['main-position'];

  const bestPlayerType = getPlayerType(samplePlayer, samplePlayer['main-position']);
  attributeWeights = Variables.attributeWeightsInfo[bestPlayerType.DisplayName];

  if (attributeWeights == undefined) {
    console.warn("Attribute weights undefined.  Likely missing/typo of this player type.  The best player type currently is called: "+bestPlayerType.DisplayName);
  }

  if (playerPosition == 'C') {
    if (bestPlayerType.DisplayName != "Faceoff Specialist" && bestPlayerType.DisplayName != "Two-way Liability") {
      if (bestPlayerType.DisplayName.toLowerCase().includes("two-way")) {
        attributeWeights.Faceoffs = 0.1;
      }
      else {
        console.log(bestPlayerType);
        attributeWeights.Faceoffs = 0.01;
      }
    }
  }

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

  sortedPlayers.forEach((sp, index) => {
    if (sp.player.Name == "Alex Ovechkin") {
      console.log(sp);
      console.log(index);
    }
  });

  let k = 1;
  console.log("\n\nMost Similar:");
  for (let i = 0; i < 5; i++) {
    console.log("%s %o eucDistance: %f", k, sortedPlayers[i].player, sortedPlayers[i].distance);
    k++;
  }


  let j = 1;
  console.log("\n\nLeast Similar:");
  for (let i = sortedPlayers.length-1; i > sortedPlayers.length - 1 - 5; i--) {
    console.log("%s %o eucDistance: %f", j, sortedPlayers[i].player, sortedPlayers[i].distance);
    j++;
  }

  setCompleteBuildContent(sortedPlayers.slice(0, 3), sortedPlayers.slice(sortedPlayers.length - 3, sortedPlayers.length), bestPlayerType);
} 


export function setCompleteBuildContent(mostSimilarPlayers, leastSimilarPlayers, bestPlayerType) {
  let similarPlayers = document.getElementsByClassName(Constants.SIMILAR_PLAYER_CLASSNAME);
  let dissimilarPlayers = document.getElementsByClassName(Constants.DISSIMILAR_PLAYER_CLASSNAME);

  let playerTypeName = document.getElementById(Constants.PLAYERTYPE_NAME_ID);
  playerTypeName.textContent = bestPlayerType.DisplayName;

  let playerTypeDescription = document.getElementById(Constants.PLAYERTYPE_DESC_ID);
  playerTypeDescription.textContent = bestPlayerType.Description;

  let mainSkillsList = document.getElementById(Constants.MAINSKILLS_LIST_ID);
  let secSkillsList = document.getElementById(Constants.SECSKILLS_LIST_ID);
  let weaknessesList = document.getElementById(Constants.WEAKNESSES_LIST_ID);


  for (let skill of bestPlayerType.MainSkills) {
    let newListItem = document.createElement("li");

    for (let charIndex=1; charIndex < skill.length; charIndex++) {
      if (skill[charIndex] === skill[charIndex].toUpperCase()) {
        const lowerCaseChar = skill[charIndex].toLowerCase();

        skill = skill.slice(0, charIndex) + " " + lowerCaseChar + skill.slice(charIndex + 1);
      }
    }

    newListItem.textContent = skill;

    mainSkillsList.appendChild(newListItem);
  }

  for (let skill of bestPlayerType.SecondarySkills) {
    let newListItem = document.createElement("li");

    for (let charIndex=1; charIndex < skill.length; charIndex++) {
      if (skill[charIndex] === skill[charIndex].toUpperCase()) {
        const lowerCaseChar = skill[charIndex].toLowerCase();

        skill = skill.slice(0, charIndex) + " " + lowerCaseChar + skill.slice(charIndex + 1);
      }
    }
    newListItem.textContent = skill;

    secSkillsList.appendChild(newListItem);
  }

  for (let weakness of bestPlayerType.Weaknesses) {
    let newListItem = document.createElement("li");

    for (let charIndex=1; charIndex < weakness.length; charIndex++) {
      if (weakness[charIndex] === weakness[charIndex].toUpperCase()) {
        const lowerCaseChar = weakness[charIndex].toLowerCase();

        weakness = weakness.slice(0, charIndex) + " " + lowerCaseChar + weakness.slice(charIndex + 1);
      }
    }

    newListItem.textContent = weakness;

    weaknessesList.appendChild(newListItem);
  }


  Array.from(similarPlayers).forEach((similarPlayer, index) => {
    similarPlayer.children[0].textContent = index+1 + ".   ";
    similarPlayer.children[1].href = UtilityFunctions.getPlayerWebsiteURL(mostSimilarPlayers[index].player.Name);
    similarPlayer.children[1].textContent = mostSimilarPlayers[index].player.Name;

    dissimilarPlayers[index].children[0].textContent = index+1 + ".   ";
    dissimilarPlayers[index].children[1].href = UtilityFunctions.getPlayerWebsiteURL(leastSimilarPlayers[leastSimilarPlayers.length - index - 1].player.Name);
    dissimilarPlayers[index].children[1].textContent = leastSimilarPlayers[leastSimilarPlayers.length - index - 1].player.Name;
  });
}
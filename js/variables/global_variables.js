/**
 * 2022-2023
 * Anthony Liscio
 * 
 * global_variables.js
 * 
 *    Used to store variables which are used and changed throughout the other js files.
 */

import * as Constants from "./constants.js";

// global variables used throughout
export let heights = document.getElementById(Constants.HEIGHTS_ID);
export let weights = document.getElementById(Constants.WEIGHTS_ID);
export let playerTypes = document.getElementById(Constants.PLAYERTYPE_ID);

export let attributeValues = document.getElementsByClassName(Constants.ATTRIBUTE_VALUES_CLASSNAME);
export let upgradeValues = document.getElementsByClassName(Constants.UPGRADE_VALUES_CLASSNAME);
export let boostValues = document.getElementsByClassName(Constants.BOOST_VALUE_CLASSNAME);
export let boostRequirements = document.getElementsByClassName(Constants.BOOST_REQ_CLASSNAME);

export let boostSection = document.getElementById(Constants.BOOST_SECTION_ID);
export let boostDisplayItems = document.getElementsByClassName(Constants.BOOST_DISPLAY_ITEM_CLASSNAME);

export let mainAbilityNames = document.getElementsByClassName(Constants.MAIN_ABILITY_NAME_CLASSNAME);
export let mainAbilityDescriptions = document.getElementsByClassName(Constants.MAIN_ABILITY_DESCRIPTION_CLASSNAME);
export let mainAbilityIcons = document.getElementById(Constants.MAIN_ABILITY_SECTION_ID).getElementsByClassName(Constants.ICONS_CLASSNAME);
export let mainAbilityItems = document.getElementsByClassName(Constants.MAIN_ABILITY_ITEM_CLASSNAME);

export let abilityItems = document.getElementsByClassName(Constants.ABILITY_ITEM_CLASSNAME);
export let abilityNames = document.getElementsByClassName(Constants.ABILITY_NAME_CLASSNAME);
export let abilityDescriptions = document.getElementsByClassName(Constants.ABILITY_DESCRIPTION_CLASSNAME);
export let abilityRequirements = document.getElementsByClassName(Constants.ABILITY_REQ_CLASSNAME);

export let boostItems = document.getElementsByClassName(Constants.BOOST_ITEM_CLASSNAME);

export let abilityDisplayItems = document.getElementsByClassName(Constants.ABILITY_DISPLAY_ITEM_CLASSNAME);
export let mainAbilityDisplayItem = document.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_ITEM_CLASSNAME)[0];
export let abilityDisplayNames = document.getElementsByClassName(Constants.ABILITY_DISPLAY_NAME_CLASSNAME);
export let mainAbilityDisplayName = document.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_NAME_CLASSNAME)[0];

export let unselectButtons = document.getElementsByClassName(Constants.UNSELECT_BUTTON_CLASSNAME);
export let boostUpgradeValues = document.getElementsByClassName(Constants.BOOST_UPGRADE_VALUES_CLASSNAME);

export let attributeMeters = document.getElementsByClassName(Constants.ATTRIBUTE_METER_CLASSNAME);

export let abilityTypes = [];



export let buildPosition;



export let globalPreviousHeight;
export let globalPreviousWeight;
export let globalCurrentHeight;
export let globalCurrentWeight;

export let availableUpgradePoints = [0, 0, 0, 0, 0];
export let previousUpgradeModifier = new Array(23).fill(0);

// SETTERS
export function setGlobalPreviousHeight(newValue) {
  globalPreviousHeight = newValue;
}

export function setGlobalPreviousWeight(newValue) {
  globalPreviousWeight = newValue;
}

export function setGlobalCurrentHeight(newValue) {
  globalCurrentHeight = newValue;
}

export function setGlobalCurrentWeight(newValue) {
  globalCurrentWeight = newValue;
}

export function resetAvailableUpgradePoints() {
  availableUpgradePoints = [0, 0, 0, 0, 0];
}

export function resetPreviousUpgradeModifier() {
  previousUpgradeModifier = Array(23).fill(0);
}


/**
 * PLAYER TYPES
 */
export let playerTypesInfo = {
  Forward: {
      // All around offensive threat but still specializes in goalscoring/shooting/sniping
      Sniper: {
          DisplayName: "Sniper",
          Description: "Exceptional shooting stands out above everything else but still elite in all other offensive skills",
          MainSkills: ["Shooting"],
          SecondarySkills: ["PuckSkills", "Shooting", "Skating"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.825,
              Puckskills: {
                  Passing: 0.82,
                  Deking: 0.82,
                  PuckControl: 0.84,
                  HandEye: 0.8,
                  OffensiveAwareness: 0.89,
              },
          },
          maximums: {
              Defense_AVG: 0.83,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.84,
              }
          },
      },
      Pure_Sniper: {
          DisplayName: "Pure Sniper",
          Description: "Exceptional shooting and not much else",
          MainSkills: ["Shooting"],
          SecondarySkills: ["Shooting"],
          Weaknesses: ["Passing", "Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.83,
          },
          maximums: {
              Puckskills: {
                  Passing: 0.82,
                  Deking: 0.88,
              },
              Defense_AVG: 0.83,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.83,
              }
          },
      },
      Sniping_pwf: {
          DisplayName: "Sniping Power Forward",
          Description: "Exceptional shooting and good strength/power",
          MainSkills: ["Shooting"],
          SecondarySkills: ["Shooting", "Physicality"],
          Weaknesses: ["Defense"],
          minimums: {
              Shooting_AVG: 0.825,
              Physical: {
                  BodyChecking: 0.85,
                  Strength: 0.84,
              }
          },
          maximums: {
              Puckskills: {
                  Passing: 0.89,
              },
              Defense_AVG: 0.82,
          },
      },
      Pure_Playmaker: {
          DisplayName: "Pure Playmaker",
          Description: "Elite passing and playmaking but hardly scores goals",
          MainSkills: ["Passing"],
          SecondarySkills: ["Passing", "PuckSkills", "Skating"],
          Weaknesses: ["Shooting", "Physicality", "Defense"],
          minimums: {
              Puckskills: {
                  Passing: 0.88,
                  PuckControl: 0.87,
                  Deking: 0.82,
              },
          },
          maximums: {
              Shooting_AVG: 0.8,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.84,
              },
              Defense_AVG: 0.83,
          },
      },
      Physical_Playmaker: {
          DisplayName: "Playmaking Power Forward",
          Description: "Elite passing and strength/power but hardly scores goals",
          MainSkills: ["Passing"],
          SecondarySkills: ["Passing", "Physicality", "PuckSkills"],
          Weaknesses: ["Shooting", "Defense"],
          minimums: {
              Puckskills: {
                  Passing: 0.88,
                  PuckControl: 0.87,
                  Deking: 0.82,
              },
              Physical: {
                  BodyChecking: 0.85,
                  Strength: 0.84,
              },
          },
          maximums: {
              Shooting_AVG: 0.8,
              Defense_AVG: 0.85,
          },
      },
      // Good all around offensively, good skating, weak defense, weak physicality
      Offensive_Threat: {
          DisplayName: "Offensive Threat",
          Description: "Elite all-around offensive game, lacking on defense and physically",
          MainSkills: ["Shooting", "PuckSkills", "Passing"],
          SecondarySkills: ["Shooting", "PuckSkills", "Passing", "Skating"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Puckskills: {
                  Passing: 0.87,
                  PuckControl: 0.87,
                  OffensiveAwareness: 0.89,
              },
              Shooting_AVG: 0.78,
              Skating: {
                  Speed: 0.87,
                  Acceleration: 0.87,
                  Agility: 0.87,
              },
          },
          maximums: {
              Defense_AVG: 0.83,
              Physical: {
                  BodyChecking: 0.81,
                  Strength: 0.84,
              }
          },
      },
      Rush_offense_specialist: {
          DisplayName: "Rush Offense Specialist",
          Description: "Possesses elite skating and decent offensive skills, not good physically or defensively",
          MainSkills: ["Rush", "Skating"],
          SecondarySkills: ["PuckSkills", "Skating", "Rush"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Puckskills: {
                  Passing: 0.83,
                  PuckControl: 0.83,
              },
              Shooting_AVG: 0.79,
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.88,
                  Agility: 0.85,
              },
          },
          maximums: {
              Defense_AVG: 0.81,
              Physical: {
                  BodyChecking: 0.81,
                  Strength: 0.81,
              }
          },
      },
      High_intensity_twoway_fwd: {
          DisplayName: "High-intensity Two-way Forward",
          Description: "Menace on the forecheck with great skating and defense.  Offensive skills are lacking.",
          MainSkills: ["Defense", "Skating"],
          SecondarySkills: ["Defense", "Skating", "Grit"],
          Weaknesses: ["Shooting"],
          minimums: {
              Defense: {
                  StickChecking: 0.8,
                  DefensiveAwareness: 0.8,
              },
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.88,
                  Agility: 0.85,
              },
          },
          maximums: {
              Shooting_AVG: 0.78,
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.85
              }
          },
      },
      Penalty_kill_specialist: {
          DisplayName: "Penalty Kill Specialist", 
          Description: "Fearless forward who will block any shot, great for killing penalties and not much else",
          MainSkills: ["Defense", "Grit"],
          SecondarySkills: ["Defense", "Grit"],
          Weaknesses: ["Shooting", "PuckSkills", "Passing", "Skating"],
          minimums: {
              Defense: {
                  StickChecking: 0.84,
                  DefensiveAwareness: 0.84,
                  ShotBlocking: 0.83,
              },
          },
          maximums: {
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.88,
                  Agility: 0.88,
              },
              Shooting_AVG: 0.78,
              Puckskills: {
                  PuckControl: 0.84,
                  Passing: 0.84,
                  OffensiveAwareness: 0.84
              }
          },
      },
      Faceoff_Specialist: {
          DisplayName: "Faceoff Specialist",
          Description: "Elite at taking faceoffs",
          MainSkills: ["Faceoffs"],
          SecondarySkills: ["Faceoffs"],
          Weaknesses: ["Shooting", "PuckSkills", "Passing", "Skating", "Defense"],
          minimums: {
              Defense: {
                  Faceoffs: 0.9,
              },
          },
          maximums: {
              Skating: {
                  Speed: 0.85,
                  Acceleration: 0.85,
                  Agility: 0.85,
              },
              Shooting_AVG: 0.78,
              Puckskills: {
                  PuckControl: 0.81,
                  Passing: 0.81,
                  OffensiveAwareness: 0.8
              },
              Defense_AVG: 0.82,
          },
      },
      //
      Grinder: {
          DisplayName: "Grinder",
          Description: "Uses physicality and defensive play to be effective.  Also usually have great hand-eye for scoring deflections and rebounds",
          MainSkills: ["Grit"],
          SecondarySkills: ["Grit", "Physicality", "Defense"],
          Weaknesses: ["Shooting", "PuckSkills", "Passing"],
          minimums: {
              Defense_AVG: 0.81,
              Physicality: {
                  BodyChecking: 0.82,
                  Strength: 0.85,
                  HandEye: 0.85,
              }
          },
          maximums: {
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.89,
                  Agility: 0.89,
              },
              Shooting_AVG: 0.78,
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.84,
                  OffensiveAwareness: 0.84
              },
          },
      },
      Two_way_fwd: {
          DisplayName: "Two-way Forward",
          Description: "Well-rounded but does not stand out in any area other than defensively",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense"],
          Weaknesses: ["None"],
          minimums: {
              Defense_AVG: 0.83,
          },
          maximums: {
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.89,
                  Agility: 0.89,
              },
              Shooting_AVG: 0.81,
              Puckskills: {
                  PuckControl: 0.87,
                  Passing: 0.87,
                  OffensiveAwareness: 0.87
              },
              Physical_AVG: 0.84,
          },
      },
      Powerforward: {
          DisplayName: "Power Forward",
          Description: "Utilizes elite strength and power to be effective",
          MainSkills: ["Physicality"],
          SecondarySkills: ["Physicality", "Shooting", "Grit"],
          Weaknesses: ["Defense", "Passing", "Skating"],
          minimums: {
              Skating: {
                  Balance: 0.8,
              },
              Physicality: {
                  BodyChecking: 0.85,
                  Strength: 0.85,
              },
              Shooting: {
                  WristshotPower: 0.82,
                  SlapshotPower: 0.82,
              }
          },
          maximums: {
              Skating: {
                  Speed: 0.88,
                  Acceleration: 0.88,
                  Agility: 0.88,
              },
              Puckskills: {
                  Passing: 0.85,
              },
              Defense_AVG: 0.82,
          },
      },
      Speedy_Offensive_Threat: {
          DisplayName: "Speedy Offensive Threat",
          Description: "Exceptional skating along with elite puck carrying, passing, and goal scoring ability",
          MainSkills: ["Skating", "Rush"],
          SecondarySkills: ["Skating", "PuckSkills", "Passing", "Shooting", "Rush"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Puckskills: {
                  Passing: 0.85,
                  PuckControl: 0.87,
                  OffensiveAwareness: 0.87,
              },
              Shooting: {
                  WristshotAccuracy: 0.8,
              },
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
                  Agility: 0.88,
              },
          },
          maximums: {
              Defense_AVG: 83,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.83,
              }
          },
      },
      Two_way_powerforward: {
          DisplayName: "Two-way Power Forward",
          Description: "Utilizing both solid defense and physicality to make an impact",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Grit"],
          Weaknesses: ["Passing"],
          minimums: {
              Defense_AVG: 0.84,
              Physical_AVG: 0.84,
          },
          maximums: {
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
                  Agility: 0.9,
              },
              Shooting_AVG: 0.8,
              Puckskills: {
                  Passing: 0.85,
                  OffensiveAwareness: 0.85
              },
          },
      },
      Two_way_offensive_threat: {
          DisplayName: "Two-way Offensive Threat",
          Description: "Great offensive and defensive skills, great skating, and decent physicality",
          MainSkills: ["Passing", "PuckSkills", "Defense"],
          SecondarySkills: ["Passing", "PuckSkills", "Defense", "Skating", "Grit", "Shooting", "Rush"],
          Weaknesses: ["None"],
          minimums: {
              Defense: {
                  DefensiveAwareness: 0.84,
                  StickChecking: 0.84,
              },
              Physical: {
                  Strength: 0.8,
              },
              Skating: {
                  Speed: 0.86,
                  Acceleration: 0.86,
                  Agility: 0.86,
                  Balance: 0.8,
              },
              Puckskills: {
                  PuckControl: 0.86,
                  Passing: 0.86,
                  OffensiveAwareness: 0.86
              },
              Shooting_AVG: 0.84,
          },
          maximums: {
              Shooting_AVG: 0.83,
              Physical: {
                BodyChecking: 0.85
              }
          },
      },
      Undersized_finesse_forward: {
          DisplayName: "Undersized Finesse Forward",
          Description: "You utilize your skill to make up for the lack of size and strength",
          MainSkills: ["PuckSkills", "Passing"],
          SecondarySkills: ["Passing", "PuckSkills", "Skating", "Shooting"],
          Weaknesses: ["Physicality", "Balance", "Defense"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.87,
                  Passing: 0.86,
                  OffensiveAwareness: 0.87
              },
              Shooting_AVG: 0.77,
              Skating: {
                  Speed: 0.86,
                  Acceleration: 0.86,
                  Agility: 0.86,
              },
          },
          maximums: {
              Physical: {
                  Strength: 0.82,
                  BodyChecking: 0.81,
              },
              Skating: {
                  Balance: 0.81
              },
              Defense_AVG: 0.82
          }
      },
      Mobile_depth_fwd: {
          DisplayName: "Mobile Depth Finesse Forward",
          Description: "Solid skater who can put up some points but doesn't really stand out anywhere",
          MainSkills: ["Skating"],
          SecondarySkills: ["Passing", "Skating", "PuckSkills", "Shooting"],
          Weaknesses: ["Defense"],
          minimums: {
              Skating: {
                  Acceleration: 0.88,
                  Speed: 0.88,
              },
              Puckskills: {
                  Passing: 0.8,
                  PuckControl: 0.8,
              }
          },
          maximums: {
              Puckskills_AVG: 0.88,
              Shooting_AVG: 0.82,
              Defense_AVG: 0.8
          }
      },
      Enforcer: {
        DisplayName: "Enforcer",
        Description: "Utilizes physicality, especially fighting, to be effective",
        MainSkills: ["Physicality", "Grit"],
        SecondarySkills: ["Physicality", "Grit"],
        Weaknesses: ["Shooting", "Defense", "PuckSkills", "Passing", "Skating"],
        minimums: {
            Physical: {
                FightingSkill: 0.8,
                Strength: 0.83,
                BodyChecking: 0.83
            },
        },
        maximums: {
            Defense_AVG: 0.8,
            Shooting_AVG: 0.815,
            Skating_AVG: 0.83,
            Puckskills_AVG: 0.8,
        },
    },
      Extra_fwd: {
          DisplayName: "Two-way Liability",
          Description: "Liability on all parts of the ice",
          MainSkills: [],
          SecondarySkills: [],
          Weaknesses: ["Everything"],
          maximums: {
              Defense_AVG: 0.8,
              Physical_AVG: 0.79,
              Shooting_AVG: 0.78,
              Skating_AVG: 0.83,
              Puckskills_AVG: 0.78,
          },
      },
  },
  Defense: {
      Offenisve_dman: {
          DisplayName: "Offensive Defenseman",
          Description: "Overall offensive side of your game stands out above all else",
          MainSkills: ["PuckSkills", "Shooting", "Passing"],
          SecondarySkills: ["PuckSkills", "Shooting", "Passing"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.81,
              Puckskills: {
                  PuckControl: 0.87,
                  Passing: 0.88,
                  OffensiveAwareness: 0.88
              },
          },
          maximums: {
              Defense: {
                  DefensiveAwareness: 0.89
              },
              Physical_AVG: 0.84,
          },
      },
      Fourth_fwd_dman: {
          DisplayName: "Fourth Forward",
          Description: "Possesses such elite offensive skills and below average defense at best, that people wonder why you are a defenseman instead of a forward",
          MainSkills: ["PuckSkills", "Shooting", "Passing"],
          SecondarySkills: ["PuckSkills", "Shooting", "Passing", "Skating"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.8,
              Puckskills_AVG: 0.87,
              Skating: {
                  Acceleration: 0.85,
                  Speed: 0.85,
              }
          },
          maximums: {
              Defense_AVG: 0.83,
              Physical_AVG: 0.81,
          },
      },
      Defensive_dman: {
          DisplayName: "Defensive Defenseman",
          Description: "Elite defensively but still not a liability offensively",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Skating", "Passing", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.88,
              Physical_AVG: 0.84,
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.86,
                  Passing: 0.89,
                  OffensiveAwareness: 0.85
              },
          },
      },
      Mobile_defensive_dman: {
          DisplayName: "Mobile Defensive Defenseman",
          Description: "Elite defensively with good skating",
          MainSkills: ["Skating", "Defense"],
          SecondarySkills: ["Defense", "Physicality", "Skating", "Passing", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.88,
              Physical_AVG: 0.82,
              Skating: {
                  Acceleration: 0.89,
                  Speed: 0.89
              }
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.88,
                  Passing: 0.91,
                  OffensiveAwareness: 0.87
              },
          },
      },
      Pure_defensive_dman: {
          DisplayName: "Pure Shutdown Defenseman",
          Description: "Elite defensively but a bit lost with the puck",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Grit"],
          Weaknesses: ["PuckSkills", "Passing", "Shooting"],
          minimums: {
              Defense_AVG: 0.88,
              Physical_AVG: 0.84,
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.84,
                  Passing: 0.84,
                  OffensiveAwareness: 0.82
              },
          },
      },
      Tough_Defensive_dman: {
          DisplayName: "Tough Defensive Defenseman",
          Description: "Elite in a combination of defensive skills and physicality",
          MainSkills: ["Physicality", "Grit"],
          SecondarySkills: ["Physicality", "Defense", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.88,
              Physical_AVG: 0.87,
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.87,
                  OffensiveAwareness: 0.84
              },
          },
      },
      Mobile_offensive_dman: {
          DisplayName: "Mobile Offensive Defenseman",
          Description: "Exceptional skating and puck carrying, as well as offensive skills",
          MainSkills: ["Skating"],
          SecondarySkills: ["Skating", "PuckSkills", "Shooting", "Passing"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.82,
              Puckskills: {
                  PuckControl: 0.87,
                  Passing: 0.87,
                  OffensiveAwareness: 0.86
              },
              Skating: {
                  Speed: 0.91,
                  Acceleration: 0.9,
                  Agility: 0.88,
              },
          },
          maximums: {
              Defense: {
                  DefensiveAwareness: 0.9
              },
              Physical_AVG: 0.8,
          },
      },
      Two_way_dman: {
          DisplayName: "Two-way Defenseman",
          Description: "A defenseman with no real weaknesses especially reliable defensively",
          MainSkills: ["Defense", "Passing"],
          SecondarySkills: ["Defense", "Passing", "Physicality"],
          Weaknesses: ["Shooting"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.84,
                  Passing: 0.85,
                  OffensiveAwareness: 0.83
              },
              Skating: {
                  Speed: 0.83,
                  Acceleration: 0.83,
                  Agility: 0.83,
              },
              Defense_AVG: 0.85,
          },
          maximums: {
              Defense_AVG: 0.95,
              Physical_AVG: 0.87,
          },
      },
      Mobile_two_way_dman: {
          DisplayName: "Mobile Two-way Defenseman",
          Description: "A well-rouned defenseman with exceptional skating",
          MainSkills: ["Skating", "Defense"],
          SecondarySkills: ["Skating", "Defense", "Passing"],
          Weaknesses: ["Shooting"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.86,
                  Passing: 0.86,
                  OffensiveAwareness: 0.84
              },
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
              },
              Defense_AVG: 0.85,
          },
          maximums: {
              Defense_AVG: 0.95,
              Physical_AVG: 0.84,
          },
      },
      Goal_scoring_two_way_dman: {
          DisplayName: "Goal-scoring Two-way Defenseman",
          Description: "Well-rounded defenseman with a great shot, and average physicality at best",
          MainSkills: ["Shooting"],
          SecondarySkills: ["Shooting", "Defense", "PuckSkills"],
          Weaknesses: ["Skating"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.83
              },
              Shooting_AVG: 0.815,
              Defense_AVG: 0.87,
          },
          maximums: {
              Defense_AVG: 0.95,
              Physical_AVG: 0.84,
              Skating: {
                  Acceleration: 0.9,
                  Speed: 0.9
              }
          },
      },
      Goal_scoring_defensive_dman: {
          DisplayName: "Goal-scoring Defensive Defenseman",
          Description: "Elite defensively with a good shot",
          MainSkills: ["Shooting", "Defense"],
          SecondarySkills: ["Defense", "Shooting", "Physicality"],
          Weaknesses: ["Skating"],
          minimums: {
              Defense_AVG: 0.88,
              Physical_AVG: 0.84,
              Shooting_AVG: 0.815,
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.83
              },
          },
      },
      Enforcer_dman: {
          DisplayName: "Enforcer Defenseman",
          Description: "Uses physicality and fighting to be effective, average at best defensively, and lacking in all other areas",
          MainSkills: ["Physicality", "Grit"],
          SecondarySkills: ["Physicality", "Grit"],
          Weaknesses: ["PuckSkills", "Passing", "Shooting"],
          minimums: {
              Physical: {
                  BodyChecking: 0.85,
                  Strength: 0.84,
                  FightingSkill: 0.87
              }
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.82
              },
              Defense_AVG: 0.88
          },
      },
      Pylon_dman: {
          DisplayName: "Pylon",
          Description: "Liability in all aspects of the game, especially offensively and skating wise",
          MainSkills: [],
          SecondarySkills: [],
          Weaknesses: ["Everything"],
          maximums: {
              Defense_AVG: 0.85,
              Physical_AVG: 0.84,
              Shooting_AVG: 0.8,
              Skating_AVG: 0.82,
              Puckskills_AVG: 0.8,
          },
      },
  }
}

/**
 * ATTRIBUTE WEIGHTS
 */
export let attributeWeightsInfo = {
    Sniper: {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 0.5,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.75,
        Passing: 0.5,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    "Pure Sniper": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.5,
        Passing: 0.25,
        PuckControl: 0.5,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    "Sniping Power Forward": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.75,
        BodyChecking: 1,
        DefensiveAwareness: 0.25,
        Deking: 0.5,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.75,
        Passing: 0.5,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 1,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    "Pure Playmaker": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 0.5,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.75,
        Passing: 1,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Offensive Threat": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 1,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 1,
        Passing: 0.75,
        PuckControl: 1,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Rush Offense Specialist": {
        Acceleration: 1,
        Agility: 0.75,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 1,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 1,
        Passing: 0.75,
        PuckControl: 1,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 1,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "High-intensity Two-way Forward": {
        Acceleration: 1,
        Agility: 0.75,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.5,
        Passing: 0.5,
        PuckControl: 0.5,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 1,
        StickChecking: 1,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Penalty Kill Specialist": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.75,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 2,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.75,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Faceoff Specialist": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 5,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Grinder": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.5,
        DefensiveAwareness: 0.75,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 1,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 1,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.75,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Two-way Forward": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.5,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Power Forward": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 1,
        BodyChecking: 1,
        DefensiveAwareness: 0.25,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.75,
        Passing: 0.25,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.5,
    },
    "Speedy Offensive Threat": {
        Acceleration: 1,
        Agility: 1,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 0.75,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 1,
        Passing: 0.75,
        PuckControl: 1,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 1,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Two-way Power Forward": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 1,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.5,
        Passing: 0.25,
        PuckControl: 0.75,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.5,
    },
    "Two-way Offensive Threat": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.75,
        Deking: 0.5,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.75,
        OffensiveAwareness: 0.75,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.75,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Undersized Finesse Forward": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 1,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.75,
        Passing: 0.5,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Mobile Depth Finesse Forward": {
        Acceleration: 1,
        Agility: 1,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.25,
        Deking: 1,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.5,
        OffensiveAwareness: 0.75,
        Passing: 0.5,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 1,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Enforcer": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.75,
        DefensiveAwareness: 0.25,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 2,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.5,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Two-way Liability": {
        Acceleration: 1,
        Agility: 1,
        Balance: 1,
        BodyChecking: 1,
        DefensiveAwareness: 1,
        Deking: 1,
        Discipline: 1,
        Durability: 1,
        Endurance: 1,
        Faceoffs: 1,
        FightingSkill: 1,
        HandEye: 1,
        OffensiveAwareness: 1,
        Passing: 1,
        PuckControl: 1,
        ShotBlocking: 1,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 1,
        StickChecking: 1,
        Strength: 1,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    "Offensive Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.5,
        Deking: 0.75,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 1,
        Passing: 1,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Fourth Forward": {
        Acceleration: 0.5,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.5,
        Deking: 1,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 1,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 0.5,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Mobile Defensive Defenseman": {
        Acceleration: 1,
        Agility: 1,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.5,
        PuckControl: 0.75,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 1,
        StickChecking: 1,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Pure Shutdown Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.75,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 0.75,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.25,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Tough Defensive Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.75,
        BodyChecking: 1,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 1,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Mobile Offensive Defenseman": {
        Acceleration: 1,
        Agility: 1,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 0.5,
        Deking: 0.75,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 1,
        Passing: 1,
        PuckControl: 1,
        ShotBlocking: 0.25,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.5,
        Speed: 1,
        StickChecking: 0.25,
        Strength: 0.25,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.5,
    },
    "Two-way Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.5,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.5,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.5,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Mobile Two-way Defenseman": {
        Acceleration: 1,
        Agility: 1,
        Balance: 0.25,
        BodyChecking: 0.5,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.5,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 1,
        StickChecking: 1,
        Strength: 0.5,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Goal-scoring Two-way Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.5,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.5,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.5,
        SlapshotPower: 0.75,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.5,
        WristshotAccuracy: 0.5,
        WristshotPower: 0.75,
    },
    "Defensive Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.5,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.5,
        PuckControl: 0.25,
        ShotBlocking: 0.75,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.5,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Goal-scoring Defensive Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.25,
        DefensiveAwareness: 1,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 0,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.5,
        PuckControl: 0.25,
        ShotBlocking: 0.75,
        SlapshotAccuracy: 0.75,
        SlapshotPower: 1,
        Speed: 0.25,
        StickChecking: 1,
        Strength: 0.5,
        WristshotAccuracy: 0.75,
        WristshotPower: 1,
    },
    "Enforcer Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.25,
        BodyChecking: 0.75,
        DefensiveAwareness: 0.5,
        Deking: 0.25,
        Discipline: 0.001,
        Durability: 0.001,
        Endurance: 0.001,
        Faceoffs: 0,
        FightingSkill: 2,
        HandEye: 0.25,
        OffensiveAwareness: 0.25,
        Passing: 0.25,
        PuckControl: 0.25,
        ShotBlocking: 0.5,
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.25,
        Speed: 0.25,
        StickChecking: 0.5,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.25,
    },
    "Pylon": {
        Acceleration: 1,
        Agility: 1,
        Balance: 1,
        BodyChecking: 1,
        DefensiveAwareness: 1,
        Deking: 1,
        Discipline: 1,
        Durability: 1,
        Endurance: 1,
        Faceoffs: 1,
        FightingSkill: 1,
        HandEye: 1,
        OffensiveAwareness: 1,
        Passing: 1,
        PuckControl: 1,
        ShotBlocking: 1,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 1,
        StickChecking: 1,
        Strength: 1,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
  };					

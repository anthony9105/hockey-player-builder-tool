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

export let attributePointsAvailable = document.getElementsByClassName(Constants.POINTS_AVAIL_CLASSNAME);



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
          Description: "A forward possessing impressive offensive skills in all aspects but your shooting and goal scoring ability stands out above everything else.",
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
                  OffensiveAwareness: 0.87,
              },
          },
          maximums: {
              Defense_AVG: 0.82,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.83,
              }
          },
      },
      Pure_Sniper: {
          DisplayName: "Pure Sniper",
          Description: "A forward with excellent shooting and goal scoring prowess; passing up a shooting opportunity is likely a rare occurance.",
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
              Defense_AVG: 0.82,
              Physical: {
                  BodyChecking: 0.82,
                  Strength: 0.83,
              }
          },
      },
      Sniping_pwf: {
          DisplayName: "Sniping Power Forward",
          Description: "A forward with powerful offensive force who excels in shooting and goal scoring.",
          MainSkills: ["Shooting"],
          SecondarySkills: ["Shooting", "Physicality"],
          Weaknesses: ["Defense"],
          minimums: {
              Shooting_AVG: 0.825,
              Physical: {
                  BodyChecking: 0.85,
                  Strength: 0.84,
              },
              Balance: 0.8,
          },
          maximums: {
              Puckskills: {
                  Passing: 0.87,
              },
              Defense_AVG: 0.82,
          },
      },
      Pure_Playmaker: {
          DisplayName: "Pure Playmaker",
          Description: "A forward possessing exceptional playmaking abilities; you are selfless on the ice, prioritizing setting up your teammates to score.",
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
          Description: "A forward demonstrating a combination of playmaking finesse and power; you excel in setting up your teammates to score and utilizing your strength.",
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
                  Strength: 0.85,
              },
              Balance: 0.77,
          },
          maximums: {
              Shooting_AVG: 0.8,
              Defense_AVG: 0.85,
          },
      },
      // Good all around offensively, good skating, weak defense, weak physicality
      Offensive_Threat: {
          DisplayName: "Offensive Threat",
          Description: "A forward owning potent offensive threat with skills across the board; defense and physicality may not be your focus, but the offensive threat is undeniable.",
          MainSkills: ["Shooting", "PuckSkills", "Passing"],
          SecondarySkills: ["Shooting", "PuckSkills", "Passing", "Skating"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Puckskills: {
                  Passing: 0.87,
                  PuckControl: 0.87,
                  OffensiveAwareness: 0.87,
              },
              Shooting_AVG: 0.78,
              Skating: {
                  Speed: 0.87,
                  Acceleration: 0.87,
                  Agility: 0.87,
              },
          },
          maximums: {
              Defense_AVG: 0.825,
              Physical: {
                  BodyChecking: 0.81,
                  Strength: 0.84,
              }
          },
      },
      Rush_offense_specialist: {
          DisplayName: "Rush Offense Specialist",
          Description: "A forward who is a specialist in rush offense with elite skating and solid offensive skills; falls short in defensive and physical aspects.",
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
          Description: "A forward who plays with a high intensity with great skating and defensive prowess, though offensive skills are not as prominent.",
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
          Description: "A forward who is a specialist in penalty killing. You are fearless and willing to block any shot but does not contribute much in the other aspects of the game.",
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
              Shooting_AVG: 0.775,
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.83,
                  OffensiveAwareness: 0.83
              }
          },
      },
      Faceoff_Specialist: {
          DisplayName: "Faceoff Specialist",
          Description: "A forward who is a faceoff specialist that dominates the circle with expertise and precision in securing possession for your team.  Despite this, you do not contribute much in other aspects of the game.",
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
              Shooting_AVG: 0.775,
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
          Description: "A forward, exemplifying tenacity and relentlessness in physical play and creating disruptions on the ice, often relying on determination and grit to make an impact.  Often has excellent hand-eye ability to deflect shots and score loose pucks.",
          MainSkills: ["Grit"],
          SecondarySkills: ["Grit", "Physicality", "Defense"],
          Weaknesses: ["Shooting", "PuckSkills", "Passing"],
          minimums: {
              Defense_AVG: 0.81,
              Physicality: {
                  BodyChecking: 0.82,
                  Strength: 0.84,
                  HandEye: 0.85,
              }
          },
          maximums: {
              Skating: {
                  Speed: 0.89,
                  Acceleration: 0.89,
                  Agility: 0.89,
              },
              Shooting_AVG: 0.8,
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.84,
                  OffensiveAwareness: 0.84
              },
          },
      },
      Two_way_fwd: {
          DisplayName: "Two-way Forward",
          Description: "A forward that is consistently reliable, maintaining above average defensive ability while still contributing reliably offensively; a truly balanced and reliable player on all ends of the ice.",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense"],
          Weaknesses: ["None"],
          minimums: {
              Defense_AVG: 0.835,
          },
          maximums: {
              Skating: {
                  Speed: 0.91,
                  Acceleration: 0.91,
                  Agility: 0.9,
              },
              Shooting_AVG: 0.82499,
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
          Description: "A powerful forward, dominating opponents with strength and aggressiveness; known for driving to the net and creating opportunities through force and determination.",
          MainSkills: ["Physicality"],
          SecondarySkills: ["Physicality", "Shooting", "Grit"],
          Weaknesses: ["Defense", "Passing", "Skating"],
          minimums: {
              Skating: {
                  Balance: 0.81,
              },
              Physicality: {
                  BodyChecking: 0.85,
                  Strength: 0.85,
              },
              OffensiveAwareness: 0.85,
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
          Description: "A forward that is a fast and dynamic offensive threat with skills across the board; defense and physicality may not be your focus, but the offensive threat and skating ability is undeniable.",
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
                  WristshotAccuracy: 0.79,
              },
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
                  Agility: 0.87,
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
          Description: "A forward combining physical dominance with a well-rounded and reliable style.",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Grit"],
          Weaknesses: ["Passing"],
          minimums: {
              Defense_AVG: 0.825,
              Physical_AVG: 0.835,
          },
          maximums: {
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
                  Agility: 0.9,
              },
              Shooting_AVG: 0.82499,
              Puckskills: {
                  Passing: 0.85,
              },
          },
      },
      Two_way_offensive_threat: {
          DisplayName: "Two-way Offensive Threat",
          Description: "A versatile forward, who is not only decent, but excels in offensive, defensive, and skating ability.  Not a dominant physical force but can definitely hold his own physically.",
          MainSkills: ["Passing", "PuckSkills", "Defense"],
          SecondarySkills: ["Passing", "PuckSkills", "Defense", "Skating", "Grit", "Shooting", "Rush"],
          Weaknesses: ["None"],
          minimums: {
              Defense: {
                  DefensiveAwareness: 0.83,
                  StickChecking: 0.83,
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
              Shooting_AVG: 0.8,
          },
          maximums: {
              Shooting_AVG: 0.83,
              Physical: {
                BodyChecking: 0.85
              }
          },
      },
      Finesse_forward: {
          DisplayName: "Finesse Forward",
          Description: "A forward who relies on skill and finesse to make offensive contributions.  While lacking in size, you compensate that with finesse and creativity.",
          MainSkills: ["PuckSkills"],
          SecondarySkills: ["Passing", "PuckSkills", "Skating", "Shooting"],
          Weaknesses: ["Physicality", "Balance", "Defense"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.82,
                  OffensiveAwareness: 0.86
              },
              Shooting_AVG: 0.77,
          },
          maximums: {
              Physical: {
                  Strength: 0.8,
                  BodyChecking: 0.8,
              },
              Skating: {
                  Balance: 0.77
              },
              Defense_AVG: 0.81
          }
      },
      Mobile_depth_fwd: {
          DisplayName: "Mobile Finesse Forward",
          Description: "A forward who relies on great skating, skill, and finesse to make offensive contributions.  While lacking in size, you compensate that with great skating, finesse, and creativity.",
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
                  PuckControl: 0.84,
                  Deking: 0.84,
              }
          },
          maximums: {
              Shooting_AVG: 0.81,
              Defense_AVG: 0.8,
              Balance: 0.78,
              Physical_AVG: 0.81
          }
      },
      Enforcer: {
        DisplayName: "Enforcer",
        Description: "A forward recognized for formidable strength and toughness. Your role is to intimidate the opposition and protect your teammates by utilizing your strength, often willing to confront opponents and fight them to achieve this intimidation and protection.",
        MainSkills: ["Physicality", "Grit"],
        SecondarySkills: ["Physicality", "Grit"],
        Weaknesses: ["Shooting", "Defense", "PuckSkills", "Passing", "Skating"],
        minimums: {
            Physical: {
                FightingSkill: 0.82,
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
          Description: "A forward who often faces challenges on both offense and defense.  Your performance often presents difficulties for your team, showcasing your struggles in all aspects of the game.",
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
          Description: "A defenseman renowned for exceptional offensive contributions.",
          MainSkills: ["PuckSkills", "Shooting", "Passing"],
          SecondarySkills: ["PuckSkills", "Shooting", "Passing"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.8,
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.85,
                  OffensiveAwareness: 0.86
              },
          },
          maximums: {
              Defense: {
                  DefensiveAwareness: 0.85
              },
              Physical_AVG: 0.84,
          },
      },
      Fourth_fwd_dman: {
          DisplayName: "Fourth Forward",
          Description: "Defenseman possessing such elite offensive skills, while displaying below average defense at best.  This makes others wonder why you play as a defenseman instead of a forward, given your elite offensive skills",
          MainSkills: ["PuckSkills", "Shooting", "Passing"],
          SecondarySkills: ["PuckSkills", "Shooting", "Passing", "Skating"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Shooting_AVG: 0.8,
              Puckskills_AVG: 0.86,
              Skating: {
                  Acceleration: 0.85,
                  Speed: 0.85,
              }
          },
          maximums: {
              Defense_AVG: 0.82,
              Physical_AVG: 0.81,
          },
      },
      Defensive_dman: {
          DisplayName: "Defensive Defenseman",
          Description: "A defenseman recognized for reliability on the ice, particularly standing out defensively. You contribute significantly to your teams stability in the defensive zone.",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Skating", "Passing", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.86,
              Physical_AVG: 0.8,
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
          Description: "A defenseman recognized for great skating ability, reliability, and stand out defensive skills. You contribute significantly to your teams stability in the defensive zone and in thwarting rush chances.",
          MainSkills: ["Skating", "Defense"],
          SecondarySkills: ["Defense", "Skating", "Passing", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.86,
              Physical_AVG: 0.78,
              Skating: {
                  Acceleration: 0.9,
                  Speed: 0.9
              }
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.87,
                  Passing: 0.9,
                  OffensiveAwareness: 0.87
              },
          },
      },
      Pure_defensive_dman: {
          DisplayName: "Pure Shutdown Defenseman",
          Description: "A defenseman renowned for shutting down the oponnents' offensive efforts with exceptional defensive skills.  While excelling in preventing scoring opportunities, your offensive contributions are lacking and unreliable, solidifying your role as a purely defensive stalwart.",
          MainSkills: ["Defense"],
          SecondarySkills: ["Defense", "Physicality", "Grit"],
          Weaknesses: ["PuckSkills", "Passing", "Shooting"],
          minimums: {
              Defense_AVG: 0.86,
              Physical_AVG: 0.81,
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
          Description: "A defenseman recognized for a combination of physicality, resilience, and defensive skills.  You blend toughness with defensive prowess that deters opponents and boslters your team's defense.",
          MainSkills: ["Physicality", "Grit"],
          SecondarySkills: ["Physicality", "Defense", "Grit"],
          Weaknesses: ["PuckSkills", "Shooting"],
          minimums: {
              Defense_AVG: 0.86,
              Physical_AVG: 0.86,
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
          Description: "A defenseman renowned for exceptional skating, breakouts, puck carrying, and offensive contributions.  With your dynamic movement and creativity, you add an extra dimension to your team's attack.",
          MainSkills: ["Skating"],
          SecondarySkills: ["Skating", "PuckSkills", "Passing"],
          Weaknesses: ["Defense", "Physicality"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.85,
                  Passing: 0.85,
                  OffensiveAwareness: 0.86
              },
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
              },
          },
          maximums: {
              Defense: {
                  DefensiveAwareness: 0.87
              },
              Physical_AVG: 0.8,
          },
      },
      Two_way_dman: {
          DisplayName: "Two-way Defenseman",
          Description: "A well-rounded defenseman with decent skating and passing, lacking a standout shot but good defensively.  You contribute fine on both ends of the ice but your true strength lies in being impactful and reliable defensively.",
          MainSkills: ["Defense", "Passing"],
          SecondarySkills: ["Defense", "Passing", "Physicality"],
          Weaknesses: ["Shooting"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.8
              },
              Defense_AVG: 0.85,
          },
          maximums: {
              Defense_AVG: 0.9,
              Physical_AVG: 0.87,
              Skating: {
                Speed: 0.91,
                Acceleration: 0.91
              }
          },
      },
      Tough_off_dman: {
        DisplayName: "Tough Offensive Defenseman",
        Description: "A defenseman renowned for a combination of offensive contributions and physical dominance.",
        MainSkills: ["Physicality"],
        SecondarySkills: ["Physicality", "PuckSkills", "Shooting", "Passing"],
        Weaknesses: ["Defense"],
        minimums: {
            Shooting_AVG: 0.785,
            Puckskills: {
                PuckControl: 0.85,
                Passing: 0.85,
                OffensiveAwareness: 0.86
            },
            Physical_AVG: 0.83
        },
        maximums: {
            Skating: {
                Speed: 0.9,
                Acceleration: 0.9,
            },
            Defense: {
                DefensiveAwareness: 0.86
            },
        },
      },
      Tough_twoway_dman: {
        DisplayName: "Tough Two-way Defenseman",
        Description: "A well-rounded defenseman with decent passing, lacking a standout shot but good defensively and physically dominant.  You contribute fine on both ends of the ice but your true strength lies in being impactful and reliable defensively and physically.",
        MainSkills: ["Physicality", "Grit"],
        SecondarySkills: ["Physicality", "Defense", "Passing", "Grit"],
        Weaknesses: ["Shooting"],
        minimums: {
            Puckskills: {
                Passing: 0.85,
                OffensiveAwareness: 0.8
            },
            Physical_AVG: 0.83
        },
        maximums: {
            Skating: {
                Speed: 0.9,
                Acceleration: 0.9,
            },
            Defense: {
                DefensiveAwareness: 0.9
            },
            Shooting_AVG: 0.8,
        },
      },
      Mobile_two_way_dman: {
          DisplayName: "Mobile Two-way Defenseman",
          Description: "A well-rounded defenseman with great skating and breakout ability, lacking a standout shot but good defensively.  You contribute fine on both ends of the ice but your true strength lies in being impactful and reliable defensively and utilizing your speed to make a difference in various situations.",
          MainSkills: ["Skating", "Defense"],
          SecondarySkills: ["Skating", "Defense", "Passing"],
          Weaknesses: ["Shooting"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.86,
                  OffensiveAwareness: 0.8
              },
              Skating: {
                  Speed: 0.9,
                  Acceleration: 0.9,
              },
              Defense_AVG: 0.83,
          },
          maximums: {
              Defense_AVG: 0.9,
              Physical_AVG: 0.84,
          },
      },
      Goal_scoring_two_way_dman: {
          DisplayName: "Goal-scoring Two-way Defenseman",
          Description: "A well-rounded defenseman with decent skating and passing along with good shooting and defense.  You contribute fine on both ends of the ice but your true strength lies in being impactful and reliable defensively, and being a goal threat with your shot from the blueline.",
          MainSkills: ["Shooting"],
          SecondarySkills: ["Shooting", "Defense", "PuckSkills"],
          Weaknesses: ["Skating"],
          minimums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.81
              },
              Shooting_AVG: 0.8,
              Defense_AVG: 0.83,
          },
          maximums: {
              Defense_AVG: 0.9,
              Physical_AVG: 0.84,
              Skating: {
                  Acceleration: 0.9,
                  Speed: 0.9
              }
          },
      },
      Goal_scoring_defensive_dman: {
          DisplayName: "Goal-scoring Defensive Defenseman",
          Description: "A defenseman recognized for reliability on the ice, particularly standing out defensively, and also having a powerful shot that challenges goalies to stop. You contribute significantly to your teams stability in the defensive zone and although you are not skilled offensvely, when provided the opportunity, your powerful shot from the blueline often poses a threat to the opposing goalie.",
          MainSkills: ["Shooting", "Defense"],
          SecondarySkills: ["Defense", "Shooting", "Physicality"],
          Weaknesses: ["Skating"],
          minimums: {
              Defense_AVG: 0.85,
              Physical_AVG: 0.81,
              Shooting_AVG: 0.8,
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
          Description: "A defenseman recognized for formidable strength and toughness. Your role is to intimidate the opposition and protect your teammates by utilizing your strength, often willing to confront opponents and fight them to achieve this intimidation and protection.",
          MainSkills: ["Physicality", "Grit"],
          SecondarySkills: ["Physicality", "Grit"],
          Weaknesses: ["PuckSkills", "Passing", "Shooting"],
          minimums: {
              Physical: {
                  BodyChecking: 0.83,
                  Strength: 0.84,
                  FightingSkill: 0.82
              }
          },
          maximums: {
              Puckskills: {
                  PuckControl: 0.83,
                  Passing: 0.85,
                  OffensiveAwareness: 0.82
              },
              Defense_AVG: 0.87
          },
      },
      Pylon_dman: {
          DisplayName: "Pylon",
          Description: "A defenseman often labeled as a 'pylon', emphasizing shortcomings offensively, defensively, and especially in skating.  Your performance often presents difficulties for your team, showcasing your struggles in all aspects of the game.",
          MainSkills: [],
          SecondarySkills: [],
          Weaknesses: ["Everything"],
          maximums: {
              Defense_AVG: 0.83,
              Physical_AVG: 0.84,
              Shooting_AVG: 0.78,
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
    "Finesse Forward": {
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
    "Mobile Finesse Forward": {
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
    "Tough Offensive Defenseman": {
        Acceleration: 0.25,
        Agility: 0.25,
        Balance: 0.75,
        BodyChecking: 1,
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
        SlapshotAccuracy: 0.25,
        SlapshotPower: 0.5,
        Speed: 0.25,
        StickChecking: 0.25,
        Strength: 1,
        WristshotAccuracy: 0.25,
        WristshotPower: 0.5, 
    },
    "Tough Two-way Defenseman": {
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
        OffensiveAwareness: 0.5,
        Passing: 0.75,
        PuckControl: 0.75,
        ShotBlocking: 0.75,
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

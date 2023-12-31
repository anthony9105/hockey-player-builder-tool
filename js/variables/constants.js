/**
 * 2022-2023
 * Anthony Liscio
 * 
 * constants.js
 * 
 *      Used to store constant values such as file paths, html class names, html id names, etc.
 */

/**
 * FILE PATHS
 */
export const BUILD_DATA_XML = "../build-information/build_data.xml";
export const UPGRADE_POINTS_XML = "../build-information/upgrade_points.xml";
export const PHYS_UPGRADE_DOWNGRADE_XML = "../build-information/physical_upgrade_downgrades.xml";
export const BOOSTS_XML = "../build-information/boosts.xml";
export const MAIN_ABILITIES_XML = "../build-information/main_abilities.xml";
export const ABILITIES_XML = "../build-information/abilities.xml";


/**
 * CLASS NAMES
 */
    // values
    export const POINTS_AVAIL_CLASSNAME = "points-available-value";
    export const ATTRIBUTE_VALUES_CLASSNAME = "attribute-value";
    export const UPGRADE_VALUES_CLASSNAME = "upgrade-value";

    // buttons
    export const PLUS_BUTTONS_CLASSNAME = "plus-button";
    export const MINUS_BUTTONS_CLASSNAME = "minus-button";
    export const ABILITY_BUTTON_CLASSNAME = "dropdownbutton";
    export const MAIN_BOOST_BUTTON_CLASSNAME = "main-boost-dropdownbutton";

    // dropdown button content sections
    export const BOOST_BUTTONS_DROPDOWN_CLASSNAME = "boost-buttons-content";
    export const ABILITY_BUTTONS_DROPDOWN_CONTENT_CLASSNAME = "ability-button-content";

    // dropdown content sections
    export const ABILITY_DROPDOWN_CONTENT_BUTTON_CLASSNAME = "ability-dropdownbutton";
    export const BOOST_DROPDOWN_CONTENT_BUTTON_CLASSNAME = "boost-dropdownbutton";
    export const BOOST_DROPDOWN_CONTENT_CLASSNAME = "boost-dropdown-content";
    export const ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME = "dropdown-content";
    export const ABILITY_DROPDOWN_CONTENT_CLASSNAME = "ability-dropdown-section";

    // sections
    export const ABILITY_SECTION_CLASSNAME = "ability-section";

    // items, values, requirements, descriptions, icons
    export const ICONS_CLASSNAME = "material-icons";
    export const MAIN_ABILITY_DESCRIPTION_CLASSNAME = "main-ability-description";
    export const ABILITY_DESCRIPTION_CLASSNAME = "ability-description";
    export const ABILITY_REQ_CLASSNAME = "ability-requirement";
    export const MAIN_ABILITY_NAME_CLASSNAME = "main-ability-name";
    export const ABILITY_NAME_CLASSNAME = "ability-name";

    export const ABILITY_DISPLAY_ITEM_CLASSNAME = "ability-display-item";
    export const ABILITY_DISPLAY_NAME_CLASSNAME = "ability-display-name";
    export const ABILITY_DISPLAY_DESC_CLASSNAME = "ability-display-description";
    export const ABILITY_DISPLAY_REQ_CLASSNAME = "ability-display-requirement";

    export const BOOST_DISPLAY_ITEM_CLASSNAME = "boost-display-item";
    export const BOOST_DISPLAY_VALUE_CLASSNAME = "boost-display-item-value";
    export const BOOST_DISPLAY_DESC_CLASSNAME = "boost-display-description";
    export const BOOST_DISPLAY_REQ_CLASSNAME = "boost-display-item-requirement";

    export const BOOST_VALUE_CLASSNAME = "boost-item-value";
    export const BOOST_REQ_CLASSNAME = "boost-item-requirement";

    export const MAIN_ABILITY_DISPLAY_ITEM_CLASSNAME = "main-ability-display-item";
    export const MAIN_ABILITY_DISPLAY_NAME_CLASSNAME = "main-ability-display-name";
    export const MAIN_ABILITY_DISPLAY_DESC_CLASSNAME = "main-ability-display-description";
    export const ABILITY_ITEM_CLASSNAME = "ability-item";
    export const MAIN_ABILITY_ITEM_CLASSNAME = "main-ability-item";
    export const BOOST_ITEM_CLASSNAME = "boost-item";

    export const BOOST_UPGRADE_VALUES_CLASSNAME = "boost-value";

    export const UNSELECT_BUTTON_CLASSNAME = "unselect-button";

    export const ATTRIBUTE_METER_CLASSNAME = "attribute-meter";
    export const ATTRIBUTE_METER_FILL_CLASSNAME = "attribute-meter-fill";


/**
 * ID NAMES
 */
    export const HEIGHTS_ID = "height-selection";
    export const WEIGHTS_ID = "weight-selection";
    export const PLAYERTYPE_ID = "player-type-selection";

    // confirm buttons
    export const CONFIRM_PLAYERTYPE_BUTTON_ID = "confirm-player-type-button";
    export const CONFIRM_HEIGHT_BUTTON_ID = "confirm-height-button";
    export const CONFIRM_WEIGHT_BUTTON_ID = "confirm-weight-button";

    // sections
    export const MAIN_ABILITY_SECTION_ID = "main-ability-section";
    export const MAIN_ABILITY_DROPDOWN_SECTION_ID = "main-ability-dropdown-section";
    export const BOOST_SECTION_ID = "boosts-row";





/**
 * XML FILE NODE NAMES
 */
export const XML_BUILD_NODE = "Build";
export const XML_NAME_NODE = "Name";
export const XML_VALUE_NODE = "value";
export const XML_ATT_COSTS_NODE = "AttributeCosts";
export const XML_ABILITYGROUP_NODE = "AbilityGroup";
export const XML_BOOST_NODE = "Boost";
export const XML_WEIGHT_NODE = "Weight";
export const XML_HEIGHT_NODE = "Height";
export const XML_DEFAULT_NODE = "default";
export const XML_MIN_NODE = "minimum";
export const XML_MAX_NODE = "maximum";
export const XML_DEFAULTATT_NODE = "DefaultAttributes";
export const XML_ABILITY_NODE = "Ability";
export const XML_GROUPNAME_NODE = "GroupName";
export const XML_ABILITY_NAME_NODE = "AbilityName";
export const XML_ICON_NAME_NODE = "IconName";
export const XML_ATT_NAME_NODE = "AttributeName";
export const XML_MIN_VAL_NODE = "MinimumValue";
export const XML_DESCRIP_NODE = "Description";
export const XML_BUILDNAME_NODE = "BuildName";
export const XML_BACKATYA_NODE = "Back At Ya";


/**
 * OTHER
 */
export const ALL_HEIGHTS = ["5'7", "5'8", "5'9", "5'10", "5'11", "6'0", "6'1", "6'2", "6'3", "6'4", "6'5", "6'6", "6'7", "6'8", "6'9"];
export const ALL_ATTRIBUTES_INORDER = ["WristshotAcc", "SlapshotAcc", "Speed", "Balance", "Agility", "WristshotPower", "SlapshotPower", "Acceleration", "PuckControl",
                                  "Endurance", "Passing", "OffensiveAwareness", "BodyChecking", "StickChecking", "DefensiveAwareness", "Handeye", "Strength", 
                                  "Durability", "ShotBlocking", "Deking", "Faceoffs", "Discipline", "FightingSkill"];
export const ALL_ATTRIBUTES_INORDER_FULLSPELLING = ["Wristshot Accuracy", "Slapshot Accuracy", "Speed", "Balance", "Agility", "Wristshot Power", "Slapshot Power", "Acceleration", "Puck Control",
                                                    "Endurance", "Passing", "Offensive Awareness", "Body Checking", "Stick Checking", "Defensive Awareness", "Hand-Eye", "Strength", 
                                                    "Durability", "Shot Blocking", "Deking", "Faceoffs", "Discipline", "Fighting Skill"];

export const UNSELECTED_ABILITY_NAME = "No ability currently selected";
export const UNSELECTED_BOOST_NAME = "No boost currently selected";

/**
 * COLOURS
 */
export const INVALID_BOOST_OR_ABILITY_RGBA = "rgba(255, 0, 0, 0.25)";
export const DISPLAY_SLOT_BACKGROUND_RGBA = "rgba(115, 116, 116, 0.3)";
export const ZERO_UPGRADE_VALUE_COLOUR = "#3a379c";
export const BOOST_UPGRADE_VALUE_COLOUR = "rgb(76, 165, 238)";
export const DISPLAY_ITEM_COLOUR = "rgba(115, 116, 116, 0.3)";
export const GOOD_ATTRIBUTE_COLOUR = "rgb(59, 148, 81)";
export const SOLID_ATTRIBUTE_COLOUR = "rgb(90, 128, 0)";
export const VERY_EXCELLENT_ATTRIBUTE_COLOUR = "rgb(0, 255, 0)";
export const AVG_ATTRIBUTE_COLOUR = "rgb(206, 206, 1)";
export const BELOW_AVG_ATTRIBUTE_COLOUR = "rgb(194, 126, 0)";


/**
 * ATTRIBUTE WEIGHTS
 */
export const ATTRIBUTE_WEIGHTS = {
    C: {
        Acceleration: 1.3,
        Agility: 1.3,
        Balance: 0.8,
        BodyChecking: 1,
        DefensiveAwareness: 1.2,
        Deking: 1,
        Discipline: 0.3,
        Durability: 0.2,
        Endurance: 0.5,
        Faceoffs: 0.8,
        FightingSkill: 0,
        HandEye: 1.2,
        OffensiveAwareness: 1.2,
        Passing: 1.2,
        PuckControl: 1.2,
        ShotBlocking: 0.9,
        SlapshotAccuracy: 1.1,
        SlapshotPower: 1.1,
        Speed: 1.5,
        StickChecking: 1.1,
        Strength: 0.9,
        WristshotAccuracy: 1.1,
        WristshotPower: 1.1,
    },
    W: {
        Acceleration: 1.2,
        Agility: 1.1,
        Balance: 0.9,
        BodyChecking: 1,
        DefensiveAwareness: 1,
        Deking: 1,
        Discipline: 0.5,
        Durability: 0.3,
        Endurance: 0.5,
        Faceoffs: 0,
        FightingSkill: 0.1,
        HandEye: 1,
        OffensiveAwareness: 1.2,
        Passing: 1,
        PuckControl: 1,
        ShotBlocking: 0.9,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 1.2,
        StickChecking: 0.9,
        Strength: 0.9,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    D: {
        Acceleration: 1.1,
        Agility: 1.1,
        Balance: 0.9,
        BodyChecking: 1.1,
        DefensiveAwareness: 1.3,
        Deking: 0.9,
        Discipline: 0.6,
        Durability: 0.3,
        Endurance: 0.6,
        Faceoffs: 0,
        FightingSkill: 0.1,
        HandEye: 1,
        OffensiveAwareness: 1.1,
        Passing: 1,
        PuckControl: 1,
        ShotBlocking: 1,
        SlapshotAccuracy: 1,
        SlapshotPower: 1,
        Speed: 1.2,
        StickChecking: 1.1,
        Strength: 1,
        WristshotAccuracy: 1,
        WristshotPower: 1,
    },
    Enforcer: {
        Acceleration: 1,
        Agility: 1,
        Balance: 1,
        BodyChecking: 1.2,
        DefensiveAwareness: 1,
        Deking: 0.8,
        Discipline: 0.2,
        Durability: 0.2,
        Endurance: 0.6,
        Faceoffs: 0,
        FightingSkill: 1.5,
        HandEye: 1,
        OffensiveAwareness: 1,
        Passing: 1,
        PuckControl: 0.9,
        ShotBlocking: 0.9,
        SlapshotAccuracy: 0.9,
        SlapshotPower: 0.9,
        Speed: 1,
        StickChecking: 1,
        Strength: 1.3,
        WristshotAccuracy: 0.9,
        WristshotPower: 0.9,
    }
  };

/**
 * PLAYER TYPES
 */
export const PLAYER_TYPES = {
    Forward: {
        // All around offensive threat but still specializes in goalscoring/shooting/sniping
        Sniper: {
            DisplayName: "Sniping Offenive Threat",
            minimums: {
                Shooting_AVG: 0.87,
                Puckskills: {
                    Passing: 0.86,
                    Deking: 0.86,
                    PuckControl: 0.88,
                    HandEye: 0.84,
                    OffensiveAwareness: 0.87,
                },
            },
            maximums: {
                Defense_AVG: 0.83,
                Physical: {
                    BodyChecking: 0.82,
                    Strength: 0.83,
                }
            },
        },
        Pure_Sniper: {
            DisplayName: "Pure Sniper",
            minimums: {
                Shooting_AVG: 0.87,
            },
            maximums: {
                Puckskills: {
                    Passing: 0.82,
                    Deking: 0.87,
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
            minimums: {
                Shooting_AVG: 0.87,
                Physical: {
                    BodyChecking: 0.85,
                    Strength: 0.84,
                }
            },
            maximums: {
                Puckskills: {
                    Passing: 0.86,
                },
                Defense_AVG: 0.83,
            },
        },
        Pure_Playmaker: {
            DisplayName: "Pure Playmaker",
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
                    BodyChecking: 0.8,
                    Strength: 0.83,
                },
                Defense_AVG: 0.83,
            },
        },
        Physical_Playmaker: {
            DisplayName: "Playmaking Power Forward",
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
                Defense_AVG: 0.83,
            },
        },
        // Good all around offensively, good skating, weak defense, weak physicality
        Offensive_Threat: {
            DisplayName: "Offensive Threat",
            minimums: {
                Puckskills: {
                    Passing: 0.87,
                    PuckControl: 0.88,
                    OffensiveAwareness: 0.89,
                },
                Shooting: {
                    WristshotAccuracy: 0.82,
                    WristshotPower: 0.81,
                    SlapshotAccuracy: 0.82,
                    SlapshotPower: 0.81,
                },
                Skating: {
                    Speed: 0.86,
                    Acceleration: 0.85,
                    Agility: 0.85,
                },
            },
            maximums: {
                Defense_AVG: 0.83,
                Physical: {
                    BodyChecking: 0.8,
                    Strength: 0.83,
                }
            },
        },
        Rush_offense_specialist: {
            DisplayName: "Rush Offense Specialist",
            minimums: {
                Puckskills: {
                    Passing: 0.81,
                    PuckControl: 0.81,
                },
                Shooting_AVG: 0.79,
                Skating: {
                    Speed: 0.89,
                    Acceleration: 0.88,
                    Agility: 0.85,
                },
            },
            maximums: {
                Defense_AVG: 0.78,
                Physical: {
                    BodyChecking: 0.8,
                    Strength: 0.8,
                }
            },
        },
        High_intensity_twoway_fwd: {
            DisplayName: "High-intensity Two-way Forward",
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
                    PuckControl: 0.81,
                    Passing: 0.81
                }
            },
        },
        Penalty_kill_specialist: {
            DisplayName: "Penalty Kill Specialist", 
            minimums: {
                Defense: {
                    StickChecking: 0.85,
                    DefensiveAwareness: 0.85,
                },
            },
            maximums: {
                Skating: {
                    Speed: 0.89,
                    Acceleration: 0.88,
                    Agility: 0.85,
                },
                Shooting_AVG: 0.78,
                Puckskills: {
                    PuckControl: 0.81,
                    Passing: 0.81,
                    OffensiveAwareness: 0.79
                }
            },
        },
        Faceoff_Specialist: {
            DisplayName: "Faceoff Specialist",
            minimums: {
                Defense: {
                    Faceoffs: 0.9,
                },
            },
            maximums: {
                Skating: {
                    Speed: 0.83,
                    Acceleration: 0.83,
                    Agility: 0.81,
                },
                Shooting_AVG: 0.77,
                Puckskills: {
                    PuckControl: 0.79,
                    Passing: 0.79,
                    OffensiveAwareness: 0.78
                },
                Defense_AVG: 0.79,
            },
        },
        //
        Grinder: {
            DisplayName: "Grinder",
            minimums: {
                Defense_AVG: 0.85,
                Physicality: {
                    BodyChecking: 0.82,
                    Strength: 0.85,
                    HandEye: 0.84,
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
                    PuckControl: 0.81,
                    Passing: 0.81,
                    OffensiveAwareness: 0.8
                },
            },
        },
        Two_way_fwd: {
            DisplayName: "Two-way Forward",
            minimums: {
                Defense_AVG: 0.85,
            },
            maximums: {
                Skating: {
                    Speed: 0.89,
                    Acceleration: 0.89,
                    Agility: 0.89,
                },
                Shooting_AVG: 0.8,
                Puckskills: {
                    PuckControl: 0.81,
                    Passing: 0.81,
                    OffensiveAwareness: 0.81
                },
                Physical_AVG: 0.84,
            },
        },
        Powerforward: {
            DisplayName: "Power Forward",
            minimums: {
                Physicality: {
                    BodyChecking: 0.88,
                    Strength: 0.88,
                },
                Shooting: {
                    WristshotPower: 0.83,
                    SlapshotPower: 0.83,
                }
            },
            maximums: {
                Skating: {
                    Speed: 0.87,
                    Acceleration: 0.87,
                    Agility: 0.87,
                },
                Puckskills: {
                    Passing: 0.85,
                },
                Defense_AVG: 0.82,
            },
        },
        Speedy_Offensive_Threat: {
            DisplayName: "Speedy Offensive Threat",
            minimums: {
                Puckskills: {
                    Passing: 0.85,
                    PuckControl: 0.85,
                    OffensiveAwareness: 0.85,
                },
                Shooting: {
                    WristshotAccuracy: 0.82,
                    WristshotPower: 0.81,
                    SlapshotAccuracy: 0.82,
                    SlapshotPower: 0.81,
                },
                Skating: {
                    Speed: 0.92,
                    Acceleration: 0.92,
                    Agility: 0.92,
                },
            },
            maximums: {
                Defense_AVG: 0.78,
                Physical: {
                    BodyChecking: 0.83,
                    Strength: 0.84,
                }
            },
        },
        Two_way_powerforward: {
            DisplayName: "Two-way Power Forward",
            minimums: {
                Defense_AVG: 0.85,
                Physical_AVG: 0.85,
            },
            maximums: {
                Skating: {
                    Speed: 0.89,
                    Acceleration: 0.89,
                    Agility: 0.89,
                },
                Shooting_AVG: 0.8,
                Puckskills: {
                    PuckControl: 0.81,
                    Passing: 0.81,
                    OffensiveAwareness: 0.81
                },
            },
        },
        Extra_fwd: {
            DisplayName: "Complete Forward Liability",
            maximums: {
                Defense_AVG: 0.77,
                Physical_AVG: 0.79,
                Shooting_AVG: 0.78,
                Skating_AVG: 0.8,
                Puckskills_AVG: 0.78,
            },
        },
    },
    Defense: {
        Offenisve_dman: {
            DisplayName: "Offensive Defenseman",
            minimums: {
                Shooting_AVG: 0.82,
                Puckskills: {
                    PuckControl: 0.87,
                    Passing: 0.87,
                    OffensiveAwareness: 0.85
                },
            },
            maximums: {
                Defense_AVG: 0.86,
                Physical_AVG: 0.84,
            },
        },
        Defensive_dman: {
            DisplayName: "Defensive Defenseman",
            minimums: {
                Defense_AVG: 0.88,
                Physical_AVG: 0.84,
            },
            maximums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.82
                },
            },
        },
        Pure_defensive_dman: {
            DisplayName: "Pure Shutdown Defenseman",
            minimums: {
                Defense_AVG: 0.88,
                Physical_AVG: 0.84,
            },
            maximums: {
                Puckskills: {
                    PuckControl: 0.82,
                    Passing: 0.82,
                    OffensiveAwareness: 0.8
                },
            },
        },
        Tough_Defensive_dman: {
            DisplayName: "Tough Defensive Defenseman",
            minimums: {
                Defense_AVG: 0.88,
                Physical_AVG: 0.88,
            },
            maximums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.82
                },
            },
        },
        Mobile_offensive_dman: {
            DisplayName: "Mobile Offensive Defenseman",
            minimums: {
                Shooting_AVG: 0.82,
                Puckskills: {
                    PuckControl: 0.87,
                    Passing: 0.87,
                    OffensiveAwareness: 0.85
                },
                Skating: {
                    Speed: 0.91,
                    Acceleration: 0.9,
                    Agility: 0.88,
                },
            },
            maximums: {
                Defense_AVG: 0.86,
                Physical_AVG: 0.84,
            },
        },
        Two_way_dman: {
            DisplayName: "Two-way Defenseman",
            minimums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.83
                },
                Skating: {
                    Speed: 0.85,
                    Acceleration: 0.85,
                    Agility: 0.85,
                },
                Defense_AVG: 0.85,
            },
            maximums: {
                Shooting_AVG: 0.82,
                Defense_AVG: 0.9,
                Physical_AVG: 0.84,
            },
        },
        Mobile_two_way_dman: {
            DisplayName: "Mobile Two-way Defenseman",
            minimums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.83
                },
                Skating: {
                    Speed: 0.91,
                    Acceleration: 0.9,
                    Agility: 0.88,
                },
                Defense_AVG: 0.85,
            },
            maximums: {
                Shooting_AVG: 0.82,
                Defense_AVG: 0.9,
                Physical_AVG: 0.84,
            },
        },
        Goal_scoring_two_way_dman: {
            DisplayName: "Goal-scoring Two-way Defenseman",
            minimums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.83
                },
                Shooting_AVG: 0.83,
                Defense_AVG: 0.85,
            },
            maximums: {
                Defense_AVG: 0.9,
                Physical_AVG: 0.84,
            },
        },
        Goal_scoring_defensive_dman: {
            DisplayName: "Goal-scoring Defensive Defenseman",
            minimums: {
                Defense_AVG: 0.88,
                Physical_AVG: 0.84,
                Shooting_AVG: 0.83,
            },
            maximums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.82
                },
            },
        },
        Seventh_dman: {
            DisplayName: "Pilon",
            maximums: {
                Defense_AVG: 0.81,
                Physical_AVG: 0.8,
                Shooting_AVG: 0.78,
                Skating_AVG: 0.8,
                Puckskills_AVG: 0.78,
            },
        },
    }
}

/**
 * ATTRIBUTE CATEGORIES
 */
export const skatingAttributes = ['Acceleration', 'Agility', 'Balance', 'Speed'];
export const defenseAttributes = ['DefensiveAwareness', 'StickChecking', 'ShotBlocking'];
export const shootingAttributes = ['SlapshotAccuracy', 'SlapshotPower', 'WristshotAccuracy', 'WristshotPower'];
export const puckSkillsAttributes = ['Deking', 'HandEye', 'OffensiveAwareness', 'Passing', 'PuckControl']
export const physicalityAttributes = ['BodyChecking', 'Strength', 'Durability'];
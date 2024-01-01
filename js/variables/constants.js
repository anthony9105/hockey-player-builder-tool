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

    // other buttons
    export const COMPLETE_BUILD_BTTN_ID = "complete-build-button";

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
export const XML_ABILITY_TYPE_NODE = "Type";


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
            DisplayName: "Sniper",
            Description: "Exceptional shooting stands out above everything else but still elite in all other offensive skills",
            MainSkills: ["Shooting"],
            SecondarySkills: ["PuckSkills", "Shooting", "Skating"],
            minimums: {
                Shooting_AVG: 0.9,
                Puckskills: {
                    Passing: 0.88,
                    Deking: 0.88,
                    PuckControl: 0.89,
                    HandEye: 0.85,
                    OffensiveAwareness: 0.88,
                },
            },
            maximums: {
                Defense_AVG: 0.85,
                Physical: {
                    BodyChecking: 0.82,
                    Strength: 0.86,
                }
            },
        },
        Pure_Sniper: {
            DisplayName: "Pure Sniper",
            Description: "Exceptional shooting and not much else",
            MainSkills: ["Shooting"],
            SecondarySkills: ["Shooting"],
            minimums: {
                Shooting_AVG: 0.9,
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
            Description: "Exceptional shooting and good strength/power",
            MainSkills: ["Shooting"],
            SecondarySkills: ["Shooting", "Physicality"],
            minimums: {
                Shooting_AVG: 0.9,
                Physical: {
                    BodyChecking: 0.85,
                    Strength: 0.84,
                }
            },
            maximums: {
                Puckskills: {
                    Passing: 0.88,
                },
                Defense_AVG: 0.85,
            },
        },
        Pure_Playmaker: {
            DisplayName: "Pure Playmaker",
            Description: "Elite passing and playmaking but hardly scores goals",
            MainSkills: ["Passing"],
            SecondarySkills: ["Passing", "PuckSkills", "Skating"],
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
            Description: "Elite passing and strength/power but hardly scores goals",
            MainSkills: ["Passing"],
            SecondarySkills: ["Passing", "Physicality", "PuckSkills"],
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
                Defense_AVG: 0.85,
                Physical: {
                    BodyChecking: 0.8,
                    Strength: 0.83,
                }
            },
        },
        Rush_offense_specialist: {
            DisplayName: "Rush Offense Specialist",
            Description: "Possesses elite skating and decent offensive skills, not good physically or defensively",
            MainSkills: ["Rush", "Skating"],
            SecondarySkills: ["PuckSkills", "Skating", "Rush"],
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
                Defense_AVG: 0.81,
                Physical: {
                    BodyChecking: 0.8,
                    Strength: 0.81,
                }
            },
        },
        High_intensity_twoway_fwd: {
            DisplayName: "High-intensity Two-way Forward",
            Description: "Menace on the forecheck with great skating and defense.  Offensive skills are lacking.",
            MainSkills: ["Defense", "Skating"],
            SecondarySkills: ["Defense", "Skating", "Grit"],
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
            Description: "Fearless forward who will block any shot, great for killing penalties and not much else",
            MainSkills: ["Defense", "Grit"],
            SecondarySkills: ["Defense", "Grit"],
            minimums: {
                Defense: {
                    StickChecking: 0.85,
                    DefensiveAwareness: 0.86,
                    ShotBlocking: 0.87,
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
            Description: "Elite at taking faceoffs",
            MainSkills: ["Faceoffs"],
            SecondarySkills: ["Faceoffs"],
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
            Description: "Uses physicality and defensive play to be effective.  Also usually have great hand-eye for scoring deflections and rebounds",
            MainSkills: ["Grit"],
            SecondarySkills: ["Grit", "Physicality", "Defense"],
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
            Description: "Well-rounded but does not stand out in any area other than defensively",
            MainSkills: ["Defense"],
            SecondarySkills: ["Defense"],
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
            Description: "Utilizes elite strength and power to be effective",
            MainSkills: ["Physicality"],
            SecondarySkills: ["Physicality", "Shooting", "Grit"],
            minimums: {
                Skating: {
                    Balance: 88,
                },
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
            Description: "Exceptional skating along with elite puck carrying, passing, and goal scoring ability",
            MainSkills: ["Skating", "Rush"],
            SecondarySkills: ["Skating", "PuckSkills", "Passing", "Shooting", "Rush"],
            minimums: {
                Puckskills: {
                    Passing: 0.87,
                    PuckControl: 0.87,
                    OffensiveAwareness: 0.87,
                },
                Shooting: {
                    WristshotAccuracy: 0.83,
                    WristshotPower: 0.83,
                    SlapshotAccuracy: 0.82,
                    SlapshotPower: 0.82,
                },
                Skating: {
                    Speed: 0.92,
                    Acceleration: 0.92,
                    Agility: 0.9,
                },
            },
            maximums: {
                Defense_AVG: 87,
                Physical: {
                    BodyChecking: 0.83,
                    Strength: 0.84,
                }
            },
        },
        Two_way_powerforward: {
            DisplayName: "Two-way Power Forward",
            Description: "Utilizing both solid defense and physicality to make an impact",
            MainSkills: ["Defense"],
            SecondarySkills: ["Defense", "Physicality", "Grit"],
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
        Two_way_offensive_threat: {
            DisplayName: "Two-way Offensive Threat",
            Description: "Great offensive and defensive skills, great skating, and decent physicality",
            MainSkills: ["Passing", "PuckSkills", "Defense"],
            SecondarySkills: ["Passing", "PuckSkills", "Defense", "Skating", "Grit", "Shooting", "Rush"],
            minimums: {
                Defense: {
                    DefensiveAwareness: 0.88,
                    StickChecking: 0.88,
                },
                Physical: {
                    Strength: 0.84,
                },
                Skating: {
                    Speed: 0.86,
                    Acceleration: 0.86,
                    Agility: 0.88,
                    Balance: 0.88,
                },
                Puckskills: {
                    PuckControl: 0.88,
                    Passing: 0.88,
                    OffensiveAwareness: 0.88
                },
                Shooting_AVG: 0.84,
            },
            maximums: {
                Shooting_AVG: 0.9,
            },
        },
        Undersized_finesse_forward: {
            DisplayName: "Undersized Finesse Forward",
            Description: "You utilize your skill to make up for the lack of size and strength",
            MainSkills: ["PuckSkills", "Passing"],
            SecondarySkills: ["Passing", "PuckSkills", "Skating", "Shooting"],
            minimums: {
                Puckskills: {
                    PuckControl: 0.87,
                    Passing: 0.86,
                    OffensiveAwareness: 0.87
                },
                Shooting_AVG: 0.8,
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
                }
            }
        },
        Mobile_depth_fwd: {
            DisplayName: "Mobile Depth Finesse Forward",
            Description: "Solid skater who can put up some points but doesn't really stand out anywhere",
            MainSkills: ["Skating"],
            SecondarySkills: ["Passing", "Skating", "PuckSkills", "Shooting"],
            minimums: {
                Skating: {
                    Acceleration: 0.86,
                    Agility: 0.86,
                    Speed: 0.86,
                },
                Puckskills: {
                    Passing: 0.8,
                    PuckControl: 0.8,
                }
            },
            maximums: {
                Puckskills_AVG: 0.86,
                Shooting_AVG: 0.86,
                Defense_AVG: 0.86
            }
        },
        Extra_fwd: {
            DisplayName: "Two-way Liability",
            Description: "Liability on all parts of the ice",
            MainSkills: [],
            SecondarySkills: [],
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
            Description: "Overall offensive side of your game stands out above all else",
            MainSkills: ["PuckSkills", "Shooting", "Passing"],
            SecondarySkills: ["PuckSkills", "Shooting", "Passing"],
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
            Description: "Possesses such elite offensive skills that people wonder why you are a defenseman instead of a forward",
            MainSkills: ["PuckSkills", "Shooting", "Passing"],
            SecondarySkills: ["PuckSkills", "Shooting", "Passing", "Skating"],
            minimums: {
                Shooting_AVG: 0.83,
                Puckskills: {
                    PuckControl: 0.9,
                    Passing: 0.9,
                    OffensiveAwareness: 0.9
                },
                Skating: {
                    Acceleration: 0.87,
                    Speed: 0.87,
                    Agility: 0.87
                }
            },
            maximums: {
                Defense_AVG: 0.85,
                Physical_AVG: 0.81,
            },
        },
        Defensive_dman: {
            DisplayName: "Defensive Defenseman",
            Description: "Elite defensively but still not a liability offensively",
            MainSkills: ["Defense"],
            SecondarySkills: ["Defense", "Physicality", "Skating", "Passing", "Grit"],
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
            minimums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.86,
                    OffensiveAwareness: 0.85
                },
                Skating: {
                    Speed: 0.83,
                    Acceleration: 0.83,
                    Agility: 0.83,
                },
                Defense_AVG: 0.87,
            },
            maximums: {
                Defense_AVG: 0.95,
                Physical_AVG: 0.87,
            },
        },
        Mobile_two_way_dman: {
            DisplayName: "Mobile Two-way Defenseman",
            Description: "A defenseman with no real weaknesses, and exceptional skating",
            MainSkills: ["Skating", "Defense"],
            SecondarySkills: ["Skating", "Defense", "Passing"],
            minimums: {
                Puckskills: {
                    PuckControl: 0.86,
                    Passing: 0.87,
                    OffensiveAwareness: 0.86
                },
                Skating: {
                    Speed: 0.91,
                    Acceleration: 0.9,
                    Agility: 0.88,
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
            minimums: {
                Puckskills: {
                    PuckControl: 0.86,
                    Passing: 0.87,
                    OffensiveAwareness: 0.86
                },
                Shooting_AVG: 0.84,
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
            minimums: {
                Defense_AVG: 0.88,
                Physical_AVG: 0.84,
                Shooting_AVG: 0.82,
            },
            maximums: {
                Puckskills: {
                    PuckControl: 0.85,
                    Passing: 0.87,
                    OffensiveAwareness: 0.82
                },
            },
        },
        Enforcer_dman: {
            DisplayName: "Enforcer Defenseman",
            Description: "Uses physicality and fighting to be effective, average at best defensively, and lacking in all other areas",
            MainSkills: ["Physicality", "Grit"],
            SecondarySkills: ["Physicality", "Grit"],
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
 * ATTRIBUTE CATEGORIES
 */
export const skatingAttributes = ['Acceleration', 'Agility', 'Balance', 'Speed'];
export const defenseAttributes = ['DefensiveAwareness', 'StickChecking', 'ShotBlocking'];
export const shootingAttributes = ['SlapshotAccuracy', 'SlapshotPower', 'WristshotAccuracy', 'WristshotPower'];
export const puckSkillsAttributes = ['Deking', 'HandEye', 'OffensiveAwareness', 'Passing', 'PuckControl']
export const physicalityAttributes = ['BodyChecking', 'Strength', 'Durability'];
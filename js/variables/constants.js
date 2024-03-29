/*
 * MIT License
 *
 * Copyright (c) 2024 Anthony Liscio
 *
 * For more details, see the LICENSE file in the root directory.
 */

/**
 * FILE PATHS
 */
const websiteUrl = "https://hockeyplayerbuilder.com/";

export const BUILD_DATA_XML = websiteUrl + "build-information/build_data.xml";
export const UPGRADE_POINTS_XML = websiteUrl + "build-information/upgrade_points.xml";
export const PHYS_UPGRADE_DOWNGRADE_XML = websiteUrl + "build-information/physical_upgrade_downgrades.xml";
export const BOOSTS_XML = websiteUrl + "build-information/boosts.xml";
export const MAIN_ABILITIES_XML = websiteUrl + "build-information/main_abilities.xml";
export const ABILITIES_XML = websiteUrl + "build-information/abilities.xml";
export const NHL_PLAYER_ATTRIBUTES_CSV = websiteUrl + "player-information/realPlayerAttributes.csv"; 


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
    export const MORE_INFO_BUTTON_CLASSNAME = "moreinfo-button";

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

    export const PHYSICALS_VALIDITY_CLASSNAME = "physicals-validity";
    export const SIMILAR_PLAYER_CLASSNAME = "similar-player";
    export const DISSIMILAR_PLAYER_CLASSNAME = "dissimilar-player";
    export const PLAYERS_LIST_NUMBER_CLASSNAME = "player-list-number";

    export const MORE_INFO_LISTITEM_CLASSNAME = "help-li-extra";

    export const MODAL_INFO_CLASSNAME = "modal-info";
    export const CANCEL_BUTTON_CLASSNAME = "cancel-button";
    export const OK_BUTTON_CLASSNAME = "ok-button"; 


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
    export const RESET_BUILD_BTTN_ID = "reset-button";
    export const HELP_BUTTON_ID = "help-button";
    export const ABOUT_BUTTON_ID = "about-button";

    // sections
    export const MAIN_ABILITY_SECTION_ID = "main-ability-section";
    export const MAIN_ABILITY_DROPDOWN_SECTION_ID = "main-ability-dropdown-section";
    export const BOOST_SECTION_ID = "boosts-row";
    export const ABILITY_SECTION_ID = "abilities-and-boosts-row";

    export const PLAYERTYPE_VALIDITY_ID = "player-type-selection-warning";
    export const PLAYERTYPE_NAME_ID = "player-type-name";
    export const PLAYERTYPE_DESC_ID = "player-type-description";
    export const MAINSKILLS_LIST_ID = "main-skills-list";
    export const SECSKILLS_LIST_ID = "sec-skills-list";
    export const WEAKNESSES_LIST_ID = "weaknesses-list";

    export const COMPLETE_BUILD_SECTION_ID= "complete-build";
    export const HELP_SECTION_ID = "help-and-instructions";
    export const ABOUT_SECTION_ID = "about-section";

    // confirm/alert modals
    export const CONFIRM_MODAL_ID = "confirm-modal";
    export const ALERT_MODAL_ID = "alert-modal";





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
export const XML_NOTINANABILITYGROUP_NODE = "OnlyUnderMainAbilities";


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
export const ALL_ATTRIBUTES_INORDER_FULLSPELLING_NOSPACES = ["WristshotAccuracy", "SlapshotAccuracy", "Speed", "Balance", "Agility", "WristshotPower", "SlapshotPower", "Acceleration", "PuckControl",
                                                    "Endurance", "Passing", "OffensiveAwareness", "BodyChecking", "StickChecking", "DefensiveAwareness", "HandEye", "Strength", 
                                                    "Durability", "ShotBlocking", "Deking", "Faceoffs", "Discipline", "FightingSkill"];

export const UNSELECTED_ABILITY_NAME = "No ability currently selected";
export const UNSELECTED_BOOST_NAME = "No boost currently selected";

/**
 * COLOURS
 */
export const INVALID_BOOST_OR_ABILITY_RGBA = "rgba(255, 0, 0, 0.25)";
export const DISPLAY_SLOT_BACKGROUND_RGBA = "rgba(115, 116, 116, 0.3)";
export const BOOST_UPGRADE_VALUE_COLOUR = "rgb(76, 165, 238)";
export const DISPLAY_ITEM_COLOUR = "rgba(115, 116, 116, 0.3)";
export const GOOD_ATTRIBUTE_COLOUR = "rgb(59, 148, 81)";
export const SOLID_ATTRIBUTE_COLOUR = "rgb(90, 128, 0)";
export const VERY_EXCELLENT_ATTRIBUTE_COLOUR = "rgb(0, 255, 0)";
export const AVG_ATTRIBUTE_COLOUR = "rgb(206, 206, 1)";
export const BELOW_AVG_ATTRIBUTE_COLOUR = "rgb(194, 126, 0)";
export const MAIN_ABILITY_ICON_COLOUR = "rgba(175, 150, 5, 0.95)";


/**
 * ATTRIBUTE CATEGORIES
 */
export const skatingAttributes = ['Acceleration', 'Agility', 'Balance', 'Speed'];
export const defenseAttributes = ['DefensiveAwareness', 'StickChecking', 'ShotBlocking'];
export const shootingAttributes = ['SlapshotAccuracy', 'SlapshotPower', 'WristshotAccuracy', 'WristshotPower'];
export const puckSkillsAttributes = ['Deking', 'HandEye', 'OffensiveAwareness', 'Passing', 'PuckControl']
export const physicalityAttributes = ['BodyChecking', 'Strength', 'Durability'];


/**
 * EXTERNAL WEBSITE LINK INFO
 */
export const PLAYER_LINK_INFO_START = "https://www.hockey-reference.com/players/";
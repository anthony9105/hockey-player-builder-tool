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
    export const BOOST_ITEM_VALUE_CLASSNAME = "boost-item-value";
    export const BOOST_REQUIREMENT_CLASSNAME = "boost-item-requirement";
    export const ICONS_CLASSNAME = "material-icons";
    export const MAIN_ABILITY_DESCRIPTION_CLASSNAME = "main-ability-description";
    export const ABILITY_DESCRIPTION_CLASSNAME = "ability-description";
    export const ABILITY_REQ_CLASSNAME = "ability-requirement";
    export const MAIN_ABILITY_NAME_CLASSNAME = "main-ability-name";
    export const ABILITY_NAME_CLASSNAME = "ability-name";


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

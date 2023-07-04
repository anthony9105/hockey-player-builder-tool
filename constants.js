/**
 * Constants
 */
const buildDataXMLFileName = "build_data.xml";
const upgradePointsXMLFileName = "upgrade_points.xml";
const physUpgradeDowngradeFileName = "physical_upgrade_downgrades.xml";
const boostsXMLFileName = "boosts.xml";
const allHeights = ["5'7", "5'8", "5'9", "5'10", "5'11", "6'0", "6'1", "6'2", "6'3", "6'4", "6'5", "6'6", "6'7", "6'8", "6'9"];
const idNames = ["points-avail1-value", "points-avail2-value", "points-avail3-value", "points-avail4-value", "points-avail5-value"];
const allAttributeNamesInOrder = ["WristshotAcc", "SlapshotAcc", "Speed", "Balance", "Agility", "WristshotPower", "SlapshotPower", "Acceleration", "PuckControl",
                                  "Endurance", "Passing", "OffensiveAwareness", "BodyChecking", "StickChecking", "DefensiveAwareness", "Handeye", "Strength", 
                                  "Durability", "ShotBlocking", "Deking", "Faceoffs", "Discipline", "FightingSkill"];

const numOfAttributeSections = 5;
const boostInfoNodeNames = ["AttributeToUpgrade", "UpgradeAmount", "Colour", "AttributeName", "MinimumValue", "IconName"];
const indexOfFirstRegularBoostIcon = 58;

export {buildDataXMLFileName, upgradePointsXMLFileName, physUpgradeDowngradeFileName, boostsXMLFileName, allHeights, idNames, allAttributeNamesInOrder,
    numOfAttributeSections, boostInfoNodeNames, indexOfFirstRegularBoostIcon};
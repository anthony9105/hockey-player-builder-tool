

/**
 * isElementNode function used to return the node only if
 * the node is an element node.  (The purpose of this is to
 * not include #text childNodes).
 * 
 * Used with the filter function.
 * @param {Object} node 
 * @returns node or nothing
 */
export function isElementNode(node) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    return node;
  }
  else {
    return;
  }
}

/**
 * convertFeetandInchesToInches function.
 * Used to convert imperial height (feet and inches) to just inches.
 * @param {string} imperialHeight height in feet and inches
 * @returns height in inches
 */
export function convertFeetandInchesToInches(imperialHeight) {
  var feet = parseInt(imperialHeight[0]);

  var inches = "";
  for (var i = 2; i < imperialHeight.length; i++) {
    inches += imperialHeight[i];
  }
  inches = parseInt(inches);

  return (12 * feet) + inches;
}

/**
 * fetchFromXMLFile function used to fetch and return the "Document"
 * from the specific XML file provided.  This way the needed information
 * can be used from the XML file in various different areas.
 * @param {String} filePath 
 * @returns Document (or undefined if fetch was unsuccessful)
 */
export async function fetchFromXMLFile(filePath) {
  try {
    const response = await fetch(filePath);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    
    return xmlDoc;
  }
  catch (error) {
    console.error(error);
    return undefined;
  }
}
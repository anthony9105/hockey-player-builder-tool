# Anthony's Hockey Player Builder
by Anthony Liscio
<br></br>
<br></br>

Used to build a hockey player.  The player is given a player type and real NHL player comparisons.

### The process and instructions are provided on the website but it involves:
- Choosing a player type template.  Each template has:
  - default starting attributes
  - minimum, maximum, and default starting height
  - minimum, maximum, and default starting weight
  - 5 main abilities to choose from
- Optional: changing the height and/or weight (this effects certain physical attributes) 
- Important: choosing the correct position that your player will play (the default is set to "Centre").  "Centre" or "Winger" players will recieve a forward player type and be compared to only NHL forwards at the end.  "Defenseman" players will recieve a defenseman player type and be compared to only NHL defenseman at the end
- Mandatory: choosing 2 abilities, and 1 main ability
  - The regular abilities have certain attribute requirements in order to use
- Optional: choosing 1-2 attribute boosts which provide an additional +2 or +4 (depending on the boost) to a certain attribute.  These also have certain attribute requirements in order to use.
- Optional but important: changing the attributes by upgrading and downgrading them with the + and - buttons.
  - Allows for a maximum of +5 or -5 to each attribute (boosts do not count towards this)
  - Each attribute costs a certain amount of points to upgrade and each attribute provides a certain amount of points when downgraded.
    - This depends on which attribute (since certain attributes cost more/ are more important than others), and a +5 upgrade often costs more than a +1 upgrade does.
- Any upgrades, selected abilities, and selected boosts will be reset when/if a player type template is changed, height is changed, or weight is changed.
- The complete build button will take into account the abilities and attribute values to determine the "best player type" for the given player, and compare it to over 700 NHL players who have been given their own attributes.
  - In order to get to this point all 3 ability slots must be used, there must not be a negative number of available attribute points for any section, and there must not be any invalid abilities or boosts selected
  - Using euclidean distance, the top 5 NHL players with the least distance to the created player, are considered the most similar.  The top 3 largest distances are considered the least similar players.
    - The distance calculation is weighted based off what the "best player type" is.  For example: a "Sniper" created player will use a higher weight for attributes like "Wristshot Power" and less on things such as "Defensive Awareness" because this better reflects the strengths and weaknesses of the player type.
  - When clicking on the 5 most similar players and 3 least similar players, you will be taken to an external website that provides more information about that player, just as an added bonus if users are interested.
- The "reset" button is self-explanatory

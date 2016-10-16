(function(){

//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//Game Level Maps
//Arrays to store the level maps
var levelMaps = [];
var levelGameObjects = [];

//A level counter
var levelCounter = 0;

//A timer to help delay the change time between levels
var levelChangeTimer = 0;

//Level 0
var map0 = 
[
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  [6,1,2,1,1,2,1,1,1,1,2,2,1,1,1,6],
  [6,1,1,1,1,1,2,1,2,1,1,1,1,2,1,6],
  [6,2,1,1,1,1,1,1,1,1,1,2,1,1,1,6],
  [6,1,2,1,2,2,1,1,1,1,2,1,1,1,1,6],
  [6,1,2,1,1,1,1,1,1,1,1,2,2,1,1,6],
  [6,1,1,1,2,1,2,2,1,1,1,1,1,1,2,6],
  [6,1,1,2,1,1,2,1,1,1,2,1,2,1,1,6],
  [6,1,2,1,1,1,2,1,2,1,1,1,1,2,1,6],
  [6,1,2,2,1,1,2,2,2,1,2,2,1,1,2,6],
  [6,2,1,1,1,2,1,1,1,1,1,1,1,1,1,6],
  [6,1,2,2,1,1,2,1,1,2,1,2,1,2,2,6],
  [6,1,1,1,2,1,1,1,2,1,1,1,1,1,1,6],
  [6,1,1,1,1,1,2,1,1,1,1,2,1,2,1,6],
  [6,1,2,1,2,1,1,1,1,2,1,1,1,1,1,6],
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];

//Push map0 into the leveMaps array
levelMaps.push(map0);
/*
var gameObjects0 = 
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
  [0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,4,0,0,0,0,0,0,3,0,0,4,0,0,3,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0],
  [0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,3,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
*/

var gameObjects0 = 
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,3,0,0,4,0,0,3,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,3,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

//Push gameObjects0 into the levelGameObjects array
levelGameObjects.push(gameObjects0);

//Level 1

var map1 = 
[
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  [6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
  [6,1,2,2,1,1,1,1,2,2,1,1,1,2,2,6],
  [6,1,1,2,2,2,1,1,2,1,1,1,1,2,1,6],
  [6,1,1,1,2,1,1,1,2,2,1,2,1,2,1,6],
  [6,1,1,1,1,1,2,1,1,1,1,2,1,1,1,6],
  [6,2,2,1,2,2,2,2,2,2,1,2,1,2,1,6],
  [6,1,1,1,1,1,1,1,1,2,2,2,2,1,1,6],
  [6,1,1,2,1,1,2,2,1,2,1,1,1,1,1,6],
  [6,2,1,2,1,1,1,2,1,1,1,2,2,2,1,6],
  [6,1,1,2,2,1,1,2,2,1,1,1,1,2,1,6],
  [6,1,1,1,1,1,1,1,2,1,1,1,2,2,2,6],
  [6,2,1,1,2,1,1,1,2,2,1,1,1,2,1,6],
  [6,1,1,2,2,2,2,1,1,1,1,2,1,2,1,6],
  [6,1,1,1,1,1,2,1,1,1,1,2,1,1,1,6],
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];

//Push map1 into the leveMaps array
levelMaps.push(map1);

//The game objects maps
var gameObjects1 = 
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,4,0,0,0,0,0,0,0,0,3,0,0,0,4,0],
  [0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,3,0,0,0,0,0,0,5,0,0,0,0,0,0,0],
  [0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
  [0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,4,0,0,0,0,0,0,0,0,4,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,4,0,0,3,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

//Push gameObjects1 into the levelGameObjects array
levelGameObjects.push(gameObjects1);

//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var MONSTER = 3;
var STAR = 4;
var ALIEN = 5;
var WALL = 6;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var alien = null;
var levelCompleteDisplay = null;

//The number of rows and columns
var ROWS = map0.length;
var COLUMNS = map0[0].length;

//Arrays to store the game objects
var sprites = [];
var monsters = [];
var boxes = [];
var messages = [];
var stars = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/monsterMayhem.png";
assetsToLoad.push(image);

//The number of columns on the tilesheet
var tilesheetColumns = 4;

//Game variables
//Any game variables you need
var starsCollected = 0;

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var LEVEL_COMPLETE = 4;
var gameState = LOADING;

//--- The gameWorld object
var gameWorld = 
{
  x: 0,
  y: 0,
  width: map0[0].length * SIZE,
  height: map0.length * SIZE,
};

//--- The camera object
var camera = 
{
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  
  //The camera's inner scroll boundaries
  rightInnerBoundary: function()
  {
    return this.x + (this.width / 2) + (this.width / 4);
  },
  leftInnerBoundary: function()
  {
    return this.x + (this.width / 2) - (this.width / 4);
  },
  topInnerBoundary: function()
  {
    return this.y + (this.height / 2) - (this.height / 4);
  },
  bottomInnerBoundary: function()
  {
    return this.y + (this.height / 2) + (this.height / 4);
  }
};

//Center the camera over the gameWorld
camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
    case UP:
      moveUp = true;
      break;
	  
    case DOWN:
      moveDown = true;
      break;
	    
    case LEFT:
      moveLeft = true;
      break;  
	    
    case RIGHT:
      moveRight = true;
      break; 
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case UP:
      moveUp = false;
      break;
	  
    case DOWN:
      moveDown = false;
      break;
	    
    case LEFT:
      moveLeft = false;
      break;  
	    
    case RIGHT:
      moveRight = false;
      break; 
  }
}, false);

//Start the game animation loop
update();

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      console.log("loading...");
      break;
      
    case BUILD_MAP:
      buildMap(levelMaps[levelCounter]);
      buildMap(levelGameObjects[levelCounter]);
      createOtherSprites();
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
      
    case LEVEL_COMPLETE:
      levelComplete();
      break;
    
    case OVER:
      endGame();
      break;
  }
  
  //Render the game
  render();
}

function levelComplete()
{
  //Make the leveCompleteDisplay visible
  levelCompleteDisplay.visible = true;
  
  //Update the timer that changes the level by one
  levelChangeTimer++;
  
  //Load the next level after 60 frames
  if(levelChangeTimer === 60)
  {
    loadNextLevel();
  }
  
  function loadNextLevel()
  {
    //Reset the timer that changes the level
    levelChangeTimer = 0;
		
	//Update the levelCounter by 1
    levelCounter++;
  
    //Load the next level if there is one or end the game if there isn't
    if(levelCounter < levelMaps.length)
    {
      //Clear the arrays of objects
      
	  sprites = [];
	  monsters = [];
	  boxes = [];
	  stars = [];
	    
	  //Reset any gameVariables
	  starsCollected = 0;
	    
	  //Make sure the gameWorld size matches the size of the next level
      gameWorld.width = levelMaps[levelCounter][0].length * SIZE;
      gameWorld.height = levelMaps[levelCounter].length * SIZE;
	    
      //Re-center the camera
      camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
      camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;
	    
      //Build the maps for the next level
      gameState = BUILD_MAP;
    }
    else
    {
      gameState = OVER;
    }
  }
}

function loadHandler()
{ 
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load handlers
    image.removeEventListener("load", loadHandler, false);
        
    //Build the map 
    gameState = BUILD_MAP;
  }
}

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++) 
  {	
    for(var column = 0; column < COLUMNS; column++) 
    { 
      var currentTile = levelMap[row][column];
    
      if(currentTile != EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
        switch (currentTile)
        {
          case FLOOR:
            var floor = Object.create(spriteObject);
            floor.sourceX = tilesheetX;
            floor.sourceY = tilesheetY;
            floor.x = column * SIZE;
            floor.y = row * SIZE;
            sprites.push(floor);
            break;
          
          case BOX:
            var box = Object.create(spriteObject);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;
          
          case WALL:
            var wall = Object.create(spriteObject);
            wall.sourceX = tilesheetX;
            wall.sourceY = tilesheetY;            
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            break;
          
          case MONSTER:
            var monster = Object.create(monsterObject);
            monster.sourceX = tilesheetX;
            monster.sourceY = tilesheetY;
            monster.x = column * SIZE;
            monster.y = row * SIZE;
            //Make the monster choose a random start direction 
            changeDirection(monster)          
            monsters.push(monster);
            sprites.push(monster);
            break; 
          
          case STAR:
            var star = Object.create(spriteObject);
            star.sourceX = tilesheetX;
            star.sourceY = tilesheetY;
            star.sourceWidth = 48;
            star.sourceHeight = 48;
            star.width = 48;  
            star.height = 48;          
            star.x = column * SIZE + 8;
            star.y = row * SIZE + 8;
            stars.push(star);
            sprites.push(star);
            break;
            
          case ALIEN:
            alien = Object.create(spriteObject);
            alien.sourceX = tilesheetX;
            alien.sourceY = tilesheetY;            
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
            break;
        }
      }
    }
  }
}

function createOtherSprites()
{
  levelCompleteDisplay = Object.create(spriteObject);
  levelCompleteDisplay.sourceX = 0;
  levelCompleteDisplay.sourceY = 384;
  levelCompleteDisplay.sourceWidth = 256;
  levelCompleteDisplay.sourceHeight = 128;
  levelCompleteDisplay.width = 256;  
  levelCompleteDisplay.height = 128;            
  levelCompleteDisplay.x = canvas.width / 2 - levelCompleteDisplay.width / 2;
  levelCompleteDisplay.y = canvas.height / 2 - levelCompleteDisplay.height / 2;
  levelCompleteDisplay.visible = false;
  levelCompleteDisplay.scrollable = false;
  sprites.push(levelCompleteDisplay);
  
  youLostDisplay = Object.create(spriteObject);
  youLostDisplay.sourceX = 0;
  youLostDisplay.sourceY = 128;
  youLostDisplay.sourceWidth = 256;
  youLostDisplay.sourceHeight = 128;
  youLostDisplay.width = 256;  
  youLostDisplay.height = 128;            
  youLostDisplay.x = canvas.width / 2 - youLostDisplay.width / 2;
  youLostDisplay.y = canvas.height / 2 - youLostDisplay.height / 2;
  youLostDisplay.visible = false;
  youLostDisplay.scrollable = false;
  sprites.push(youLostDisplay);
  
  youWonDisplay = Object.create(spriteObject);
  youWonDisplay.sourceX = 0;
  youWonDisplay.sourceY = 256;
  youWonDisplay.sourceWidth = 256;
  youWonDisplay.sourceHeight = 128;
  youWonDisplay.width = 256;  
  youWonDisplay.height = 128;            
  youWonDisplay.x = canvas.width / 2 - youWonDisplay.width / 2;
  youWonDisplay.y = canvas.height / 2 - youWonDisplay.height / 2;
  youWonDisplay.visible = false;
  youWonDisplay.scrollable = false;
  sprites.push(youWonDisplay);
}

function playGame()
{ 
  //Up
  if(moveUp && !moveDown)
  {
    alien.vy = -4;
  }
  //Down
  if(moveDown && !moveUp)
  {
    alien.vy = 4;
  }
  //Left
  if(moveLeft && !moveRight)
  {
    alien.vx = -4;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    alien.vx = 4;
  }

  //Set the alien's velocity to zero if none of the keys are being pressed
  if(!moveUp && !moveDown)
  {
    alien.vy = 0;
  }
  if(!moveLeft && !moveRight)
  {
    alien.vx = 0;
  }

  //Move the alien and set its screen boundaries
  alien.x = Math.max(64, Math.min(alien.x + alien.vx, gameWorld.width - alien.width - 64)); 
  alien.y = Math.max(64, Math.min(alien.y + alien.vy, gameWorld.height - alien.height - 64));
  
  //Check collision between the alien and the boxes
  for(var i = 0; i < boxes.length; i++)
  {
    blockRectangle(alien, boxes[i]);
  }
  
  //Check for collisions with stars
  for(var i = 0; i < stars.length; i++)
  { 
    var star = stars[i];
    if(hitTestRectangle(alien, star) && star.visible)
    {
      star.visible = false;
      starsCollected++;
      
      //Check whether the level is over
      //by checking if the starsCollected matches
      //the total number in the stars array
      if(starsCollected === stars.length)
      {
        gameState = LEVEL_COMPLETE;
      }    
    }
  }
   
  //Check for collisions with monsters
  for(var i = 0; i < monsters.length; i++)
  { 
    var monster = monsters[i];
    if(hitTestCircle(alien, monster))
    {
      gameState = OVER;
    }
  }
  
  //The monsters
  for(var i = 0; i < monsters.length; i++)
  {
    var monster = monsters[i];
    
    //Move the monsters
    monster.x += monster.vx;
    monster.y += monster.vy;
    
    //Check whether the monster is at a tile corner
    if(Math.floor(monster.x) % SIZE === 0
    && Math.floor(monster.y) % SIZE === 0)
    {
      //Change the monster's direction
      changeDirection(monster);  
    }
   
	//Change the monster's state to SCARED if
	//it's 128 pixels from the alien
	var vx = alien.centerX() - monster.centerX();
	var vy = alien.centerY() - monster.centerY();
	  
	//Find the distance between the circles by calculating
    //the vector's magnitude (how long the vector is)  
    var magnitude = Math.sqrt(vx * vx + vy * vy);
	  
    if(magnitude < 192)
    {
      monster.state = monster.SCARED;
    }
    else
    {
      monster.state = monster.NORMAL;
    }
	  
    //Update the monster to reflect state changes
    monster.update();
  }
  
  //Scroll the camera
  if(alien.x < camera.leftInnerBoundary())
  {
    camera.x = Math.floor(alien.x - (camera.width / 4));
  }
  if(alien.y < camera.topInnerBoundary())
  {
    camera.y = Math.floor(alien.y - (camera.height / 4));
  }
  if(alien.x + alien.width > camera.rightInnerBoundary())
  {
    camera.x = Math.floor(alien.x + alien.width - (camera.width / 4 * 3));
  }
  if(alien.y + alien.height > camera.bottomInnerBoundary())
  {
    camera.y = Math.floor(alien.y + alien.height - (camera.height / 4 * 3));
  }
  
  //The camera's gameWorld boundaries
  if(camera.x < gameWorld.x)
  {
    camera.x = gameWorld.x;
  }
  if(camera.y < gameWorld.y)
  {
    camera.y = gameWorld.y;
  }
  if(camera.x + camera.width > gameWorld.x + gameWorld.width)
  {
    camera.x = gameWorld.x + gameWorld.width - camera.width;
  }
  if(camera.y + camera.height > gameWorld.height)
  {
    camera.y = gameWorld.height - camera.height;
  }  
}

function changeDirection(monster)
{
  //Clear any previous direction the monster has chosen
  monster.validDirections = [];
  monster.direction = monster.NONE;
  
  //Find the monster's column and row in the array
  var monsterColumn = Math.floor(monster.x / SIZE);
  var monsterRow = Math.floor(monster.y / SIZE);
  
  //Get a reference to the current level map
  var currentMap = levelMaps[levelCounter];
  
  //Find out what kinds of things are in the map cells 
  //that surround the monster. If the cells contain a FLOOR cell,
  //push the corresponding direction into the validDirections array
  if(monsterRow > 0)
  {
    var thingAbove = currentMap[monsterRow - 1][monsterColumn];
    if(thingAbove === FLOOR)
    {
      monster.validDirections.push(monster.UP);
    }
  }
  if(monsterRow < ROWS - 1)
  { 
    var thingBelow = currentMap[monsterRow + 1][monsterColumn];
    if(thingBelow === FLOOR)
    {
      monster.validDirections.push(monster.DOWN);
    }
  }
  if(monsterColumn > 0)
  {
    var thingToTheLeft = currentMap[monsterRow][monsterColumn - 1];
    if(thingToTheLeft === FLOOR)
    {
      monster.validDirections.push(monster.LEFT);
    }
  } 
  if(monsterColumn < COLUMNS - 1)
  {
    var thingToTheRight = currentMap[monsterRow][monsterColumn + 1];
    if(thingToTheRight === FLOOR)
    {
      monster.validDirections.push(monster.RIGHT);
    }
  } 
  
  //The monster's validDirections array now contains 0 to 4 directions that the 
  //contain FLOOR cells. Which of those directions will the monster
  //choose to move in?
  
  //If a valid direction was found, Figure out if the monster is at an 
  //maze passage intersection.
  if(monster.validDirections.length !== 0)
  {
    //Find out if the monster is at an intersection
    var upOrDownPassage 
	  = (monster.validDirections.indexOf(monster.UP) !== -1 
	  || monster.validDirections.indexOf(monster.DOWN) !== -1);
	
	var leftOrRightPassage
	  = (monster.validDirections.indexOf(monster.LEFT) !== -1 
	  || monster.validDirections.indexOf(monster.RIGHT) !== -1);
    
    //Change the monster's direction if it's at an intersection or
    //in a cul-de-sac (dead-end)
    if(upOrDownPassage && leftOrRightPassage 
	|| monster.validDirections.length === 1)
    {
      //Optionally find the closest distance to the alien
      if(alien !== null && monster.hunt === true)
      {
        findClosestDirection(monster);
      }
      
      //Assign a random validDirection if the alien object doesn't exist in the game
      //or a validDirection wasn't found that brings the monster closer to the alien
      if(alien === null || monster.direction === monster.NONE)
      {
        var randomNumber = Math.floor(Math.random() * monster.validDirections.length);
        monster.direction = monster.validDirections[randomNumber];
      }
      
      //Choose the monster's final direction
	  switch(monster.direction)
	  {
	    case monster.RIGHT:
	      monster.vx = monster.speed;
	      monster.vy = 0;
	      break;
		    
	    case monster.LEFT:
	      monster.vx = -monster.speed;
	      monster.vy = 0;
	      break;
		      
	    case monster.UP:
	      monster.vx = 0;
	      monster.vy = -monster.speed;
	      break;
		      
	    case monster.DOWN:
	      monster.vx = 0;
	      monster.vy = monster.speed;
	  }
    } 
  }  
}

function findClosestDirection(monster)
{
  var closestDirection = undefined;
  
  //Find the distance between the monster and the alien
  var vx = alien.centerX() - monster.centerX(); 
  var vy = alien.centerY() - monster.centerY();
        
  //If the distance is greater on the x axis...
  if(Math.abs(vx) >= Math.abs(vy))
  {
    //Try left and right
    if(vx <= 0)
    {
      closestDirection = monsterObject.LEFT;        
    }
    else
    {
      closestDirection = monsterObject.RIGHT;	    
    }
  }
  //If the distance is greater on the y axis...
  else
  {
    //Try up and down
    if(vy <= 0)
    {
      closestDirection = monsterObject.UP;
    }
    else
    {
      closestDirection = monsterObject.DOWN;
    }
  }
  
  //Find out if the closestDirection is one of the validDirections
  for(var i = 0; i < monster.validDirections.length; i++)
  {
    if(closestDirection === monster.validDirections[i])
    {
      //If it, assign the closestDirection to the monster's direction
      monster.direction = closestDirection;
    }
  }
}

function endGame()
{
  //Make the levelCompleteDisplay invisible
  levelCompleteDisplay.visible = false;
  
  //You win if you're on the last level and 
  //you've collected all the stars
  if(levelCounter === levelMaps.length
  && starsCollected === stars.length)
  {
    youWonDisplay.visible = true;
  }
  else
  {
    youLostDisplay.visible = true;
  }
}

function render()
{ 
  //Render the gameWorld
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Position the gameWorld inside the camera
  drawingSurface.save();
  drawingSurface.translate(-camera.x, -camera.y);
  
  //Display the sprites on the gameWorld
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
	     
      //display the scrolling sprites
      if(sprite.visible && sprite.scrollable)
      {
	     drawingSurface.drawImage
	     (
	       image, 
	       sprite.sourceX, sprite.sourceY, 
	       sprite.sourceWidth, sprite.sourceHeight,
	       Math.floor(sprite.x), Math.floor(sprite.y), 
	       sprite.width, sprite.height
	     ); 
       }
	     
       //display the non-scrolling sprites
       if(sprite.visible && !sprite.scrollable)
       {
         drawingSurface.drawImage
         (
           image, 
           sprite.sourceX, sprite.sourceY, 
           sprite.sourceWidth, sprite.sourceHeight,
           Math.floor(camera.x + sprite.x), Math.floor(camera.y + sprite.y), 
           sprite.width, sprite.height
         ); 
       }
     } 
  }
  
  drawingSurface.restore();
  
  //Display any game messages
  if(messages.length !== 0)
  {
    for(var i = 0; i < messages.length; i++)
    {
      var message = messages[i];
      if(message.visible)
      {
         drawingSurface.font = message.font;  
         drawingSurface.fillStyle = message.fillStyle;
         drawingSurface.textBaseline = message.textBaseline;
         drawingSurface.fillText(message.text, message.x, message.y);  
	  }
	}
  }
}

}());

(function(){

//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//The game map
var map = 
[
  [5,5,5,5,5,5,5,5,5,5,5],
  [5,1,1,1,1,1,1,1,1,1,5],
  [5,1,2,2,2,1,2,1,2,1,5],
  [5,1,1,2,1,1,1,1,1,1,5],
  [5,1,1,1,1,2,1,1,2,1,5],
  [5,1,2,1,2,2,1,2,2,1,5],
  [5,1,1,1,1,1,2,1,1,1,5],
  [5,5,5,5,5,5,5,5,5,5,5]
];

//The game objects map
//Note: make sure monsters are at an intersection so that
//changeDirection will assign them their starting velocity

var gameObjects =
[
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,3,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,4,0,0,0,0,0],
  [0,0,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0]
];

//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var MONSTER = 3;
var ALIEN = 4;
var WALL = 5;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var alien = null;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 3;

//Arrays to store the game objects
var sprites = [];
var monsters = [];
var boxes = [];
var messages = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/monsterMaze.png";
assetsToLoad.push(image);

//Game variables
//... Any game variables you need go here...

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var gameState = LOADING;

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
      buildMap(map);
      buildMap(gameObjects);
      //createOtherObjects();
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
    
    case OVER:
      endGame();
      break;
  }
  
  //Render the game
  render();
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
    
      if(currentTile !== EMPTY)
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
            
          case ALIEN:
            alien = Object.create(spriteObject);
            alien.sourceX = tilesheetX;
            alien.sourceY = tilesheetY;            
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
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
        }
      }
    }
  }
}

function createOtherObjects()
{
  console.log("createOtherObjects"); 
}

function changeDirection(monster)
{
  //Clear any previous direction the monster has chosen
  monster.validDirections = [];
  //Alternative way of clearing an array:
  //monster.validDirections.length = 0;
  monster.direction = monster.NONE;
  
  //Find the monster's column and row in the array
  var monsterColumn = Math.floor(monster.x / SIZE);
  var monsterRow = Math.floor(monster.y / SIZE);
  
  //Find out what kinds of things are in the map cells 
  //that surround the monster. If the cells contain a FLOOR cell,
  //push the corresponding direction into the validDirections array
  if(monsterRow > 0)
  {
    var thingAbove = map[monsterRow - 1][monsterColumn];
    if(thingAbove === FLOOR)
    {
      monster.validDirections.push(monster.UP);
    }
  }
  if(monsterRow < ROWS - 1)
  { 
    var thingBelow = map[monsterRow + 1][monsterColumn];
    if(thingBelow === FLOOR)
    {
      monster.validDirections.push(monster.DOWN);
    }
  }
  if(monsterColumn > 0)
  {
    var thingToTheLeft = map[monsterRow][monsterColumn - 1];
    if(thingToTheLeft === FLOOR)
    {
      monster.validDirections.push(monster.LEFT);
    }
  } 
  if(monsterColumn < COLUMNS - 1)
  {
    var thingToTheRight = map[monsterRow][monsterColumn + 1];
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
       
      //You can use this code below as an alternative to the switch statement
      /*
      var moveByDirection = 
	  [  
	    [0, -1], 
	    [0, 1],
		[-1, 0],
	    [1, 0]
	  ]

	  monster.vx = monster.speed * moveByDirection[monster.direction - 1][0];
      monster.vy = monster.speed * moveByDirection[monster.direction - 1][1];
      */
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
  
  //Move the alien and keep it inside the screen boundaries
  alien.x = Math.max(64, Math.min(alien.x + alien.vx, canvas.width - alien.width - 64)); 
  alien.y = Math.max(64, Math.min(alien.y + alien.vy, canvas.height - alien.height - 64));
  
  //Check for collisions between the alien and the boxes
  for(var i = 0; i < boxes.length; i++)
  {
    blockRectangle(alien, boxes[i]);
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
    
    //Change the monster's state to SCARED if it's 128 pixels from the alien
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
}

function endGame()
{
  console.log("endGame");
}

function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
	{
	  var sprite = sprites[i];
	  if(sprite.visible)
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
    }
  }
  
  //Display the game messages
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

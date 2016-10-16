(function(){

//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//The game map
var map = 
[
  [7,7,8,9,7,7,7,8,9,7,7,7,8,9,7,7],
  [8,9,7,7,4,9,7,7,7,8,9,7,7,7,8,5],
  [4,7,7,7,7,7,8,9,7,7,7,8,9,7,4,4],
  [7,7,4,7,7,4,4,4,4,7,7,7,7,7,7,7],
  [8,9,4,7,7,7,7,8,9,7,7,4,8,9,7,7],
  [7,4,4,4,7,8,9,7,7,7,4,4,7,7,4,8],
  [9,7,8,9,7,7,7,8,9,4,7,4,9,7,7,7],
  [7,7,7,7,7,4,4,7,7,7,7,4,4,4,4,7],
  [8,9,7,7,7,7,7,7,7,8,9,7,7,8,9,7],
  [7,7,4,4,4,4,7,7,4,7,7,7,7,7,7,7],
  [7,7,7,7,7,7,7,7,7,4,7,7,7,7,7,7],
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
]

//The game objects map

var gameObjects =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
];

//Map code
var EMPTY = 0;
var CAT = 1;
var HEDGEHOG = 2;
var BOX = 4;
var DOOR = 5;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var cat = null;
var door = null;
var gameOverDisplay = null;
var gameOverMessage = null;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 3;

//Arrays to store the game objects
var sprites = [];
var hedgehogs = [];
var boxes = [];
var messages = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/hedgehogApocalypse.png";
assetsToLoad.push(image);

//Add mouse listeners
canvas.addEventListener("mousemove", mousemoveHandler, false);
canvas.addEventListener("mousedown", mousedownHandler, false);

//The mouse
var mouseX = 0;
var mouseY = 0;

//Game variables
var hedgehogsSquashed = 0;

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var gameState = LOADING;

//Start the game animation loop
update();

function update()
{ 
  //Start the animation loop
  setTimeout(update, 16);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      console.log("loading...");
      break;
      
    case BUILD_MAP:
      buildMap(map);
      buildMap(gameObjects);
      createOtherObjects();
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
    
    case OVER:
      endGame();
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
    
      if(currentTile != EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
        switch (currentTile)
        {
          case CAT:
            cat = Object.create(spriteObject);
            cat.sourceX = tilesheetX;
            cat.sourceY = tilesheetY;
            cat.x = column * SIZE;
            cat.y = row * SIZE;
            //Set the initial mouse position to the cat's position
            mouseX = cat.x + cat.halfWidth();
			mouseY = cat.y + cat.halfHeight();
            sprites.push(cat);
            break;
            
          case HEDGEHOG:
            var hedgehog = Object.create(hedgehogObject);
            hedgehog.sourceX = tilesheetX;
            hedgehog.sourceY = tilesheetY;            
            hedgehog.x = column * SIZE;
            hedgehog.y = row * SIZE;
            hedgehog.vx = hedgehog.speed;
            sprites.push(hedgehog);
            hedgehogs.push(hedgehog);
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
          
          case DOOR:
            door = Object.create(spriteObject);
            door.sourceX = tilesheetX;
            door.sourceY = tilesheetY;
            door.x = column * SIZE;
            door.y = row * SIZE;
            sprites.push(door);
            break; 
            
          default:
            var sprite = Object.create(spriteObject);
            sprite.sourceX = tilesheetX;
            sprite.sourceY = tilesheetY;
            sprite.x = column * SIZE;
            sprite.y = row * SIZE;
            sprites.push(sprite);       
        }
      }
    }
  }
}

function createOtherObjects()
{
  gameOverDisplay = Object.create(spriteObject);
  gameOverDisplay.sourceX = 0;
  gameOverDisplay.sourceY = 192;
  gameOverDisplay.sourceWidth = 192;
  gameOverDisplay.sourceHeight = 128;
  gameOverDisplay.width = 192;  
  gameOverDisplay.height = 128;            
  gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
  gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
  gameOverDisplay.visible = false;
  sprites.push(gameOverDisplay);
  
  gameOverMessage = Object.create(messageObject);
  gameOverMessage.x = gameOverDisplay.x + 20;
  gameOverMessage.y = gameOverDisplay.y + 34;
  gameOverMessage.font = "bold 30px Helvetica";
  gameOverMessage.fillStyle = "black";
  gameOverMessage.text = "";
  gameOverMessage.visible = false;
  messages.push(gameOverMessage);
}

function playGame()
{ 
  
  //--- The cat 
  cat.vx = (mouseX - (cat.x + cat.halfWidth())) * 0.2;
  
  //Apply gravity
  cat.vy += cat.gravity;

  //Limit the speed
  //Don't limit the upward speed because it will choke the jump effect
  
  if (cat.vx > cat.speedLimit)
  {
    cat.vx = cat.speedLimit;
  }
  if (cat.vx < -cat.speedLimit)
  {
    cat.vx = -cat.speedLimit;
  } 
  if (cat.vy > cat.speedLimit * 2)
  {
    cat.vy = cat.speedLimit * 2;
  } 
  
  //Move the cat
  cat.x += cat.vx;
  cat.y += cat.vy;
  
  //Check for a collision between the cat and the boxes
  for(var i = 0; i < boxes.length; i++)
  {
    var collisionSide = blockRectangle(cat, boxes[i], false);
    
    if(collisionSide === "bottom" && cat.vy >= 0)
    {
      //Tell the game that the cat is on the ground if 
      //it's standing on top of a platform
      cat.isOnGround = true;
		
      //Neutralize gravity by applying its
      //exact opposite force to the character's vy
      cat.vy = -cat.gravity;
    }
    else if(collisionSide === "top" && cat.vy <= 0)
    {
      cat.vy = 0;
    }
    else if(collisionSide === "right" && cat.vx >= 0)
    {
      cat.vx = 0;
    }
    else if(collisionSide === "left" && cat.vx <= 0)
    {
      cat.vx = 0;
    }
    if(collisionSide !== "bottom" && cat.vy > 0)
    {
      cat.isOnGround = false;
    }
  }

  //Reset isOnGround to false if the cat slides off a platform without jumping
  if(cat.vy > 0)
  {
    cat.isOnGround = false;
  }
  
  //-- The heddgehogs
  for(var i = 0; i < hedgehogs.length; i++)
  {
    var hedgehog = hedgehogs[i];
    
    //Move the hedgehog if its state is NORMAL
    if(hedgehog.state === hedgehog.NORMAL)
    {
      hedgehog.x += hedgehog.vx;
      hedgehog.y += hedgehog.vy;
    }
    
    //Check whether the hedgehog is at a cell corner
    if(Math.floor(hedgehog.x) % SIZE === 0
    && Math.floor(hedgehog.y) % SIZE === 0)
    {
      //Change the hedgehog's direction if there's no BOX under it
      
      //Find the hedgehog's column and row in the array
	  var hedgehogColumn = Math.floor(hedgehog.x / SIZE);
	  var hedgehogRow = Math.floor(hedgehog.y / SIZE);
		  
      if(hedgehogRow < ROWS - 1)
      { 
        var thingBelowLeft = map[hedgehogRow + 1][hedgehogColumn - 1];
        var thingBelowRight = map[hedgehogRow + 1][hedgehogColumn + 1];
		    
        if(thingBelowLeft !== BOX || thingBelowRight !== BOX)
        {
          hedgehog.vx *= -1;
        }
      }
		  
      if(hedgehogColumn > 0)
      {
        var thingToTheLeft = map[hedgehogRow][hedgehogColumn - 1];
        if(thingToTheLeft === BOX)
        {
          hedgehog.vx *= -1;
        }
      } 
		  
      if(hedgehogColumn < COLUMNS - 1)
      {
        var thingToTheRight = map[hedgehogRow][hedgehogColumn + 1];
        if(thingToTheRight === BOX)
        {
          hedgehog.vx *= -1;
        }
      }     
    }
  }
  
  //Collision between the cat and the hedgehogs
  for(var i = 0; i < hedgehogs.length; i++)
  {
    var hedgehog = hedgehogs[i];
    
    if(hedgehog.visible && hitTestCircle(cat, hedgehog)
    && hedgehog.state === hedgehog.NORMAL)
    {
      if(cat.vy > 0)
      {
        blockCircle(cat, hedgehog, true);
        hedgehogsSquashed++;
        squashHedgehog(hedgehog);
      }
      else
      {
        gameState = OVER;
      }
    }
  }
  
  //Collision between the cat and the door
  if(hitTestRectangle(cat, door))
  {
    //Check if all the hedgehogs have been squashed
    if(hedgehogsSquashed === 3)
    {
      gameState = OVER;
    }  
  }
  
  //Screen boundaries
  //Left
  if (cat.x < 0)
  {
    cat.vx = 0;
    cat.x = 0;
  }
  //Up
  if (cat.y < 0)
  {
    cat.vy = 0;
    cat.y = 0;
  }
  //Right
  if (cat.x + cat.width > canvas.width)
  {
    cat.vx = 0;
    cat.x = canvas.width - cat.width;
  }
  //Down
  if (cat.y + cat.height > canvas.height)
  {
    cat.vy = 0;
    cat.y = canvas.height - cat.height;
    cat.isOnGround = true;
  }
}

function squashHedgehog(hedgehog)
{
  //Change the hedgehog's state and update the object 
  hedgehog.state = hedgehog.SQUASHED;
  hedgehog.update();  
  
  //Remove the hedgehog after 1 second
  setTimeout(removeHedgehog, 1000);
  
  function removeHedgehog()
  {
    hedgehog.visible = false;
  }
}

function endGame()
{
  gameOverDisplay.visible = true;
  gameOverMessage.visible = true;
    
  if(hedgehogsSquashed === 3)
  {
    gameOverMessage.text = "You Won!";
  }
  else
  {
    gameOverMessage.text = "You Lost!";
  }
}

function mousemoveHandler(event)
{ 
  //Find the mouse's x and y position.
  //Subtract the canvas's top and left offset
  mouseX = event.pageX - canvas.offsetLeft;
  mouseY = event.pageY - canvas.offsetTop;
}

function mousedownHandler(event)
{
  if(cat.isOnGround)
  {
    cat.vy += cat.jumpForce;
    cat.isOnGround = false;
  }
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

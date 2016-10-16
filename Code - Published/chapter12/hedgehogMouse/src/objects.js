//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 64,
  sourceHeight: 64,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  height: 64,
  width: 64,
  visible: true,
  
  //Physics properties
  accelerationX: 0, 
  accelerationY: 0, 
  speedLimit: 5, 
  friction: 0.96,
  bounce: -0.7,
  gravity: 0.3,
    
  //Platform game properties   
  isOnGround: undefined,
  jumpForce: -10,
  
  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  }
};

//--- The hedgehog object
hedgehogObject = Object.create(spriteObject);

//The hedgehog's states
hedgehogObject.NORMAL = [1,0];
hedgehogObject.SQUASHED = [2,0];
hedgehogObject.state = hedgehogObject.NORMAL;
   
hedgehogObject.update = function()
{ 
  this.sourceX = this.state[0] * this.sourceWidth;
  this.sourceY = this.state[1] * this.sourceHeight;
};

//The hedgehog's allowed speed
hedgehogObject.speed = 1;

//--- The message object

var messageObject =
{
  x: 0,
  y: 0,
  visible: true,
  text: "Message",
  font: "normal bold 20px Helvetica",
  fillStyle: "red",
  textBaseline: "top"
};
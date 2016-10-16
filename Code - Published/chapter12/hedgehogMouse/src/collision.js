/*
This JavaScript file contains five collision functions

- hitTestPoint
- hitTestCircle
- blockCircle
- hitTestRectangle
- blockRectangle

To use them you'll need a sprite object with these minimum properties:

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 64,
  sourceHeight: 64,
  width: 64,
  height: 64,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  
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
  },
  left: function()
  {
    return this.x;
  },
  right: function()
  {
    return this.x + this.width;
  },
  top: function()
  {
    return this.y;
  },
  bottom: function()
  {
    return this.y + this.height;
  }
};


*/


//hitTestPoint

function hitTestPoint(pointX, pointY, sprite)
{  
  var hit 
    = pointX > sprite.left() && pointX < sprite.right()
    && pointY > sprite.top() && pointY < sprite.bottom();
    
  return hit;
}

//hitTestCircle

function hitTestCircle(c1, c2)
{
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();
  
  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is)  
  var magnitude = Math.sqrt(vx * vx + vy * vy);
  
  //Add together the circles' total radii
  var totalRadii = c1.halfWidth() + c2.halfWidth();
  
  //Set hit to true if the distance between the circles is
  //less than their totalRadii
  var hit = magnitude < totalRadii;
  
  return hit;
}

//blockCircle

function blockCircle(c1, c2, bounce)
{  
  //Set bounce to a default value of false if it's not specified
  if(typeof bounce === "undefined")
  {
    bounce = false;
  }
  
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();
  
  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is) 
  var magnitude = Math.sqrt(vx * vx + vy * vy);
  
  //Add together the circles' combined half-widths
  var combinedHalfWidths = c1.halfWidth() + c2.halfWidth();
  
  //Figure out if there's a collision
  if(magnitude < combinedHalfWidths)
  {
    //Yes, a collision is happening.
    //Find the amount of overlap between the circles 
    var overlap = combinedHalfWidths - magnitude;
    
    //Normalize the vector.
    //These numbers tell us the direction of the collision
    dx = vx / magnitude;
    dy = vy / magnitude;

    //Move circle 1 out of the collision by multiplying
    //the overlap with the normalized vector and add it to 
    //circle 1's position
    c1.x += overlap * dx; 
    c1.y += overlap * dy;
    
    //Bounce    
    if(bounce)
    {
      //Create a collision vector object to represent the bounce surface
      var s = {};
      
      //Find the bounce surface's vx and vy properties
      //(This represents the normal of the distance vector between the circles)
      s.vx = vy; 
      s.vy = -vx;
    
      //Bounce c1 off the surface
      bounceOffSurface(c1, s);
    }
  }
}

//hitTestRectangle

function hitTestRectangle(r1, r2)
{
  //A variable to determine whether there's a collision
  var hit = false;
  
  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

  //Check for a collision on the x axis
  if(Math.abs(vx) < combinedHalfWidths)
  {
    //A collision might be occuring. Check for a collision on the y axis
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //There's definitely a collision happening
      hit = true;
    }
    else
    {
      //There's no collision on the y axis
      hit = false;
    }   
  }
  else
  {
    //There's no collision on the x axis
    hit = false;
  }
  
  return hit;
}

//blockRectangle

function blockRectangle(r1, r2, bounce)
{
  //Set bounce to a default value of false if it's not specified
  if(typeof bounce === "undefined")
  {
    bounce = false;
  }
  
  //A variable to tell us which side the 
  //collision is occurring on
  var collisionSide = "";
  
  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
    
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >= overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
          collisionSide = "top";
            
          //Move the rectangle out of the collision
          r1.y = r1.y + overlapY;
        }
        else 
        {
          collisionSide = "bottom";
          
          //Move the rectangle out of the collision
          r1.y = r1.y - overlapY;
        }
    
        //Bounce
        if(bounce)
        {
          r1.vy *= -1;
		      
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = r2.x - r2.x + r2.width; 
          s.vy = 0;
		    
          //Bounce r1 off the surface
          //bounceOffSurface(r1, s);
          */
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
          collisionSide = "left";
            
          //Move the rectangle out of the collision
          r1.x = r1.x + overlapX;
        }
        else 
        {
          collisionSide = "right";
            
          //Move the rectangle out of the collision
          r1.x = r1.x - overlapX;
        }
        
        //Bounce
        if(bounce)
        {
          r1.vx *= -1;
			    
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = 0; 
          s.vy = r2.y - r2.y + r2.height;
			    
          //Bounce r1 off the surface
          bounceOffSurface(r1, s);
          */
        }
      } 
    }
    else 
    {
      //No collision
      collisionSide = "none";
    }
  } 
  else 
  {
    //No collision
    collisionSide = "none";
  }
  
  return collisionSide;
}

function blockCircle(c1, c2, bounce)
{  
  //Set bounce to a default value of false if it's not specified
  if(typeof bounce === "undefined")
  {
    bounce = false;
  }
  
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();
  
  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is) 
  var magnitude = Math.sqrt(vx * vx + vy * vy);
  
  //Add together the circles' combined half-widths
  var combinedHalfWidths = c1.halfWidth() + c2.halfWidth();
  
  //Figure out if there's a collision
  if(magnitude < combinedHalfWidths)
  {
    //Yes, a collision is happening.
    //Find the amount of overlap between the circles 
    var overlap = combinedHalfWidths - magnitude;
    
    //Normalize the vector.
    //These numbers tell us the direction of the collision
    dx = vx / magnitude;
    dy = vy / magnitude;

    //Move circle 1 out of the collision by multiplying
    //the overlap with the normalized vector and add it to 
    //circle 1's position
    c1.x += overlap * dx; 
    c1.y += overlap * dy;
    
    //Bounce    
    if(bounce)
    {
      //Create a collision vector object to represent the bounce surface
      var s = {};
      
      //Find the bounce surface's vx and vy properties
      //(This represents the normal of the distance vector between the circles)
      s.vx = vy; 
      s.vy = -vx;
    
      //Bounce c1 off the surface
      bounceOffSurface(c1, s);
    }
  }
}

//Use this to bounce an object off another object
function bounceOffSurface(o, s)
{
  //1. Calculate the collision surface's properties
  
  //Find the surface vector's left normal
  s.lx = s.vy; 
  s.ly = -s.vx;
  
  //Find its magnitude
  s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
  
  //Find its normalized values
  s.dx = s.vx / s.magnitude;
  s.dy = s.vy / s.magnitude;
  
  //2. Bounce the object (o) off the surface (s)
  
  //Find the dot product between the object and the surface
  var dp1 = o.vx * s.dx + o.vy * s.dy;
  
  //Project the object's velocity onto the collision surface
  var p1Vx = dp1 * s.dx; 
  var p1Vy = dp1 * s.dy;
  
  //Find the dot product of the object and the surface's left normal (s.lx and s.ly)
  var dp2 = o.vx * (s.lx / s.magnitude) + o.vy * (s.ly / s.magnitude); 
  
  //Project the object's velocity onto the surface's left normal
  var p2Vx = dp2 * (s.lx / s.magnitude);
  var p2Vy = dp2 * (s.ly / s.magnitude);
  
  //Reverse the projection on the surface's left normal
  p2Vx *= -1; 
  p2Vy *= -1;
  
  //Add up the projections to create a new bounce vector
  var bounceVx = p1Vx + p2Vx;
  var bounceVy = p1Vy + p2Vy;
  
  //Assign the bounce vector to the object's velocity
  o.vx = bounceVx; 
  o.vy = bounceVy;
}
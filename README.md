# Coords.js

Coords.js is a lightweight math library for point and vector calculations in javascript. Modeled loosely off of PVector from processing.

## Structure

There are two main object types that can be created with coords.js: *Points* and *Vectors*. A *point* is a simple object that consists of an x coordinate and a y coordinate. A *vector* is an object calculated from two *points* that represents the vector between those points. *Vectors*, at their base, also consist of an x and y value, here representative of the two axes that make up the vector, as well as several calculated properties. While there are a lot of apparent similarities between the vector and point object types, the conceptual distinction is important to maintain, as vectors represent a unit of change, and points represent a static position.

### Points

#### Initializing

To create a new point, initialize as so:

	var myPoint = CPoint(x, y)
	// myPoint was created with properties myPoint.x and myPoint.y

#### Properties

- `x`: The x value for the point
- `y`: The y value for the point

#### Methods
- `add(Point)`: Add the values of another point to the current point.
- `sub(Point)`: Subtract the values of another point from the current point.
- `mult(factor)`: Multiply the values of the current point by a number
- `div(factor)`: Divide the values of the current point by a number
- `dist(Point)`: The distance between the current point and any given point.

### Vectors

#### Initializing

To create a new vector, do this:

	var start = CPoint(5,10);
	var end = CPoint(7,12);
	var myVector = CVector(start, end);
	// myVector was created and properties were calculated

#### Properties

- `start`: The first point of the vector
- `end`: The second point of the vector
- `x`: The x value for the vector
- `y`: The y value for the vector
- `center`: The center point along the vector
- `unit`: The unit vector object
-- `unit.x`: x value of the unit vector
-- `unit.y`: y value of the unit vector
-- `unit.scalar`: The value used to divide the vector into the unit vector
- `direction`: The direction of the vector, denoted with either 1, 2, 3, or 4, corresponding with the quadrant the normalized vector would be in.
- `magnitude`: The length of the vector

#### Methods

- `add(Vector)`: Adds the values of a given vector to the current vector
- `sub(Vector)`: Subtracts the values of a given vector from the current vector
- `mult(scalar)`: Multiplies the current vector by a given scalar. The scalar can be supplied as a function requesting argument v to perform more complex conditional multiplication if desired.
- `div(scalar)`: Divides the current vector by a given scalar
The scalar can be supplied as a function requesting argument v to perform more complex conditional multiplication if desired.
- `norm()`: Sets the value of the vector to the value of the unit vector (original value can be recovered later if necessary by multiplying the vector by it's own unit.scalar property.
- `translate(Point)`: Move the vector by a given x and y value
- `rotate(centerPoint, radians)`: Rotate the vector around a centerPoint by a given number of radians. 
- `mirror(axis, position)`: Reflect the vector across either the `x` or `y` axis, at a given position. For `axis` supply a string containing either "x" or "y". For position, give the y or x position that you want to use for x or y axis (respectively) to be mirrored over.



/*

COORDS.JS
A lightweight library for point and vector calculations
by Kevin Zweerink

*/

//Extra stuff that is useful:

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Static object
// Agnostic to differences between points & vectors
// Useful for generic math operations
window.COORDS = {
	// Add a new set of values to the original
	// Returns modified original values
	add : function(a, b) {
		if(a.x && a.y && b.x && b.y) {
			var c = CPoint(a.x, a.y);
			var d = CPoint(b.x, b.y);
			c.x += d.x;
			c.y += d.y;
			return c;
		} else {
			console.log("Please use a valid vector or point object")
		}
	},

	// Subtract a set of values from the original
	// Returns modified original values
	sub : function(a, b) {
		if(a.x && a.y && b.x && b.y) {
			var c = CPoint(a.x, a.y);
			var d = CPoint(b.x, b.y);
			c.x -= d.x;
			c.y -= d.y;
			return c;
		} else {
			console.log("Please use a valid vector or point object")
		}
	},

	// Multiply a vector by a scalar
	// Returns modified original values
	mult: function(a, scalar) {
		if(a.x && a.y) {
			var b = CPoint(a.x, a.y);
			if (!isFunction(scalar)) {
				b.x *= scalar;
				b.y *= scalar;
				return b;
			} else {
				b.x = scalar(b.x);
				b.y = scalar(b.y);
				return b;
			}
		} else {
			console.log("Please use a valid vector or point object")
		}
	},

	// Divide a vector by a scalar
	// Returns modified original values
	div: function(a, scalar) {
		if(a.x && a.y) {
			var b = CPoint(a.x, a.y);
			if (!isFunction(scalar)) {
				b.x = b.x/scalar;
				b.y = b.y/scalar;
				return a;
			} else {
				b.x = scalar(b.x);
				b.y = scalar(b.y);
				return b;
			}
		} else {
			console.log("Please use a valid vector or point object")
		}
	},

	// Determine distance between two sets of coordinates
	dist: function(a,b) {
		if(a.x && a.y && b.x && b.y) {
			var xDist = b.x - a.x;
			var yDist = b.y - a.y;
			return Math.sqrt((xDist*xDist) + (yDist*yDist));
		} else {
			console.log("Please use a valid vector or point object")
		}
	}
}

// Data type for points
window.CPoint = function(x,y) {
	var point = {

		/*  
			##########
			PROPERTIES
			##########
		*/ 

		x: x,
		y: y,

		/*  
			##################
			ACCESSIBLE METHODS
			##################
		*/ 

		add: function(point) {
			var outcome = COORDS.add(this, point);
			this.x = outcome.x;
			this.y = outcome.y;
		},
		sub: function(point) {
			var outcome = COORDS.sub(this, point);
			this.x = outcome.x;
			this.y = outcome.y;
		},
		mult: function(scalar) {
			var outcome = COORDS.mult(this, scalar);
			this.x = outcome.x;
			this.y = outcome.y;
		},
		div: function(scalar) {
			var outcome = COORDS.div(this, scalar);
			this.x = outcome.x;
			this.y = outcome.y;
		},
		dist: function(point) {
			var outcome = COORDS.dist(this, point);
			return outcome;
		}
	}
	return point
}

window.CVector = function(a, b) {
	var cacheA = CPoint(a.x, a.y);
	var cacheB = CPoint(b.x, b.y);
	var dif = COORDS.sub(cacheB, cacheA);
	var vector = {

		/*  
			##########
			PROPERTIES
			##########
		*/ 

		start : a,
		end : b,
		x : dif.x,
		y : dif.y,
		magnitude : a.dist(b),
		unit : {},
		direction : false,
		midpoint : {},

		/*  
			##################
			ACCESSIBLE METHODS
			##################
		*/ 

		// Requires vector or point object
		add : function(v) {
			var outcome = COORDS.add(this, v);
			var dif = COORDS.sub(v,this);
			this.x = outcome.x;
			this.y = outcome.y;
			this.end.add(dif);
		},

		//Requires vector or point object
		sub : function(v) {

		},

		// Requires scalar
		mult : function(scalar) {

		},

		// Requires scalar
		div : function(scalar) {

		},

		// Requires coordinates
		translate : function(point) {

		},

		// Requires centerpoint and radians
		rotate : function(cp, radians) {

		},

		// Requires axis ("x" or "y") and position (number)
		mirror : function(axis, position) {

		},

		/*  
			################
			INTERNAL METHODS
			################
		*/  

		calculateUnit : function() {
			var _this = this;
			if (Math.abs(this.x) > Math.abs(this.y)) {
				this.unit = {
					x : _this.x / _this.y,
					y : _this.y / _this.y,
					scalar : _this.y
				}
			} else {
				this.unit = {
					x : _this.x / _this.x,
					y : _this.y / _this.x,
					scalar : _this.x
				}
			}
		},

		calculateDirection : function() {
			if(this.x >= 0 && this.y >= 0) {
				this.direction = 1;
			} else if (this.x >=0 && this.y < 0) {
				this.direction = 4;
			} else if (this.x < 0 && this.y < 0) {
				this.direction = 3;
			} else if (this.x < 0 && this.y >= 0) {
				this.direction = 2;
			}
		},

		calculateMidpoint : function() {
			var midX = ((this.start.x + this.end.x)/2);
			var midY = ((this.start.y + this.end.y)/2);
			this.midpoint = CPoint(midX, midY);
		},

		update : function() {
			this.calculateUnit();
			this.calculateDirection();
			this.calculateMidpoint();
		}
	}
	vector.update();
	return vector;
}
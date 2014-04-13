var canvas, canvasCtx;
var b1fv, b1pl;
var b1fh, b1pb, b1pt;
var piles = new Array(5);
var regions = new Array();
var name;
var c1;

// make some way to add buttons to scene, with callbacks (which send position of click as params)
// need ability to pass param(s) into click handlers

// image preloading!!

// player objects (num cards, name, position, ..?) (drawHand(), drawName(), ..?)
// local player object (hand info, name, which cards are selected, ..?) (drawHand(), drawName(), selectCard(), ..?)

// clear area before drawing

CARD = function(suit, value, img)
{
	this.setSuit = function(newSuit)
	{
		this.suit = newSuit;
		if(this.suit == "c" || this.suit == "s")
		{
			this.color = "b";
		}
		else if(this.suit == "d" || this.suit == "h")
		{
			this.color = "r";
		}
	}
	this.getSuit = function()
	{
		return this.suit;
	}
	this.setValue = function(newValue)
	{
		this.value = newValue;
	}
	this.getValue = function()
	{
		return this.value;
	}
	this.setImg = function(newImg)
	{
		this.img = newImg;
	}
	this.getImg = function()
	{
		return this.img;
	}
	this.setSuit(suit);
	this.setValue(value);
	this.setImg(img);
}

drawTopCards = function(num, topName)
{
	totalWidth = b1fv.width + (b1pl.width * (num - 1));
	leftPadding = Math.floor((canvas.width - totalWidth) / 2);
	for(var cardNum = 0; cardNum < (num - 1); cardNum++)
	{
		canvasCtx.drawImage(b1pl, leftPadding + (cardNum * b1pl.width), 0);
	}
	canvasCtx.drawImage(b1fv, leftPadding + ((num - 1) * b1pl.width), 0);
	canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
	canvasCtx.font = "bold 12px sans-serif";
	canvasCtx.textAlign = "start";
	canvasCtx.textBaseline = "top";
	canvasCtx.fillText(topName, leftPadding + ((num - 1) * b1pl.width) + b1fv.width + 5, 5);
}

drawLeftCards = function(num, leftName)
{
	totalHeight = b1fh.height + (b1pb.height * (num - 1));
	topPadding = Math.ceil((canvas.height - totalHeight) / 2);
	canvasCtx.drawImage(b1fh, 0, topPadding);
	for(var cardNum = 0; cardNum < (num - 1); cardNum++)
	{
		canvasCtx.drawImage(b1pb, 0, topPadding + b1fh.height + (cardNum * b1pb.height));
	}
	canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
	canvasCtx.font = "bold 12px sans-serif";
	canvasCtx.textAlign = "start";
	canvasCtx.textBaseline = "bottom";
	canvasCtx.fillText(leftName, 5, topPadding - 5);
}

drawRightCards = function(num, rightName)
{
	totalHeight = b1fh.height + (b1pt.height * (num - 1));
	topPadding = Math.floor((canvas.height - totalHeight) / 2);
	for(var cardNum = 0; cardNum < (num - 1); cardNum++)
	{
		canvasCtx.drawImage(b1pt, canvas.width - b1pt.width, topPadding + (cardNum * b1pt.height));
	}
	canvasCtx.drawImage(b1fh, canvas.width - b1fh.width, topPadding + ((num - 1) * b1pt.height));
	canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
	canvasCtx.font = "bold 12px sans-serif";
	canvasCtx.textAlign = "end";
	canvasCtx.textBaseline = "top";
	canvasCtx.fillText(rightName, canvas.width - 5, topPadding + ((num - 1) * b1pt.height) + b1fh.height + 5);
}

drawBottomCards = function()
{
	// All temporary, name thing looks just like hearts
	leftPadding = Math.floor((canvas.width - c1.width) / 2);
	canvasCtx.drawImage(c1, leftPadding, canvas.height - c1.height);
	addClickRegion(leftPadding, canvas.height - c1.height, c1.width, c1.height, lol);
	canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
	canvasCtx.font = "bold 12px sans-serif";
	canvasCtx.textAlign = "end";
	canvasCtx.textBaseline = "bottom";
	canvasCtx.fillText(name, leftPadding - 5, canvas.height - 5);
}

drawEmptyPile = function(xPos, yPos)
{
	canvasCtx.fillStyle = "rgba(255, 255, 255, 1)";
	canvasCtx.fillRect(xPos, yPos, 6, 6);
	canvasCtx.fillRect(xPos + b1fv.width - 6, yPos + 0, 6, 6);
	canvasCtx.fillRect(xPos + b1fv.width - 6, yPos + b1fv.height - 6, 6, 6);
	canvasCtx.fillRect(xPos + 0, yPos + b1fv.height - 6, 6, 6);
	canvasCtx.clearRect(xPos + 2, yPos + 2, b1fv.width - 4, b1fv.height - 4);
}

drawPiles = function()
{
	horizontalSpace = (2 * b1fh.width) + (3 * b1fv.width);
	horizontalGap = Math.floor((canvas.width - horizontalSpace) / 4);
	verticalSpace = (4 * b1fv.height) + horizontalGap;
	verticalGap = Math.floor((canvas.height - verticalSpace) / 2);
	canvasCtx.drawImage(b1fv, b1fh.width + horizontalGap, b1fv.height + verticalGap);
	if(piles[0] == undefined)
	{
		drawEmptyPile(b1fh.width + b1fv.width + (2 * horizontalGap), b1fv.height + verticalGap);
	}
	else
	{
		
	}
	if(piles[1] == undefined)
	{
		drawEmptyPile(b1fh.width + (2 * b1fv.width) + (3 * horizontalGap), b1fv.height + verticalGap);
	}
	else
	{
		
	}
	if(piles[2] == undefined)
	{
		drawEmptyPile(b1fh.width + horizontalGap, (2 * b1fv.height) + verticalGap + horizontalGap);
	}
	else
	{
		
	}
	if(piles[3] == undefined)
	{
		drawEmptyPile(b1fh.width + (2 * horizontalGap) + b1fv.width, (2 * b1fv.height) + verticalGap + horizontalGap);
	}
	else
	{
		
	}
	if(piles[4] == undefined)
	{
		drawEmptyPile(b1fh.width + (3 * horizontalGap) + (2 * b1fv.width), (2 * b1fv.height) + verticalGap + horizontalGap);
	}
	else
	{
		
	}
}

HAND = function()
{
	
}

addClickRegion = function(xPos, yPos, width, height, handler)
{
	regions.push({x: xPos, y: yPos, w: width, h: height, fn: handler});
}

handleClick = function(event)
{
	var clickPos = {x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop};
	for(var i = 0; i < regions.length; i++)
	{
		if(inRegion(clickPos, regions[i]))
		{
			regions[i].fn(clickPos);
		}
	}
}

inRegion = function(point, region)
{
	if(point.x >= region.x && point.x < (region.x + region.w) && point.y >= region.y && point.y < (region.y + region.h))
	{
		return true;
	}
	return false;
}

lol = function(poo)
{
	window.alert("(" + poo.x + ", " + poo.y + ")");
}

window.onload = function()
{
	canvas = document.getElementById("canvas");
	canvasCtx = canvas.getContext("2d");
	b1fv = new Image();
	b1fv.src = 'images/b1fv.gif';
	b1pl = new Image();
	b1pl.src = 'images/b1pl.gif';
	b1fh = new Image();
	b1fh.src = 'images/b1fh.gif';
	b1pb = new Image();
	b1pb.src = 'images/b1pb.gif';
	b1pt = new Image();
	b1pt.src = 'images/b1pt.gif';
	c1 = new Image();
	c1.src = 'images/c1.gif';
	canvas.addEventListener("click", handleClick, false);
	name = window.prompt("Welcome to Huzzah! What is your name?", "Ryan");
	drawTopCards(Math.floor(Math.random() * 10) + 1, "James");
	drawLeftCards(Math.floor(Math.random() * 10) + 1, "Ben");
	drawRightCards(Math.floor(Math.random() * 10) + 1, "Chris");
	drawPiles();
	drawBottomCards();
}
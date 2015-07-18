

//triangle divider


var points[];
var NumTimeToSubdivde = 1000;
function triangle(a, b, c, d)
{
	points.push(a, b, c, d);
}



function divideTriangle(a, b, c, count)
{
	if(count === 0)
	{
		triangle(a, b, c);
	}
	else
	{
		var ab = mix(a, b, 0.5);
		var ac = mix(a, c, 0.5);
		var bc = mix(b, c, 0.5);
		--count;
		divideTriangle(a, ab, ac, count-1);
		divideTriangle(a, ac, bc, count-1);
		divideTriangle(a, bc, ab, count-1);
	
	
	}
		
}

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
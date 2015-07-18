
//Author Bill
/*		Viewer Advisory!!!
        This code is rated R for the following reasons:
		
		Code is ugly!
		Code is bloated and code reuse is under utilized
		It is cludged togeter
		
		It may be offensive to some viewers!
*/
var gl;

var points = [];
var NumSubdivde = 5;
var tessellatedFullTriangle = 0
var rotation = 0;
var gasketOn = 0; 
var bufferId;
var vertices = [vec2(-.5,-.5),vec2(0, .5), vec2(.5, -.5)];
window.onload = function init()
{
     

	 
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl)
	{
		alert("WebGL is not Available" );
	}
	var vertices = [vec2(-.5,-.5),vec2(0, .5), ];
    document.getElementById("triangle").onclick = function tessellatedTriangle()		{
	 if(tessellatedFullTriangle === 0){
				tessellatedFullTriangle = 1;
				points.length = 0;	
				document.getElementById("tessellation").value = NumSubdivde.toString();	
				document.getElementById("triangle").value = "Display Un-tessellated Triangle"	;			
				var vertices = [vec2(-.5,-.5),vec2(0, .5), vec2(.5, -.5)];
			 	divideTriangle(vertices[0], vertices[1], vertices[2], NumSubdivde );
	   }
	 
	else{
				tessellatedFullTriangle = 0;	
				document.getElementById("tessellation").value = '0';				
				document.getElementById("triangle").value = "Display Tessellated Full Triangle"	;			
				points.length = 0;
				triangle (vec2(0, .5),vec2(-.5,-.5),vec2(.5, -.5));
	  	 }
        gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
		render();
	
	
	}
	document.getElementById("rotate").onclick = function rotate()	{
	  rotation += .05;
	   if(tessellatedFullTriangle === 0 && gasketOn === 0){
				
				points.length = 0;
				triangle (vec2(0, .5),vec2(-.5,-.5),vec2(.5, -.5));
	   }
	 
		else{
				points.length = 0;	
			   
				var vertices = [vec2(-.5,-.5),vec2(0, .5), vec2(.5, -.5)];
			 	divideTriangle(vertices[0], vertices[1], vertices[2], NumSubdivde );
	
				
	  	 }
		document.getElementById("rotationDisplay").value = rotation.toString();
        gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
		render();
	 
	  
	
	}
	
	document.getElementById("Submit").onclick = function submit()	{
	
	 
		
		
				NumSubdivde = document.getElementById("tessellation").value	;
				if(NumSubdivde > 12)
				   NumSubdivde = 12
	
				points.length = 0;	
				
				
				document.getElementById("tessellation").value = NumSubdivde.toString();	
				document.getElementById("triangle").value = "Display Un-tessellated Triangle"	;			
				var vertices = [vec2(-.5,-.5),vec2(0, .5), vec2(.5, -.5)];
			 	divideTriangle(vertices[0], vertices[1], vertices[2], NumSubdivde );
	
		
	    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
		render();
	 
	  
	
	}
	document.getElementById("Reset").onclick = function reset()	{
	
	   
		tessellatedFullTriangle = 0;
		rotation = 0;
		gasketOn = 0; 
		document.getElementById("triangle").value = "Display Tessellated Full Triangle"	;	
		document.getElementById("gasket").value = "Display Gasket";
		document.getElementById("tessellation").value = '0';		
		points.length = 0;
		triangle (vec2(0, .5),vec2(-.5,-.5),vec2(.5, -.5));
		document.getElementById("rotationDisplay").value = rotation.toString();
	    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
		render();
	 
	  
	
	}
	
	document.getElementById("gasket").onclick = function displayGasket()	
		{
		if(gasketOn === 1) {
				gasketOn = 0; 
				
				for( var i in points)
				{
				   delete  points[i];
				   
				}
				document.getElementById("tessellation").value = '0';	
				points.length = 0;
				triangle (vec2(0, .5),vec2(-.5,-.5),vec2(.5, -.5));
				
				document.getElementById("gasket").value = "Display Gasket";
				
				
			}
			else{
				gasketOn = 1;
				tessellatedFullTriangle = 0;			
				points.length = 0;	
				document.getElementById("tessellation").value = NumSubdivde.toString();	
				document.getElementById("gasket").value = "Display single triangle"	;			
				var vertices = [vec2(-.5,-.5),vec2(0, .5), vec2(.5, -.5)];
			 	divideTriangle(vertices[0], vertices[1], vertices[2], NumSubdivde );
				
				document.getElementById("triangle").value = "Display Tessellated Full Triangle"	;		
			}
			gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
			render();
		}
		
	//var tesselationInput = document.getElementById("tessellation");
	
	
       



	
	
	
	//Configure WebGL
	
	gl.viewport(0,0, canvas.width, canvas.height);
	gl.clearColor(1.0,1.0, 1.0, 1.0);
	
	//load shaders and initialize attribute buffers
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	
	
	//load the data into the gpu 
	//                               
	bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	
	
	
	//Associate our shader variable with our data bufferData
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	

	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	


	triangle (vec2(0, .5),vec2(-.5,-.5),vec2(.5, -.5));
	    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);

	render();
}

	
function tringlesRotate(a, b, c)
{

	 
       var cen = vec2((a[0] +b[0])/2, ((b[1] + c[1])/2));
	 //  alert(a[0] + "  " + a[1] + "  "  + b[0] + "  " + b[1] + "  " + c[0] + "  " + c[1] + "  " + cen[0]  + cen[1] );
	  var  da = Math.sqrt ( cen[0] * cen[0] + cen[1]  * cen[1]);
	 
	
	 
	  
	  var ax = a[0];
	  var ay = a[1];
	  
	  var bx = b[0];
	  var by = b[1];
	  
	  var cx = c[0];
	  var cy = c[1];
	  
	  a[0]=  ax * Math.cos(da * rotation) -  ay * Math.sin(da * rotation);
	  a[1]=  ax * Math.sin(da * rotation) +  ay * Math.cos(da * rotation);
	  b[0]=  bx * Math.cos(da * rotation) -  by * Math.sin(da * rotation);
	  b[1]=  bx * Math.sin(da * rotation) +  by * Math.cos(da * rotation);
	  c[0]=  cx * Math.cos(da * rotation) -  cy * Math.sin(da * rotation);
	  
		c[1]=  cx * Math.sin(da * rotation) +  cy * Math.cos(da * rotation);
	 
		
}

function triangle(a, b, c)
{
    tringlesRotate(a, b, c);
	 points.push(a, b, c);
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
		divideTriangle(a, ab, ac, count);
		divideTriangle(c, ac, bc, count);
		divideTriangle(b, bc, ab, count);
		  if(tessellatedFullTriangle === 1)
		 	 divideTriangle(ab, ac, bc, count);
	
	}
		
}

function render( )
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, points,points.length);
}
		


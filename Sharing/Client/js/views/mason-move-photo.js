
var Mvp = function(divid) {
  drag = 0;
  move = 0;
  function mousedown()
  {
  	if(drag)
  	{
  		X1 = window.event.x - parseInt(dragimages.style.left);
  		Y1 = window.event.y - parseInt(dragimages.style.top);
  		dragimages.style.Index += 1;
  		move = 1;
  	}
  }
  function mouseStop()
  {
  	window.event.returnValue = false;
  }
  function mousemove()
  {
  	if (move)
  	{
  		dragimages.style.left = window.event.x - X1;
  		dragimages.style.top = window.event.y - Y1;
  	}
  }
  function mouseup()
  {
  	move = 0;
  }
  function remove()
  {
  	document.all.divid.onmousemove = mousemove;
  	document.all.divid.onmousedown = mousedown;
  	document.all.divid.onmouseup = mouseup;
  	document.all.divid.ondragstart  = mouseStop;
  }
};

module.exports = Mvp;

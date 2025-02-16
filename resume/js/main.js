function move(){
  var xm = 0;
var ym = 0;
sP = {
 cx : 0,
 cy : 0,
 N  : 0,
 R  : [],
 I  : [],
 C  : [],
 L  : [],
 Id : 0,
 init : function ()
 {
  /* ==== init script ==== */
  this.scr = document.getElementById('screen');
  this.pan = document.getElementById('pan');
  this.div = this.pan.getElementsByTagName('div');
  this.scr.onselectstart = function () { return false; }
  this.scr.ondrag        = function () { return false; }
  /* ==== for each pane ==== */
  for (var i = 0, o; o = this.div[i]; i++)
  {
   if (o.className == 'frame')
   {
    /* ==== create legend ==== */
    o.l = document.createElement('div');
    o.l.className = 'legend';
    o.appendChild(o.l);
    /* ==== create flap ==== */
    o.r = document.createElement('div');
    o.r.className = 'slider';
    o.appendChild(o.r);
    o.r.x = 0;
    o.r.l = o.l;
    o.r.p = 0;
    o.r.s = 2;
    o.r.m = false;
    o.img = o.r.img = o.getElementsByTagName('img')[0];
    o.r.c = Math.random() * 100;
    o.r.o = o;
    sP.R[sP.N] = o.r;
    sP.I[sP.N] = o.img.src;
    sP.L[sP.N] = o.title;
    o.title = "";
    sP.N++;
    /* ==== flap mouse over event ==== */
    o.r.onmouseover = function ()
    {
     if (!this.m && this.img.complete)
     {
      /* ==== switch image ==== */
      if (sP.O != this && !this.n)
      {
       this.x = this.o.offsetWidth;
       this.l.innerHTML = sP.L[sP.Id];
       this.img.src = sP.I[sP.Id];
       this.resize();
       this.n = true;
       if(++sP.Id >= sP.N)
       {
        sP.Id = 0;
        for (var i = 0, o; o = sP.R[i]; i++) o.n = false;
       }
      }
      /* ==== up++ ==== */
      if (sP.O)
      {
       sP.O.s = 2;
       sP.C.push(sP.O);
      }
      this.m = true;
      sP.O = this;
      sP.Or = this;
     }
    }
    /* ==== resize image ==== */
    o.r.resize = function ()
    {
     var i = new Image();
     i.src = this.img.src;
     this.img.style.width  = (i.width  < this.offsetWidth) ? Math.round(this.offsetWidth  * 1.25) + 'px' : Math.round(i.width) + 'px';
     this.img.style.height = (i.height < this.offsetHeight) ? Math.round(this.offsetHeight * 1.25) + 'px' : Math.round(i.height) + 'px';
     this.w = (this.img.offsetWidth  - this.offsetWidth)  * .5;
     this.h = (this.img.offsetHeight - this.offsetHeight) * .5;
     this.img.style.visibility = 'visible';
    }
   }
  }
  /* ==== start script ==== */
  sP.resize();
  sP.run();
 },
 resize : function () {
  /* ==== window resize ==== */
  var o = sP.scr;
  sP.nw = o.offsetWidth;
  sP.nh = o.offsetHeight;
  sP.iw = sP.pan.offsetWidth;
  sP.ih = sP.pan.offsetHeight;
  for (sP.nx = 0, sP.ny = 0; o != null; o = o.offsetParent)
  {
   sP.nx += o.offsetLeft;
   sP.ny += o.offsetTop;
  }
  for (var i = 0, o; o = sP.R[i]; i++) o.resize();
 },
 /* ==== main loop ==== */
 run : function ()
 {
  /* ==== scroll main frame ==== */
  sP.cx += (((Math.max(-sP.nw, Math.min(0, (sP.nw * .5 - (xm - sP.nx) * 2))) * (sP.iw - sP.nw)) / sP.nw) - sP.cx) * .1;
  sP.cy += (((Math.max(-sP.nh, Math.min(0, (sP.nh * .5 - (ym - sP.ny) * 2))) * (sP.ih - sP.nh)) / sP.nh) - sP.cy) * .1;
  sP.pan.style.left = Math.round(sP.cx) + 'px';
  sP.pan.style.top  = Math.round(sP.cy) + 'px';
  /* ==== lissajou ==== */
  if(sP.O) {
   sP.O.c += .015;
   sP.O.img.style.left = Math.round(-sP.O.w + sP.O.w * Math.sin(sP.O.c * 1.1)) + 'px';
   sP.O.img.style.top  = Math.round(- sP.O.h + sP.O.h * Math.sin(sP.O.c)) + 'px';
   sP.O.l.style.left = Math.round(sP.O.x--) + 'px';
  }
  /* ==== up ==== */
  if (sP.Or)
  {
   sP.Or.p -= sP.Or.s;
   sP.Or.s *= 1.1;
   if (sP.Or.p < -sP.Or.offsetHeight)
   {
    sP.Or.p = -sP.Or.offsetHeight;
    sP.Or.s = 2;
    sP.Or.m = false;
    sP.Or = false;
   }
   sP.O.style.top = Math.round(sP.O.p) + 'px';
  }
  /* ==== down ==== */
  for (var i = 0, c; c = sP.C[i]; i++)
  {
   if (c != sP.Or)
   {
    c.p += c.s;
    c.s *= 1.2;
    if (c.p >= 0)
    {
     c.p = 0;
     c.s = 2;
     c.m = false;
     sP.C.splice(i, 1);
    }
    c.style.top = Math.round(c.p) + 'px';
   } else {
    c.s = 2;
    c.m = false;
    sP.C.splice(i, 1);
   }
  }
  setTimeout(sP.run, 16);
 }
}
/* ==== global mouse position ==== */
document.onmousemove = function(e)
{
 if (window.event) e = window.event;
 xm = e.clientX;
 ym = e.clientY;
 return false;
}
}
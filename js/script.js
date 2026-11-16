/* Balsam: mobile menu. */
var b=document.getElementById("bg"),m=document.getElementById("mn");
b.onclick=function(){var o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)};
m.onclick=function(e){if(e.target.closest("a")){m.classList.remove("open");b.setAttribute("aria-expanded","false")}};
/* if a photo is missing, show the branded placeholder instead of a broken image */
[].forEach.call(document.querySelectorAll(".ph img"),function(im){
  function miss(){im.parentNode.classList.add("empty")}
  if(im.complete&&im.naturalWidth===0)miss();else im.addEventListener("error",miss);
});

/* hero photo: fall back to the growth chart if the picture is missing */
(function(){var hp=document.querySelector(".hp");if(!hp)return;var box=hp.parentNode;
function miss(){box.classList.add("empty")}
function ok(){box.classList.add("has")}
if(hp.complete&&hp.naturalWidth>0)ok();else if(hp.complete)miss();else{hp.addEventListener("error",miss);hp.addEventListener("load",ok)}})();

/* highlight the menu link of the section you are viewing */
(function(){
  var links=[].slice.call(document.querySelectorAll("nav a:not(.btn)"));
  var items=links.map(function(a){return{a:a,s:document.querySelector(a.getAttribute("href"))}}).filter(function(x){return x.s});
  function spy(){
    var y=window.scrollY+120,cur=null;
    items.forEach(function(x){if(x.s.offsetTop<=y)cur=x});
    var ct=document.getElementById("contact");if(ct&&ct.offsetTop<=y)cur=null; /* contact band: no link active */
    links.forEach(function(a){a.classList.remove("on");a.removeAttribute("aria-current")});
    if(cur){cur.a.classList.add("on");cur.a.setAttribute("aria-current","true")}
  }
  window.addEventListener("scroll",spy,{passive:true});window.addEventListener("resize",spy);spy();
})();

/* menu highlights the section you are reading */
(function(){
  var links=[].slice.call(document.querySelectorAll("nav a:not(.btn)"));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute("href"))});
  var contact=document.getElementById("contact"),busy=false;
  function spy(){
    busy=false;
    var y=window.scrollY+130,cur=-1;
    secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
    if(contact&&contact.offsetTop<=y)cur=-1;
    links.forEach(function(a,i){
      a.classList.toggle("on",i===cur);
      if(i===cur)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll",function(){if(!busy){busy=true;requestAnimationFrame(spy)}},{passive:true});
  window.addEventListener("resize",spy);
  spy();
})();
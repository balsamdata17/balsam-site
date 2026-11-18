/* Balsam: mobile menu, hero photo fallback, menu highlight. */
var b=document.getElementById("bg"),m=document.getElementById("mn");
b.onclick=function(){var o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)};
m.onclick=function(e){if(e.target.closest("a")){m.classList.remove("open");b.setAttribute("aria-expanded","false")}};

/* hero photo: fall back to the growth chart if the picture is missing */
(function(){var hp=document.querySelector(".hp");if(!hp)return;var box=hp.parentNode;
function miss(){box.classList.add("empty")}
function ok(){box.classList.add("has")}
if(hp.complete&&hp.naturalWidth>0)ok();else if(hp.complete)miss();else{hp.addEventListener("error",miss);hp.addEventListener("load",ok)}})();

/* menu highlights the section you are reading (no link active in sections that are not in the menu) */
(function(){
  var links=[].slice.call(document.querySelectorAll("nav a:not(.btn)"));
  var secs=[].slice.call(document.querySelectorAll("main > section[id]"));
  var busy=false;
  function spy(){
    busy=false;
    var y=window.scrollY+130,cur=null;
    secs.forEach(function(s){if(s.offsetTop<=y)cur=s});
    links.forEach(function(a){
      var on=!!cur&&a.getAttribute("href")==="#"+cur.id;
      a.classList.toggle("on",on);
      if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll",function(){if(!busy){busy=true;requestAnimationFrame(spy)}},{passive:true});
  window.addEventListener("resize",spy);
  spy();
})();
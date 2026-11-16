/* Balsam: site script. Page switching, mobile menu, WhatsApp enquiry. */
(function(){
  "use strict";
  var WA="919790128152";
  var pages=[].slice.call(document.querySelectorAll("main > .page"));
  var navLinks=[].slice.call(document.querySelectorAll("nav a:not(.btn)"));
  var menu=document.getElementById("menu"),burger=document.getElementById("burger");
  var titles={
    home:"Business Growth Mentorship | Balsam Creative Technology",
    packages:"Packages | Balsam Creative Technology",
    process:"How It Works | Balsam Creative Technology",
    contact:"Contact | Balsam Creative Technology"
  };

  function closeMenu(){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}
  burger.addEventListener("click",function(){
    var open=menu.classList.toggle("open");
    burger.setAttribute("aria-expanded",open?"true":"false");
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu()});

  /* show only the chosen page */
  function show(id){
    if(!titles[id])id="home";
    pages.forEach(function(p){p.classList.toggle("active",p.id===id)});
    navLinks.forEach(function(a){
      var on=a.getAttribute("href")==="#"+id;
      a.classList.toggle("on",on);
      if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
    document.title=titles[id];
    window.scrollTo(0,0);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');
    if(!a)return;
    var id=a.getAttribute("href").slice(1);
    if(!titles[id])return;
    e.preventDefault();
    closeMenu();
    if(location.hash!=="#"+id)history.pushState(null,"","#"+id);
    show(id);
  });
  window.addEventListener("popstate",function(){show(location.hash.slice(1))});
  if("scrollRestoration" in history)history.scrollRestoration="manual";
  show(location.hash.slice(1));

  /* enquiry form: opens WhatsApp with a ready message */
  var form=document.getElementById("enq");
  function field(id){return document.getElementById(id)}
  function setErr(id,msg){
    field("e-"+id).textContent=msg;
    field("f-"+id).parentNode.classList.toggle("bad",!!msg);
  }
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var name=field("f-name").value.trim(),
        phone=field("f-phone").value.replace(/\D/g,"").replace(/^(91|0)(?=\d{10}$)/,""),
        biz=field("f-biz").value.trim(),ok=true;
    setErr("name",name.length<2?"Please enter your name.":"");
    setErr("phone",/^[6-9]\d{9}$/.test(phone)?"":"Enter a valid 10-digit mobile number.");
    setErr("biz",biz.length<10?"Please write a few words about your business.":"");
    if(name.length<2||!/^[6-9]\d{9}$/.test(phone)||biz.length<10)return;
    var text="Hello Balsam Creative Technology,\nMy name is "+name+".\nAbout my business: "+biz+"\nMy number: +91 "+phone;
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
  });
})();
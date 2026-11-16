/* AUREALE · video: scheda compatta, il video si apre grande a schermo solo al tocco */
(function(){
var links=[].slice.call(document.querySelectorAll("a.vtb[data-vid]"));
if(!links.length)return;
var modal,box,frame,close,opener;
function build(){
 modal=document.createElement("div");modal.className="vm";modal.hidden=true;
 modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-label","Video");
 modal.innerHTML='<div class="vmb"><button type="button" class="vmx" aria-label="Chiudi il video">&times;</button><div class="vmf"></div></div>';
 document.body.appendChild(modal);box=modal.querySelector(".vmb");frame=modal.querySelector(".vmf");close=modal.querySelector(".vmx");
 close.addEventListener("click",shut);
 modal.addEventListener("click",function(e){if(e.target===modal)shut()});
 document.addEventListener("keydown",function(e){if(!modal.hidden&&e.key==="Escape")shut()});
}
function open(a){
 if(!modal)build();
 opener=a;
 var r=a.getAttribute("data-ratio")||"9/16";
 box.style.setProperty("--vr",r);box.className="vmb "+(r==="9/16"?"v":"h");
 var f=document.createElement("iframe");
 f.src="https://www.youtube-nocookie.com/embed/"+a.getAttribute("data-vid")+"?autoplay=1&rel=0&playsinline=1";
 f.title=a.getAttribute("data-title")||"Video AUREALE";
 f.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture");
 f.setAttribute("referrerpolicy","strict-origin-when-cross-origin");f.setAttribute("allowfullscreen","");
 frame.innerHTML="";frame.appendChild(f);
 modal.hidden=false;document.documentElement.classList.add("vm-on");close.focus();
}
function shut(){
 frame.innerHTML="";modal.hidden=true;document.documentElement.classList.remove("vm-on");
 if(opener)opener.focus();
}
links.forEach(function(a){a.addEventListener("click",function(e){
 if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1)return;
 e.preventDefault();open(a);
})});
})();

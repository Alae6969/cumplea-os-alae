const screens = [...document.querySelectorAll(".screen")];
const hearts = document.getElementById("hearts");
const stars = document.getElementById("stars");
const matrix = document.getElementById("matrix");

function show(id){
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  if(target.classList.contains("scroll")) target.scrollTop = 0;
}

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.next));
});

document.getElementById("skip").onclick=()=>show("welcome");

document.getElementById("restart").onclick=()=>{
  document.getElementById("introText").textContent="HAPPY";
  document.getElementById("count").textContent="3";
  startIntro();
};

for(let i=0;i<140;i++){
  const s=document.createElement("span");
  s.className="star";
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  s.style.animationDelay=Math.random()*2+"s";
  stars.appendChild(s);
}

function makeHeart(){
  const h=document.createElement("span");
  h.className="float-heart";
  h.textContent=Math.random()>.5?"♥":"♡";
  h.style.left=Math.random()*100+"%";
  h.style.fontSize=(12+Math.random()*20)+"px";
  h.style.animationDuration=(5+Math.random()*4)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(makeHeart,700);

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ALAE♥";
function makeMatrix(){
  const col=document.createElement("div");
  col.className="matrix-col";
  let txt="";
  for(let i=0;i<45;i++) txt+=chars[Math.floor(Math.random()*chars.length)]+"\n";
  col.textContent=txt;
  col.style.left=Math.random()*100+"%";
  col.style.animationDuration=(3+Math.random()*4)+"s";
  matrix.appendChild(col);
  setTimeout(()=>col.remove(),8000);
}
setInterval(makeMatrix,120);

let introTimer;
function startIntro(){
  clearTimeout(introTimer);
  show("intro");
  const count=document.getElementById("count");
  const word=document.getElementById("introText");
  count.textContent="3"; word.textContent="HAPPY";

  setTimeout(()=>count.textContent="2",1000);
  setTimeout(()=>count.textContent="1",2000);
  setTimeout(()=>{count.textContent="";word.textContent="HAPPY"},3000);
  setTimeout(()=>word.textContent="BIRTHDAY",4300);
  setTimeout(()=>word.textContent="TO",5600);
  setTimeout(()=>word.textContent="ALAE",6900);
  setTimeout(()=>show("welcome"),8300);
}
startIntro();

document.querySelectorAll(".gallery figure").forEach(fig=>{
  fig.addEventListener("click",()=>{
    const img=fig.querySelector("img");
    document.getElementById("lightboxImg").src=img.src;
    document.getElementById("lightbox").classList.add("open");
  });
});
document.getElementById("closeLightbox").onclick=()=>{
  document.getElementById("lightbox").classList.remove("open");
};
document.getElementById("lightbox").onclick=(e)=>{
  if(e.target.id==="lightbox") e.currentTarget.classList.remove("open");
};

const modal=document.getElementById("modal");
document.getElementById("gift").onclick=()=>{
  modal.classList.add("open");
  for(let i=0;i<35;i++) setTimeout(makeHeart,i*25);
};
document.getElementById("closeModal").onclick=()=>modal.classList.remove("open");
modal.onclick=(e)=>{if(e.target===modal)modal.classList.remove("open")};
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    modal.classList.remove("open");
    document.getElementById("lightbox").classList.remove("open");
  }
});

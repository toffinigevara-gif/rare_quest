const seed=[
{title:"Падение",desc:"Обычный день может закончиться совсем необычным образом.",genre:"Психологический хоррор",duration:"35–45 минут",status:"Доступен"},
{title:"Поезд мёртвых",desc:"Поезд идёт дальше. Не все пассажиры живы.",genre:"Мистика",duration:"40 минут",status:"Доступен"},
{title:"Кто ты?",desc:"Иногда самый страшный вопрос — кто находится рядом.",genre:"Переписка с незнакомцем",duration:"30 минут",status:"Доступен"},
{title:"Поклонник",desc:"Когда чужое внимание становится слишком близким.",genre:"Реалистичная страшная история",duration:"45 минут",status:"Доступен"},
{title:"Последнее желание",desc:"У каждого желания есть цена.",genre:"Мистика",duration:"35 минут",status:"Доступен"},
{title:"Безликое Проклятие",desc:"Во дворце пробудилось нечто, что не должно иметь лица.",genre:"Детектив / мистика",duration:"50 минут",status:"Доступен"},
{title:"Сладость или Гадость?",desc:"Поиграем?",genre:"Интерактивная история",duration:"25 минут",status:"Доступен"}
];
let quests=JSON.parse(localStorage.getItem("rq_quests")||"null")||seed;
const grid=document.getElementById("questGrid"),count=document.getElementById("count");
function save(){localStorage.setItem("rq_quests",JSON.stringify(quests));render()}
function render(){let visible=quests.filter(q=>q.status!=="Скрыт");count.textContent=visible.length+" ИСТОРИЙ";grid.innerHTML=visible.map((q,i)=>`<article class="quest"><span class="num">0${i+1}</span><h3>${escapeHtml(q.title)}</h3><p>${escapeHtml(q.desc)}</p><div class="meta">${escapeHtml(q.genre||"Квест")} · ${escapeHtml(q.duration||"")}</div></article>`).join("");renderAdmin()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
const modal=document.getElementById("admin");document.getElementById("adminOpen").onclick=()=>modal.classList.remove("hidden");document.getElementById("adminClose").onclick=()=>modal.classList.add("hidden");
document.getElementById("questForm").onsubmit=e=>{e.preventDefault();quests.push({title:qtitle.value,desc:qdesc.value,genre:qgenre.value,duration:qduration.value,status:qstatus.value});e.target.reset();save()};
function renderAdmin(){const el=document.getElementById("adminList");if(!el)return;el.innerHTML=quests.map((q,i)=>`<div class="admin-row"><span>${escapeHtml(q.title)} · ${escapeHtml(q.status)}</span><button data-del="${i}">Удалить</button></div>`).join("");el.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{quests.splice(+b.dataset.del,1);save()})}
render();
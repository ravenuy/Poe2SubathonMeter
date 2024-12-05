const API_URL = "https://raw.githubusercontent.com/ravenuy/subsDpsMeter/refs/heads/main/data.json";

//wow colorurs
const gradients = [
  "linear-gradient(135deg, #C41E3A, #FF5B79)", //DK
  "linear-gradient(135deg, #A330C9, #7E5DBB)", // DH
  "linear-gradient(135deg, #FF7C0A, #FF9A36)", // DUDU
  "linear-gradient(135deg, #1E4D2B, #47B24F)", // Huntard (Hehe)
  "linear-gradient(135deg, #69CCF0, #2C88D1)", // mage 
  "linear-gradient(135deg, #F58CBA, #FF8DC7)", // paly
  "linear-gradient(135deg, #FFFFFF, #F4F4F4)", // priestge
  "linear-gradient(135deg, #FFF468, #D8B92A)", // rogue
  "linear-gradient(135deg, #0070DD, #33A8FF)", // shammy
  "linear-gradient(135deg, #8788EE, #5A55B3)", // lock
  "linear-gradient(135deg, #C79C6E, #B68C5B)"  // WARRIOR(GIGACHAD)
];


//generic function to shuffle an array, is for the colours
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
}

// do the stuff xdd
async function updateRanking() {
  try {
    
    const response = await fetch(API_URL);
    const data = await response.json();

    
    const totalSubs = data.reduce((acc, item) => acc + item.subsPerHour, 0);

    
    const rankingDiv = document.getElementById("ranking");

    
    rankingDiv.innerHTML = "";

    
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
      <span class="rank">RANK</span>
      <span class="name">NAME</span>
      <span class="subs">SUBS PER HOUR</span>
    `;
    rankingDiv.appendChild(header);

    
    shuffleArray(gradients);

    
    data.forEach((item, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      
      const percentage = (item.subsPerHour / totalSubs) * 100;

      
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.style.width = `${percentage}%`; 

      
      if (item.name === "CuteDog_") {        
        overlay.style.background = "linear-gradient(135deg, #00FF96, #00CC66)";
      } else {
        
        const randomGradient = gradients[index % gradients.length]; 
        overlay.style.background = randomGradient;
      }

      
      entryDiv.appendChild(overlay);

      
      if (item.name === "CuteDog_") {
        entryDiv.classList.add("glass-effect"); 
      }

      
      entryDiv.innerHTML += `
        <span class="rank">${index + 1}</span>
        <span class="name">${item.name}</span>
        <span class="subs">${item.subsPerHour}</span>
      `;

      
      rankingDiv.appendChild(entryDiv);
    });
  } catch (error) {
    console.error("Error fetching subscriber data:", error);
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = `<div class="entry">Unable to load rankings</div>`;
  }
}


updateRanking();
//update in case used in obs
setInterval(updateRanking, 60000);

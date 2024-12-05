const API_URL = "https://raw.githubusercontent.com/ravenuy/subsDpsMeter/refs/heads/main/data.json";

//wow colorurs
const gradients = [
  "linear-gradient(135deg, #C41E3A, #FF5B79)", //DK
  "linear-gradient(135deg, #A330C9, #7E5DBB)", // DH
  "linear-gradient(135deg, #FF7C0A, #FF9A36)", // DUDU
  "linear-gradient(135deg, #1E4D2B, #47B24F)", // Huntard (Hehe)
  "linear-gradient(135deg, #00FF96, #00CC66)", // monk
  "linear-gradient(135deg, #F58CBA, #FF8DC7)", // paly
  "linear-gradient(135deg, #FFFFFF, #F4F4F4)", // priestge
  "linear-gradient(135deg, #FFF468, #D8B92A)", // rogue
  "linear-gradient(135deg, #0070DD, #33A8FF)", // shammy
  "linear-gradient(135deg, #8788EE, #5A55B3)", // lock
  "linear-gradient(135deg, #C79C6E, #B68C5B)"  // WARRIOR(GIGACHAD)  
];

//emoteges
const goodEmotes = [
  "01HPRH2DT00000X4ZG70YHEZHT", // INSANE
  "01F12P9KYG0009V7MP006J8KRF", // OhShit
  "01GFW1BAK80001VXKTCH0VEANC", // HOLY
  "01J5PXJXQG000CDPBQWFAR9ZR4", // WAHOO
  "01HAGQA0VR000CK4GBCA21BZ37", // CutePog
  "01HB7ZMVZR00072K8QAE93K1NP" // 83
];

const badEmotes = [
  "01F777ZCRG0005BGS0Y3M78DZW", // ThisIsFine
  "01F93Q2KQG00097B7MSQRESTYR", // FeelsWeakMan
  "01GA9PTTXG0008XHFRJVH0QGND", // Panic
  "01HAZXC0D0000EY75ATHMFBEV2", // Sadgies
  "01F12PG1100009V7MP006J8KRJ", // GoodMeme
  "01HJVX5W80000DCWCHPMG37J4A" // mfwMF
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
    const randomGoodEmoteIndex = Math.floor(Math.random() * goodEmotes.length);
    const goodRandomEmoteUrl = `https://cdn.7tv.app/emote/${goodEmotes[randomGoodEmoteIndex]}/3x.webp`;
    const randomBadEmoteIndex = Math.floor(Math.random() * badEmotes.length);
    const badRandomEmoteUrl = `https://cdn.7tv.app/emote/${badEmotes[randomBadEmoteIndex]}/3x.webp`;

    
    data.sort((a, b) => b.subs - a.subs);

   
    let naSubs = 0;
    let euSubs = 0;
    let nzSubs = 0;

    
    data.forEach(item => {
      if (item.country === "NA") {
        naSubs += item.subs;
      } else if (item.country === "EU") {
        euSubs += item.subs;
      } else if (item.country === "NZ") {
        nzSubs += item.subs;
      }
    });

 
    let winningCountry = "";
    let maxSubs = Math.max(naSubs, euSubs, nzSubs);

    if (maxSubs === naSubs) {
      winningCountry = "NA";
    } else if (maxSubs === euSubs) {
      winningCountry = "EU";
    } else if (maxSubs === nzSubs) {
      winningCountry = "NZ";
    }

   
    const winningHeader = document.querySelector(".winning");
    if(winningCountry !== "NA"){
      winningHeader.innerHTML = `${winningCountry} IS WINNING <img src="${badRandomEmoteUrl}" alt="Emote" style="vertical-align: middle;">`;
    }else{
      winningHeader.innerHTML = `${winningCountry} IS WINNING <img src="${goodRandomEmoteUrl}" alt="Emote" style="vertical-align: middle;">`;
    }
    

   
    const totalSubs = data.reduce((acc, item) => acc + item.subs, 0);
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = "";

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
      <span class="name">NAME</span>
      <span class="subs">SUBS</span>
    `;
    rankingDiv.appendChild(header);

    shuffleArray(gradients);

    data.forEach((item, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      const percentage = (item.subs / totalSubs) * 100;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.style.width = `${percentage}%`;

      if (item.name === "CuteDog_") {
        overlay.style.background = "linear-gradient(135deg, #69CCF0, #2C88D1)"; // blue color for CuteDog_
      } else {
        const randomGradient = gradients[index % gradients.length];
        overlay.style.background = randomGradient;
      }

      entryDiv.appendChild(overlay);

      if (item.name === "CuteDog_") {
        entryDiv.classList.add("glass-effect");
      }

      const flagImg = document.createElement("img");
      if (item.country === "NA") {
        flagImg.src = "https://flagcdn.com/w320/us.png";
        flagImg.alt = "NA Flag";
        flagImg.classList.add("flag");
      } else if (item.country === "EU") {
        flagImg.src = "https://flagcdn.com/w320/eu.png";
        flagImg.alt = "EU Flag";
        flagImg.classList.add("flag");
      } else if (item.country === "NZ") {
        flagImg.src = "https://flagcdn.com/w320/nz.png";
        flagImg.alt = "NZ Flag";
        flagImg.classList.add("flag");
      }

      entryDiv.appendChild(flagImg);
      entryDiv.innerHTML += `
        <span class="name">${item.name}</span>
        <span class="subs">${item.subs}</span>
      `;

      rankingDiv.appendChild(entryDiv);
    });
  } catch (error) {
    console.error("Error fetching the data:", error);
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = `<div class="entry">Unable to load rankings</div>`;
  }
}

updateRanking();
setInterval(updateRanking, 60000);
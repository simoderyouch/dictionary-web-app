const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})

const dropMenu = document.querySelector(".drop-menu-btn");
const option = document.querySelector("#option");
const result = document.querySelector(".result");
const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
let currentValue = "";
let data;
let err;

dropMenu.addEventListener("click", () => {
    option.classList.toggle("show");
})

Array.from(option.children).forEach(el => {
    el.addEventListener("click", () => {

        dropMenu.firstElementChild.innerHTML = el.className;
        Array.from(option.children).forEach(el => {
            dropMenu.firstElementChild.classList.remove(el.className)
            document.body.classList.remove(el.className)
        })

        dropMenu.firstElementChild.classList.add(el.className)
        document.body.classList.add(el.className)
        search.className = el.className;
    })
});

async function getData(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        data = await response.json();
        err = response.status;

    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener('click', async function (event) {
    event.preventDefault();

    currentValue = search.value;


    search.value = currentValue;

    const data = await getData(currentValue);
    if (err === 200) {
        loadData(data);
    } else {
        errorMessage(data)
    }
});


function loadData() {
    resultHeader()
    phonetics()
    secondSection()
    footer()
}
function resultHeader() {
    const word = data[0].word;
    let audioSrc = null;


    for (let i = 0; i < data[0].phonetics.length; i++) {

        if (audioSrc == null && data[0].phonetics[i].audio !== '') {
            audioSrc = data[0].phonetics[i].audio;
        }
    }

    const headerRes = `
    <div class="result-header">
      <h1>${word}</h1>
      <button class="play" onclick="playAudio('${audioSrc}');">
        <img src="./assets/images/icon-play.svg" alt="">
      </button>
    </div>
    
    `;
    result.innerHTML = headerRes;
}
function playAudio(audioSrc) {
    if (audioSrc !== null) {
        const audio = new Audio(audioSrc);
        audio.play();
    }
}

function phonetics() {
    const phonetic = document.createElement("div");
    phonetic.className = "phonetic";
    for (let i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i].text == null) {
            continue;
        } else {
            let p = document.createElement("p");
            p.innerHTML = data[0].phonetics[i].text;
            phonetic.appendChild(p);
        }
    }

    result.appendChild(phonetic);
}


function secondSection() {
    const meanings = document.createElement("div");
    meanings.className = "meanings";
    for (let i = 0; i < data[0].meanings.length; i++) {
        const partOfSpeech = document.createElement("div");
        partOfSpeech.className = "partOfSpeech";
        const Head = document.createElement("div");
        Head.className = "head"
        const br = document.createElement("div");
        br.className = "br";
        let part = document.createElement("h1");
        part.innerHTML = data[0].meanings[i].partOfSpeech;

        let H2 = document.createElement("h1");
        H2.innerHTML = "Meaning";
        Head.appendChild(part)
        Head.appendChild(br)
        partOfSpeech.appendChild(Head)
        partOfSpeech.appendChild(H2)
        let ul = document.createElement("ul");
        for (let j = 0; j < data[0].meanings[i].definitions.length; j++) {
            let li = document.createElement("li");
            let text = document.createElement("p");
            text.innerHTML = data[0].meanings[i].definitions[j].definition;

            li.appendChild(text)
            if (data[0].meanings[i].definitions[j].example != null) {
                let liEx = document.createElement("p");
                liEx.innerHTML = `"${data[0].meanings[i].definitions[j].example}"`;

                text.appendChild(liEx)
            }
            ul.appendChild(li)
        }
        partOfSpeech.appendChild(ul)






        if (data[0].meanings[i].synonyms.length > 0) {
            let div = document.createElement("div");
            div.className = "synonyms"

            let H3 = document.createElement("h1");
            H3.innerHTML = "Synonyms"
            div.appendChild(H3)


            let H4 = document.createElement("h4");
            H4.innerHTML = data[0].meanings[i].synonyms.join(' ')
            div.appendChild(H4)
            partOfSpeech.appendChild(div)
        }







        meanings.appendChild(partOfSpeech)
    }
    result.appendChild(meanings);
}

function footer() {
    let H2 = document.createElement("h1");
    H2.innerHTML = "Source";
    const br = document.createElement("div");
    br.className = "br";

    const fot = document.createElement("div");
    fot.className = "footer";
    const footer = document.createElement("div");
    footer.className = "footerSection";
    result.appendChild(br)
    footer.appendChild(H2)

    for (let j = 0; j < data[0].sourceUrls.length; j++) {
        if (data[0].sourceUrls.length > 0) {
            let link = document.createElement("div");
            link.className = "link";
            let source = document.createElement("a");
            source.innerHTML = data[0].sourceUrls[j]
            source.href = data[0].sourceUrls[j]
            const newWindow = `
            
              <button class="newWindow" onclick="window.open('${data[0].sourceUrls[j]}')">
                <img src="./assets/images/icon-new-window.svg" alt="">
              </button>
           
            
            `;
            link.appendChild(source)
            link.innerHTML = link.innerHTML + newWindow
            fot.appendChild(link)
        }

    }
    footer.appendChild(fot)
    result.appendChild(footer)
}

function errorMessage() {
    const err = `
    <main class="error">
    
    <img src="./assets/images/error.svg" alt="">
    <h5 >${data.title}</h5>
    <p >${data.message} ${data.resolution} </p>
   
      </main>`

    result.innerHTML = err;
}
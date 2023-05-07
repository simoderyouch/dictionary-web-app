import { useState, useRef } from "react";
function Result({ data }) {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState(null);

  const phonetics = data[0].phonetics || [];
  const meanings = data[0].meanings || [];
  const sourceUrls = data[0].sourceUrls || [];
  const firstNonEmptyAudio = phonetics.find(
    (phonetic) => phonetic.audio !== ""
  );

  if (audioSrc === null && firstNonEmptyAudio) {
    setAudioSrc(firstNonEmptyAudio.audio);
  }
  const handleAudio = () => {
    audioRef.current.play();
  };
  return (
    <div className="result">
      <div className="result-header">
        <h1>{data[0].word}</h1>
        <button className="play" onClick={handleAudio}>
          <img src="./assets/images/icon-play.svg" alt="" />
          {audioSrc && <audio src={audioSrc} ref={audioRef} />}
        </button>
      </div>
      <div className="phonetic">
        {phonetics &&
          phonetics.map((phonetic, i) => {
            return <p key={i}>{phonetic.text}</p>;
          })}
      </div>
      <div className="meanings">
        {meanings.map((meaning, i) => {
          return (
            <div key={i} className="partOfSpeech">
              <div className="head">
                <h1>{meaning.partOfSpeech}</h1>
                <div className="br" />
              </div>
              <h1>Meaning</h1>
              <ul>
                {meaning.definitions.map((definition, i) => {
                  return (
                    <li key={i}>
                      <p>
                        {definition.definition}
                        {definition.example && <span>{definition.example}</span>}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {meaning.synonyms.length > 0 ? (
                <div className="synonyms">
                  <h1>Synonyms</h1>
                  <h4>{meaning.synonyms.join(" ")}</h4>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <div className="br" />
      <div className="footerSection">
        <h1>Source</h1>
        <div className="footer">
          {sourceUrls.map((url, i) => {
           return   <div key={i} className="link">
              <a href={url}>
               {url}
              </a>
              <a
                className="newWindow"
                href={url}
                target="_blank"
              >
                <img src="./assets/images/icon-new-window.svg" alt="" />
              </a>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
export default Result;

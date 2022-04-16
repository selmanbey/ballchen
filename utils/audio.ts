export const playStart = () => {
  new Audio("click.wav").play();
};

export const playFriendGain = () => {
  new Audio("success.wav").play();
};

export const playDeath = () => {
  new Audio("epic.wav").play();
};

export const playPop = () => {
  new Audio("pop.wav").play();
};

export const getThemeAudio = async () => {
  // Loop-ready theme audio setup
  const themeAudioCtx = new AudioContext();
  let themeAudioData: AudioBuffer;
  let themeSourceNode: AudioBufferSourceNode;

  // Sets up a new source node as needed as stopping will render current invalid
  const setLoop = (aBuffer: AudioBuffer) => {
    if (!themeAudioData) themeAudioData = aBuffer; // create a reference for control buttons
    themeSourceNode = themeAudioCtx.createBufferSource(); // create audio source
    themeSourceNode.buffer = aBuffer; // use decoded buffer
    themeSourceNode.connect(themeAudioCtx.destination); // create output
    themeSourceNode.loop = true; // takes care of perfect looping
    return themeSourceNode;
  };

  // Load some audio (CORS need to be allowed or we won't be able to decode the data)
  await fetch("war-percs.wav", { mode: "cors" })
    .then((resp) => resp.arrayBuffer())
    .then((buffer: ArrayBuffer) =>
      themeAudioCtx.decodeAudioData(buffer, setLoop)
    );

  return setLoop(themeAudioData);
};

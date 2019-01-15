const sundtrack = {
    create : function(url, loop = false, muted = true) {
      let audio = new Audio();
      audio.id = 'soundtrack';
      audio.src = `static/media-files/sound/${url}`;
      audio.style.display = 'none'; //added to fix ios issue
      audio.autoplay = true;
      audio.loop = loop;
      audio.muted = muted;
      document.getElementById('container').appendChild(audio);
      audio.onended = () => {
        audio.remove(); 
      };
      audio.pause();
    },    
    play : function() {
      const audio = document.getElementById('soundtrack');
      audio.load();
    },
    change : function(url) {
      const audio = document.getElementById('soundtrack');
      audio.src = `static/media-files/sound/${url}`;
    }
}

export default sundtrack;

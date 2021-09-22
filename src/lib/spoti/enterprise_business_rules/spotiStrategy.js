const apiController = (function () {
  const clientId = "";
  const clientSecret = "";

  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content.Type": " application/x-www-form-urlencoded",
        Authorization: "Basic" + btoa(clientId + " " + clientSecret),
      },
      body: "grant_type-client_credentials",
    });
    const data = await result.json();
    return data.access_token;
  };

  const _getGen = async (token) => {
    const result = await fetch(
      "https://api.spotify.com/v1/browse/categories?locale=sv_US",
      {
        method: "Get",
        headers: { " Authorization": " Bearer" + token },
      }
    );
    const data = await result.json();
    return data.categories.items;
  };

  const _getPlayListByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "Get",
        headers: { " Authorization": " Bearer" + token },
      }
    );
    const data = await result.json();
    return data.playlists.items;
  };

  const _getTracks = async (token, trackEndPoint) => {
    const limit = 10;
    const result = await fetch(`${trackEndPoint}?limit=${limit}`, {
      method: "Get",
      headers: { " Authorization": " Bearer" + token },
    });
    const data = await result.json();
    return data.items;
  };

  const _getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "Get",
      headers: { " Authorization": " Bearer" + token },
    });
    const data = await result.json();
    return data;
  };
  return {
    _getToken() {
      return _getToken;
    },
    _getGen(token) {
      return _getGen(token);    },
    _getPlayListByGenre(token, genreId) {
      return _getPlayListByGenre(token, genreId);
    },
    _getTracks(token, trackEndPoint) {      return _getTracks(token, trackEndPoint);
    },
    _getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    },
  };
})();

const UiController = (function () {
  const DOMElements = {
    genre: "#genre",
    playlist: "#playlist",
    submit: "#submit",
    divSongDetail: "#song-detail",
    hfToken: "#hidden_token",
    divSongList: ".song-list",
  };

  return {
    inputField() {
      return {
        genre: document.querySelector(DOMElements.genre),
        playlist: document.querySelector(DOMElements.playlist),
        divSongList: document.querySelector(DOMElements.divSongList),
        submit: document.querySelector(DOMElements.submit),
        songDetail: document.querySelector(DOMElements.divSongDetail),
      };
    },
    createGenre(text, value) {
      const html = `<option value="${value}"> ${text}</option>`;
      document
        .querySelector(DOMElements.genre)
        ?.insertAdjacentElement("beforeend", html);
    },
    createPlayList(text, value) {
      const html = `<option value="${value}"> ${text}</option>`;
      document
        .querySelector(DOMElements.playlist)
        ?.insertAdjacentElement("beforeend", html);
    },
    createTrack(id, name) {
      const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}"> ${name}</a>`;
      document
        .querySelector(DOMElements.divSongList)
        ?.insertAdjacentElement("beforeend", html);
    },
    createSongDetail(img, title, artist) {
      const detailDiv = document.querySelector(DOMElements.divSongDetail);
      detailDiv.innerHTML = "";

      const html = `
              <div class= "row col-sm-12 px-0"> 
                  <img src="${img}" alt= "">
              </div>
              <div class= "row col-sm-12 px-0"> 
                  <label for="genre" class= "form-label col-sm-12">${title}:</label>
              </div>
              <div class= "row col-sm-12 px-0"> 
              <label for="artist" class= "form-label col-sm-12">${artist}</label>
              </div>
              `;

      detailDiv.insertAdjacentElement("beforeend", html);
    },
    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = "";
    },
    resetTracks() {
      this.inputField().divSongList.innerHTML = "";
      this.resetTrackDetail();
    },
    resetPlayList() {
      this, (this.inputField.playlist.innerHTML = "");
      this.resetTracks();
    },
  };
})();

const APPCOntroller = (function (UIctrl, APICtrl) {
  const DOMInputs = UIctrl.inputField();
  const loadGenres = async () => {
    const token = await APICtrl._getToken();
    const genres = await APICtrl._getGen(token);
    genres.forEach((element) => UIctrl.createGenre(element.name, element.id));
  };

  DOMInputs.genre.addEvenListener("change", async () => {
    UIctrl.resetPlayList();
    const token = UIctrl.getStoredToken().token;
    const genre = UIctrl.inputField().genre;
    const genreId = genre.options[genre.selectedIndex].value;
    const playlist = await APICtrl._getPlayListByGenre(token, genreId);
    console.log(playlist);
  });

  DOMInputs.submit.addEvenListener("click", async (e) => {
    e.preventDefault();
    UIctrl.resetTracks();
    const token = UIctrl.getStoredToken().token;
    const playlist = UIctrl.inputField().playlist;
    const trackEndPoint = playlist.options[playlist.selectedIndex].value;
    const tracks = await APICtrl._getTracks(token, trackEndPoint);
    tracks.array.forEach((t) => UIctrl.createTrack(t.track.href, t.track.name));
  });
  DOMInputs.tarcks.addEvenListener("click", async (e) => {
    e.preventDefault();
    UIctrl.resetTrackDetail();
    const token = UIctrl.getStoredToken().token;
    const trackEndPoint = e.target.id;
    const track = await APICtrl._getTracks(token, trackEndPoint);
    UIctrl.createSongDetail(
      track.album.images[2].url,
      track.name,
      track.artists[0].name
    );
  });

  return {
    init() {
      console.log("App is starting");
      loadGenres();
    },
  };
})(UiController, apiController, APPCOntroller);

apiController.init();
APPCOntroller.init();

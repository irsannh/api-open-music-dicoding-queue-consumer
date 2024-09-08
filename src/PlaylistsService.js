const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const playlistQuery = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const songsQuery = {
      text: 'SELECT A.id, A.title, A.performer FROM songs A JOIN playlist_songs B ON A.id = B.song_id WHERE B.playlist_id = $1',
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(playlistQuery);
    const songsResult = await this._pool.query(songsQuery);

    return { playlist: { ...playlistResult.rows[0], songs: songsResult.rows } };
  }
}

module.exports = PlaylistsService;

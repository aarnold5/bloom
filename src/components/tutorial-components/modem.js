/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react/cjs/react.production.min';
import { enableAllPlugins, produce } from 'immer';
// import { Firestore } from 'firebase/firestore';
import * as db from '../../services/firestore';

enableAllPlugins();
class Modem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveness: false,
      energy: false,
      valence: false,
      instrumentalness: false,
      acousticness: false,
      danceability: false,
      tempo: false,
      mode: false,
      key: false,
      pop: false,
    };

    this.handleCheckLiveness = this.handleCheckLiveness.bind(this);
    this.handleCheckEnergy = this.handleCheckEnergy.bind(this);
    this.handleCheckHappiness = this.handleCheckHappiness.bind(this);
    this.handleCheckInstrumentalness = this.handleCheckInstrumentalness.bind(this);
    this.handleCheckAcousticness = this.handleCheckAcousticness.bind(this);
    this.handleCheckDanceability = this.handleCheckDanceability.bind(this);
    this.handleCheckTempo = this.handleCheckTempo.bind(this);
    this.handleCheckMode = this.handleCheckMode.bind(this);
    this.handleCheckKey = this.handleCheckKey.bind(this);
    this.handleCheckPop = this.handleCheckPop.bind(this);
    this.handleCheckSubmit = this.handleCheckSubmit.bind(this);
  }

  handleCheckLiveness = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.liveness = !ds.liveness;
      }),
    );
  };

  handleCheckEnergy = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.energy = !ds.energy;
      }),
    );
  };

  handleCheckHappiness = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.valence = !ds.valence;
      }),
    );
  };

  handleCheckInstrumentalness = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.instrumentalness = !ds.instrumentalness;
      }),
    );
  };

  handleCheckAcousticness = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.acousticness = !ds.acousticness;
      }),
    );
  };

  handleCheckDanceability = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.danceability = !ds.danceability;
      }),
    );
  };

  handleCheckTempo = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.tempo = !ds.tempo;
      }),
    );
  };

  handleCheckMode = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.mode = !ds.mode;
      }),
    );
  };

  handleCheckKey = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.key = !ds.key;
      }),
    );
  };

  handleCheckPop = () => {
    this.setState(
      produce((draftState) => {
        const ds = draftState;
        ds.pop = !ds.pop;
      }),
    );
  };

  handleCheckSubmit = () => {
    const vals = Object.values(this.state);
    const keys = Object.keys(this.state);
    const arr = [];
    for (const key in keys) {
      if (vals[key]) {
        arr.push(keys[key]);
      }
    }

    localStorage.setItem('modalVals', arr.join());
    console.log(this.props);
    db.changeAttr(this.props.tree, this.props.tree.id, this.props.song.id, `${arr.join()}`); // tree, path, songID, attr

    const checkboxes = document.getElementsByName('interest');
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }

    this.setState({
      liveness: false,
      energy: false,
      valence: false,
      instrumentalness: false,
      acousticness: false,
      danceability: false,
      tempo: false,
      mode: false,
      key: false,
      pop: false,
    });
    // console.log(Object.keys(this.state));
    // const state = Object.keys(this.state).filter((key) => this.state.key);
    // console.log(state.join());
  };

  render() {
    const inputStyle = {
      background: 'gray',
      width: '150px',
      height: '200px',
      position: 'absolute',
      top: '55px',
      borderRadius: '4px',
      padding: '8px',
      zIndex: '6',
    };
    return (
      <div id="modem" style={inputStyle}>
        <img src={this.props.song.album_cover} alt="" className="modalAlbumCover" />
        name:{this.props.song.name} <br />
        {/* artist:{this.props.song.artist}  <br />
        genres:{this.props.song.genres.join()}  <br /> */}
        set attribute:
        <div id="modemCheckboxes">
          {/* <button id="tempo" type="button" onClick={this.props.clickfunc3} className="mbuttons" style={{ zIndex: '8' }}> tempo </button>
          <button type="button" className="mbuttons"> mood </button>
          <button type="button" className="mbuttons"> key </button>
    <button type="button" className="mbuttons"> dancebility </button> */}
          <form className="modalForm">
            <fieldset className="fields">
              <h2>Choose Attributes</h2>
              <div>
                <input type="checkbox" id="coding" name="interest" onChange={this.handleCheckLiveness} value={this.state.liveness} />
                <label htmlFor="coding">Liveness</label>
              </div>
              <div>
                <input type="checkbox" id="music" name="interest" onChange={this.handleCheckEnergy} value={this.state.energy} />
                <label htmlFor="music">Energy</label>
              </div>
              <div>
                <input type="checkbox" id="art" name="interest" onChange={this.handleCheckHappiness} value={this.state.valence} />
                <label htmlFor="art">Happiness</label>
              </div>
              <div>
                <input type="checkbox" id="coding" name="interest" onChange={this.handleCheckInstrumentalness} value={this.state.instrumentalness} />
                <label htmlFor="coding">Instrumentalness</label>
              </div>
              <div>
                <input type="checkbox" id="music" name="interest" onChange={this.handleCheckAcousticness} value={this.state.acousticness} />
                <label htmlFor="music">Acousticness</label>
              </div>
              <div>
                <input type="checkbox" id="art" name="interest" onChange={this.handleCheckDanceability} value={this.state.danceability} />
                <label htmlFor="art">Danceability</label>
              </div>
              <div>
                <input type="checkbox" id="coding" name="interest" onChange={this.handleCheckTempo} value={this.state.tempo} />
                <label htmlFor="coding">Tempo</label>
              </div>
              <div>
                <input type="checkbox" id="music" name="interest" onChange={this.handleCheckMode} value={this.state.mode} />
                <label htmlFor="music">Mode</label>
              </div>
              <div>
                <input type="checkbox" id="art" name="interest" onChange={this.handleCheckKey} value={this.state.key} />
                <label htmlFor="art">Key</label>
              </div>
              <div>
                <input type="checkbox" id="art" name="interest" onChange={this.handleCheckPop} value={this.state.pop} />
                <label htmlFor="art">Popularity</label>
              </div>
            </fieldset>
          </form>
          <button type="button" onClick={() => this.handleCheckSubmit()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Modem;
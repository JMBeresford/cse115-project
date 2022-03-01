import Experience from '..';
// Import image paths
import hazeImg from '../../img/labelImages/haze.jpeg';
import primaryImg from '../../img/labelImages/primary.jpeg';
import agricultureImg from '../../img/labelImages/agriculture.jpeg';
import clearImg from '../../img/labelImages/clear.jpeg';
import waterImg from '../../img/labelImages/water.jpeg';
import habitationImg from '../../img/labelImages/habitation.jpeg';
import roadImg from '../../img/labelImages/road.jpeg';
import cultivationImg from '../../img/labelImages/cultivation.jpeg';
import slashBurnImg from '../../img/labelImages/slash_burn.jpeg';
import cloudyImg from '../../img/labelImages/cloudy.jpeg';
import partlyCloudyImg from '../../img/labelImages/partly_cloudy.jpeg';
import conventionalMineImg from '../../img/labelImages/conventional_mine.jpeg';
import bareGroundImg from '../../img/labelImages/bare_ground.jpeg';
import artisinalMineImg from '../../img/labelImages/artisinal_mine.jpeg';
import bloomingImg from '../../img/labelImages/blooming.jpeg';
import selectiveLoggingImg from '../../img/labelImages/selective_logging.jpeg';
import blowDownImg from '../../img/labelImages/blow_down.jpeg';

export default class LabelState {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;

    this.labels = {
      haze: {
        description: 'This is the description for the haze label.',
        natural: true,
        url: hazeImg,
      },
      primary: {
        description: 'This is the description for the primary label.',
        natural: true,
        url: primaryImg,
      },
      agriculture: {
        description: 'This is the description for the agriculture label.',
        natural: false,
        url: agricultureImg,
      },
      clear: {
        description: 'This is the description for the clear label.',
        natural: true,
        url: clearImg,
      },
      water: {
        description: 'This is the description for the water label.',
        natural: true,
        url: waterImg,
      },
      habitation: {
        description: 'This is the description for the habitation label.',
        natural: false,
        url: habitationImg,
      },
      road: {
        description: 'This is the description for the road label.',
        natural: false,
        url: roadImg,
      },
      cultivation: {
        description: 'This is the description for the cultivation label.',
        natural: false,
        url: cultivationImg,
      },
      slash_burn: {
        description: 'This is the description for the slash burn label.',
        natural: false,
        url: slashBurnImg,
      },
      cloudy: {
        description: 'This is the description for the cloudy label.',
        natural: true,
        url: cloudyImg,
      },
      partly_cloudy: {
        description: 'This is the description for the partly cloudy label.',
        natural: true,
        url: partlyCloudyImg,
      },
      conventional_mine: {
        description: 'This is the description for the conventional mine label.',
        natural: false,
        url: conventionalMineImg,
      },
      bare_ground: {
        description: 'This is the description for the bare ground label.',
        natural: true,
        url: bareGroundImg,
      },
      artisinal_mine: {
        description: 'This is the description for the artisinal mine label.',
        natural: false,
        url: artisinalMineImg,
      },
      blooming: {
        description: 'This is the description for the blooming label.',
        natural: true,
        url: bloomingImg,
      },
      selective_logging: {
        description: 'This is the description for the selective logging label.',
        natural: false,
        url: selectiveLoggingImg,
      },
      blow_down: {
        description: 'This is the description for the blow down label.',
        natural: true,
        url: blowDownImg,
      },
    };

    this.labelList = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

    this.setDomElements();
    this.setEventHandlers();
    this.initializeImages();
  }

  setDomElements() {
    let currDomElements = this.state.domElements;

    this.state.domElements = {
      ...currDomElements,
      backdrop: document.getElementById('backdrop'),
      // labelListNode: document.getElementById('labelList'),
      infoPage: document.getElementById('infoPage'),
      closeBtn: document.querySelector('.closeBtn'),
      // tileLabel: document.querySelector('.tileLabel'),
      layeredImgs: document.getElementById('layeredImgs'),
      // tileLabelWrapper: document.querySelector('.tileLabelWrapper'),
      // labelImg: document.getElementById('labelImage'),
      // updateButton: document.getElementById('updateLabelsBtn'),
      labelInfo: document.getElementById('labelInfo'),
      labelName: document.getElementById('labelName'),
      labelDescr: document.getElementById('labelDescr'),
    };
  }

  setEventHandlers() {
    // Event Handler for update button
    // this.state.domElements.updateButton.onclick = () => {
    //   this.state.trigger('labelsUpdated');
    // };
    // this.state.on('labelsUpdated', () => {
    //   this.updateLabel();
    // });

    // Event Handler for clicking on close button
    this.state.domElements.closeBtn.onclick = () => {
      this.state.trigger('doneInvestigating');
    };
    this.state.on('doneInvestigating', () => {
      this.state.viewState.back();
    });

    // Event Handler for handling state change
    this.state.on('viewchange', () => {
      let view = this.state.viewState.getView();

      if (view === 'investigate') {
        // Update the label
        let element = this.state.cursorState.getIntersection();
        this.updateLabel(element);
        // Set the state
        this.state.domElements.backdrop.classList.add('in');
        this.state.domElements.infoPage.classList.add('in');
      } else {
        this.state.domElements.backdrop.classList.remove('in');
        this.state.domElements.infoPage.classList.remove('in');
      }
    });
  }

  updateLabel(label) {
    // Grab the click element (likely from a state grab)
    // For now, use a random label
    // let keys = Object.keys(this.labels);
    // let label = keys[(keys.length * Math.random()) << 0];

    // let labelListNode = this.state.domElements.labelListNode;
    let labelInfo = this.state.domElements.labelInfo;
    let labelName = this.state.domElements.labelName;
    let labelDescr = this.state.domElements.labelDescr;
    // let tileLabel = this.state.domElements.tileLabel;
    let layeredImgs = this.state.domElements.layeredImgs;
    let formattedLabel = label.replaceAll('_', ' ');
    let labelObj = this.labels[label];

    // Update label list in Explore view
    // labelListNode.innerHTML = `<p>${formattedLabel}</p>`;

    // Update Information Page
    labelName.innerHTML = formattedLabel;
    labelDescr.innerHTML = labelObj.description;
    // tileLabel.innerHTML = `<h1>${formattedLabel}</h1>
    // <p>${labelObj.description}</p>`;

    // Remove any visible images
    for (let child of layeredImgs.childNodes) {
      if (child.classList.contains('in')) {
        child.classList.remove('in');
      }
    }

    // Add desired image
    document.getElementById(`${label}Img`).classList.add('in');

    // Check if label is natural and update class
    if (labelObj.natural) {
      labelInfo.classList.add('natural');
      // tileLabel.classList.add('natural');
    } else {
      labelInfo.classList.remove('natural');
      // tileLabel.classList.remove('natural');
    }
  }

  initializeImages() {
    for (const label of Object.keys(this.labels)) {
      var labelObj = this.labels[label];
      var img = document.createElement('img');
      img.id = `${label}Img`;
      img.src = labelObj.url;
      img.alt = `Image of ${label}`;
      img.classList.add('labelImage');
      this.state.domElements.layeredImgs.appendChild(img);
    }
  }
}

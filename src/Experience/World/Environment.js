import { DirectionalLight, sRGBEncoding, Color } from 'three';
import Experience from '..';

const col = new Color('#454944');

export default class Environment {
  constructor() {
    // grab singleton class instance
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    if (this.experience.debug.active) {
      this.debugFolder = this.experience.debug.pane.addFolder({
        title: 'World',
        expanded: false,
      });

      this.debugParams = {
        sky: { r: col.r * 255, g: col.g * 255, b: col.b * 255 },
      };

      this.debugFolder
        .addInput(this.debugParams, 'sky', { picker: 'inline' })
        .on('change', (e) => {
          col.setRGB(e.value.r / 255, e.value.g / 255, e.value.b / 255);

          this.experience.renderer.instance.setClearColor(col, 1);
        });
    }

    return this;
  }

  setSun() {
    this.sun = new DirectionalLight('#ffffff', 4);
    this.sun.castShadow = true;
    this.sun.shadow.camera.far = 200;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.normalBias = 0.05;
    this.sun.position.set(3, 50, -2.25);
    this.scene.add(this.sun);
  }
}
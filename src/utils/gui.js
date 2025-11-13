import GUI from "lil-gui";
// Debug
const gui = new GUI();
export const setUpGUIControls = (parameters, onFinishChange) => {
  gui
    .add(parameters, "count")
    .min(100)
    .max(200000)
    .step(100)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "size")
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "radius")
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "branches")
    .min(1)
    .max(10)
    .step(1)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "spin")
    .min(-2)
    .max(2)
    .step(0.001)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "randomness")
    .min(0)
    .max(2)
    .step(0.001)
    .onFinishChange(onFinishChange);
  gui
    .add(parameters, "randomnessPower")
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(onFinishChange);
  gui.addColor(parameters, "insideColor").onFinishChange(onFinishChange);
  gui.addColor(parameters, "outsideColor").onFinishChange(onFinishChange);
};

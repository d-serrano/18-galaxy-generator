const getAleatorityByAxis = (radius, randomness) => {
  const aleatority = Math.pow(radius / parameters.radius - 2, 2) * randomness;
  return aleatority;
};

// must return a random value between -1 and +1 with a power factor
export const getRandomPowerValue = (ramdomness, ramdomnessPower) => {
  let random =  Math.pow(Math.random(), ramdomnessPower) *
    (Math.random() < 0.5 ? 1 : -1) *
    ramdomness;
    random += (Math.random() < 0.5 ? 1 : -1) * ramdomness *0.1;
  return random;
}
// return either 1 or -1
export const getRandomSignUnit = () => Math.random() < 0.5 ? 1 : -1;

// return a random vfalue between -1 and +1
export const getRandomUnit = () => Math.random()* getRandomSignUnit();

//return a ranmdom fraction of the given value
export const getRandomFraction = (value) => Math.random()*value;

// return a random value between -randomness and +randomness with a power factor
export const getRandomValue = (ramdomness, ramdomnessPower) => {
  const random =  Math.pow(Math.random(), ramdomnessPower) *
    getRandomSignUnit() *
    ramdomness;
  return random;
};

export const aleatorityCorrection = (vertex, randomVertex, radius) => {
  const tetha = Math.atan2(vertex.z, vertex.x);
  const randomTetha = Math.atan2(randomVertex.z, randomVertex.x);

  const deltaTetha = tetha - randomTetha;
  const fixedDelta =
    deltaTetha > Math.PI / 2
      ? (Math.PI / 2) * Math.sign(deltaTetha)
      : deltaTetha;

  // update x and z
  const newX = Math.cos(tetha + fixedDelta) * radius;
  const newZ = Math.sin(tetha + fixedDelta) * radius;
  const resVertex = {
    x: newX,
    y: randomVertex.y,
    z: newZ,
  };

  return resVertex;
};

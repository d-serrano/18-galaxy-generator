const getAleatorityByAxis = (radius, randomness) => {
    
    const aleatority = Math.pow((radius / parameters.radius)-2,2) * randomness;
    return aleatority;
};

export const getRandomValue = (ramdomness,ramdomnessPower) => {
    return Math.pow(Math.random(),ramdomnessPower) * (Math.random()<0.5 ? 1 : -1) * ramdomness;
}

export const aleatorityCorrection = (vertex, randomVertex, radius)=> {
    const tetha = Math.atan2( vertex.z , vertex.x);
    const randomTetha = Math.atan2(randomVertex.z ,randomVertex.x);
    
    const deltaTetha = tetha - randomTetha;
    const fixedDelta = deltaTetha > Math.PI/2 ? Math.PI/2 * Math.sign(deltaTetha) : deltaTetha;
    
    // update x and z
    const newX = Math.cos(tetha+fixedDelta)*radius;
    const newZ = Math.sin(tetha+fixedDelta)*radius;
    const resVertex = {
        x: newX,
        y: randomVertex.y,
        z: newZ,
    }
   
    return resVertex;
}

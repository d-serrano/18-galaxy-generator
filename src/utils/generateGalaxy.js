import { Color, BufferAttribute } from "three";
import { aleatorityCorrection, getRandomValue, getRandomSignUnit, getRandomUnit, getRandomFraction  } from "./inde.js";

export const galaxyGenerator =
  (parameters, galaxyGgeometry, galaxyMaterial) => () => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    let colorInside = new Color(parameters.insideColor);
    let colorOutside = new Color(parameters.outsideColor);
    galaxyMaterial.setValues({ size: parameters.size });

    for (let i = 0; i < parameters.count * 3; i += 3) {
      const pos = i;
      const radius = Math.pow(Math.random(), 10) * parameters.radius;

      const currentVertex = i / 3;
      const currentBranch = currentVertex % parameters.branches;
      const branchAngle = (currentBranch / parameters.branches) * Math.PI * 2;
      const spinAngle =
        Math.pow(parameters.spin, 2) * radius * (parameters.spin < 0 ? -1 : 1);
      // ramdomness decay in reaseon of the radius

      const randomVertex = getRandomVertexPolar(radius, branchAngle + spinAngle, parameters);
      positions[pos] = randomVertex.x;
      positions[pos + 1] = randomVertex.y;
      positions[pos + 2] = randomVertex.z;

      const vertexColor = getVertexColor(radius, parameters, colorInside, colorOutside);

      colors[pos] = vertexColor.r;
      colors[pos + 1] = vertexColor.g;
      colors[pos + 2] = vertexColor.b;
    }
    // add positions of each vertex to the geometry
    galaxyGgeometry.setAttribute("position", new BufferAttribute(positions, 3));
    galaxyGgeometry.setAttribute("color", new BufferAttribute(colors, 3));
  };

  const getRandomVertexPolar = (radius, tetha, parameters) => {
      const aleatority = getAleatority(radius, parameters);
    // get random offsets in the x,z plane

    const maxAngleOffset = Math.PI * (1/parameters.branches); // maximum angle offset to avoid overlapping branches
    const randomAngleOffset = getRandomValue(parameters.randomness, parameters.randomnessPower) ;

    // get the random offsets in the x.z plane
    let randomTethaOffset = getRandomValue(parameters.randomness, parameters.randomnessPower) * aleatority ;
    
    randomTethaOffset = Math.abs(randomTethaOffset) < maxAngleOffset ? randomTethaOffset : 0;

    let randomRadiusOffset = getRandomValue(parameters.randomness, parameters.randomnessPower) * aleatority ;

    const randomEpsilon = getRandomValue(parameters.randomness, parameters.randomnessPower) * (1/radius*radius) * aleatority * (Math.random()-0.5);

    const deltaTethaMagnitude = Math.abs(randomTethaOffset);
    const tethaR = (deltaTethaMagnitude < maxAngleOffset ?  tetha + randomTethaOffset : tetha );
    const radiusR = radius ;

    return {
      x: Math.cos(tethaR) * radiusR,
      y:0,
      z: Math.sin(tethaR) * radiusR,
    }
  }

  const getAleatority = (radius, parameters) => {
    return  Math.pow(radius / parameters.radius - 1.1, 2) * parameters.randomness ;
  }

  const getRandomVertex = (vertex,radius,parameters,) => {
    const aleatority = getAleatority(radius, parameters);
    const randomOffsetX =
        getRandomValue(parameters.randomness, parameters.randomnessPower) *
        aleatority;
      const randomOffsetY =
        getRandomValue(parameters.randomness, parameters.randomnessPower) *
        aleatority *
        0.2;
      const randomOffsetZ =
        getRandomValue(parameters.randomness, parameters.randomnessPower) *
        aleatority;

        const randomVertex = {
        x: vertex.x + randomOffsetX,
        y: vertex.y + randomOffsetY,
        z: vertex.z + randomOffsetZ,
      };

      return randomVertex;

  }

  const getVertexColor = (radius, parameters, colorInside, colorOutside) => {
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);
    return mixedColor;
  }
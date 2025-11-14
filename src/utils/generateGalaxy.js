import { Color, BufferAttribute } from "three";
import { aleatorityCorrection, getRandomValue } from "./inde.js";

export const galaxyGenerator =
  (parameters, galaxyGgeometry, galaxyMaterial) => () => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    let colorInside = new Color(parameters.insideColor);
    let colorOutside = new Color(parameters.outsideColor);
    galaxyMaterial.setValues({ size: parameters.size });

    for (let i = 0; i < parameters.count * 3; i += 3) {
      const pos = i;
      const radius = Math.pow(Math.random(), 2) * parameters.radius;

      const currentVertex = i / 3;
      const currentBranch = currentVertex % parameters.branches;
      const branchAngle = (currentBranch / parameters.branches) * Math.PI * 2;
      const spinAngle =
        Math.pow(parameters.spin, 2) * radius * (parameters.spin < 0 ? -1 : 1);
      // ramdomness decay in reaseon of the radius

      const vertex = {
        x: Math.cos(branchAngle + spinAngle) * radius,
        y: 0,
        z: Math.sin(branchAngle + spinAngle) * radius,
      };

      const randomVertex = getRandomVertex(vertex, radius, parameters);
      const vertexR = aleatorityCorrection(vertex, randomVertex, radius);
      positions[pos] = vertexR.x;
      positions[pos + 1] = vertexR.y;
      positions[pos + 2] = vertexR.z;

      const vertexColor = getVertexColor(radius, parameters, colorInside, colorOutside);

      colors[pos] = vertexColor.r;
      colors[pos + 1] = vertexColor.g;
      colors[pos + 2] = vertexColor.b;
    }
    // add positions of each vertex to the geometry
    galaxyGgeometry.setAttribute("position", new BufferAttribute(positions, 3));
    galaxyGgeometry.setAttribute("color", new BufferAttribute(colors, 3));
  };


  const getRandomVertex = (vertex,radius,parameters,) => {
    const aleatority =
        Math.pow(radius / parameters.radius - 2, 2) *
        parameters.randomness *
        0.2;
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
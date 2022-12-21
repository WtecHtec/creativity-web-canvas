const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 5
  const createGrid = () => {
    const points = []
    for (let i =  0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const u = i / (count - 1)
        const v = j / (count - 1)
        points.push([u, v])
      }
    }
    return points
  }
  const points = createGrid()
  return ({ context, width, height }) => {
    const margin = width * 0.175;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, 50, 0, Math.PI * 2, true); // 绘制
      context.strokeStyle = 'black';
      context.lineWidth = 20;
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);

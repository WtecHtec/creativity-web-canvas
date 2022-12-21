const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');
const random = require('canvas-sketch-util/random');

let palette = random.pick(palettes);

palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(2, palette.length + 1));

const background = palette.shift();


const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 30
  const createGrid = () => {
    const points = []
    for (let i =  0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const u = i / (count - 1)
        const v = j / (count - 1)
        const position = [ u, v ];
        points.push({
          color: random.pick(palette), // 从  palette 颜色集合中，随机取一个颜色
          radius: Math.abs(30 + 20 * random.gaussian()),  // 高斯算法
          position
        });
      }
    }
    return points
  }
  // 随机显示部分
  let points = createGrid().filter(() => {
    return Math.random() > 0.75;
  });

  return ({ context, width, height }) => {
    const margin = width * 0.175;
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    points.forEach(({
      radius,
      color,
      position,
    }) => {
      const [u, v] = position
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, true); // 绘制
      context.fillStyle = color;
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);

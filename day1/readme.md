# demo1.js
功能： 绘制一个 n * n 排列圆形
# demo2.js
功能： 绘制一个 n * n 排列圆圈，设置边距.
## 引用 canvas-sketch-util 计算库。
```
tnpm i canvas-sketch-util -S

``` 
### lerp
```
value = lerp(min, max, t)
// 获取 min -> max  中间的 t 倍率的值。 t * min <= value <= t * max
```
# demo3.js
功能：随机颜色、半径，随机显示部分图案，让图案美观起来
## random.gaussian() 高斯函数 生成随机内容
# demo4.js
功能：绘制文字，加入噪声函数
## random.noise2D()  二维噪声函数 生成随机内容
# demo5.js
功能：让画布图案动起来
```
// 动画配置
const settings = {
  animate: true,
  duration: 4,
  dimensions: [ 2048, 2048 ]
};

```
## linspace(n, s) 函数
0 - 1 均分 n份, s 是否包含 1
```
linspace(4)
//  [0, 0.25, 0.5, 0.75]
linspace(4, 1)
//  [0, 0.3333333333333333, 0.6666666666666666, 1]

```
## random.noise3D 三维噪声函数 生成随机内容

# demo6.js
功能：旋转弧形



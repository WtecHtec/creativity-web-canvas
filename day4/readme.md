# 效果
使用shader 绘制一个渐变的圆形
# glsl  OpenGL 着色语言
shader 开发语言
##   precision highp float; 设置精准度
## uniform 获取参数 由应用程序传输给着色器
```
 uniform float time;
	// 参数为 float 类型的time
```
##  varying 由顶点着色器传输给片段着色器中的插值数据
```
 varying vec2 vUv;
```
# webgl.js
功能： 绘制一个绕Y轴旋转3D的棱体
## 基本流程
### 1.创建渲染器； const renderer = THREE.WebGLRenderer
### 2.创建摄像头； const camera = new THREE PerspectiveCamera(50, 1, 0.01, 100);
### 3.创建场景舞台，舞台可添加光、物体等； const scene = new THREE.Scene();
### 4. 渲染；  renderer.render(scene, camera);

## 3d物体到场景
### 正方体
```
  const geometry = new THREE.BoxGeometry(1, 1, 1);
```
### 材质
#### 基础材质 MeshBasicMaterial
```
  const material = new THREE.MeshBasicMaterial({
    color: "red", // 颜色
    wireframe: true， // 是否只显示 线框
  });

```
#### 无光照材质 MeshNormalMaterial
```
const material = new THREE.MeshNormalMaterial();

```
#### 标准材质 MeshStandardMaterial
这种材质需要 光源才可以显示材质颜色，不然就一片黑
```
 const material = new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 0.5,
		flatShading: true
  });
```
### 给物体加上材质
```
  const mesh = new THREE.Mesh(geometry, material);
```
## 环境光
让需要光照材质，显示材质
```
new  THREE.AmbientLight('#59143f')
```
## 点光源 
可以让物体有阴影
```
	const plight = new THREE.PointLight('#45caf7', 1, 15.5)

```




import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as THREE from "three";
// import * as shaders from "./shaders";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// let WIDTH = window.innerWidth;
// let HEIGHT = window.innerHeight;
// let canvas = document.createElement("canvas");
// canvas.width = WIDTH;
// canvas.height = HEIGHT;
//
//
// rootElement.append(canvas);
// //
// let ctx = canvas.getContext("2d");
//
// ctx.fillRect(10, 10, 100, 200);
//
// ctx.fillStyle = "red";
// ctx.fillRect(120, 10, 100, 200);
//
// ctx.moveTo(10, 230);
// ctx.lineTo(220, 230);
// ctx.strokeStyle = "red";
// ctx.lineWidth = 2;
// ctx.stroke();
// ctx.closePath();
//
// ctx.fillStyle = "green";
// ctx.beginPath();
// ctx.arc(300, 50, 40, 0, Math.PI * 2);
// ctx.closePath();
// ctx.fill();
//
// ctx.save();
// ctx.translate(300, 150);
// ctx.fillStyle = "rebeccapurple";
// ctx.strokeStyle = "red";
// ctx.beginPath();
// ctx.arc(0, 0, 40, 0, Math.PI * 2);
// ctx.fill();
// ctx.stroke();
// ctx.closePath();
// ctx.restore();
//
// ctx.save();
// ctx.font = "48px monospace";
// ctx.fillStyle = "rebeccapurple";
// ctx.fillText("Kottans", 400, 50);
// ctx.restore();
// // console.log('11111',t);
// function draw(t) {
//     // console.log(t,'t');
//   requestAnimationFrame(draw);
//   ctx.fillStyle = "white";
//   ctx.clearRect(0, 0, WIDTH, HEIGHT);
//
//   ctx.save();
//
//   let x = Math.sin(t / 300) * 100;
//   // let y = Math.cos(t / 100) * 100;
//   ctx.translate(300 + x, 250);
//
//   ctx.fillStyle = "purple";
//   ctx.beginPath();
//   ctx.arc(0, 0, 20, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();
//   ctx.restore();
//
//   let dots = 10;
//   for (let idx = 1; idx < dots + 1; idx++) {
//     let x = Math.sin((t / 4000) * idx) * 200;
//     let y = Math.cos((t / 4000) * idx) * 200;
//     ctx.save();
//     ctx.translate(300 + x, 250 + y);
//     ctx.fillStyle = "purple";
//     ctx.beginPath();
//     ctx.arc(0, 0, 10, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
//     ctx.restore();
//   }
// }
// draw(5);

// // let img = new Image();
// // img.crossOrigin = true;
// // img.src = "image.jpeg";
// // img.onload = function() {
// //   ctx.drawImage(img, 10, 250);

// //   let imdata = ctx.getImageData(0, 0, WIDTH, HEIGHT);

// //   for (let idx = 0; idx < imdata.data.length; idx += 4) {
// //     imdata.data[idx] = 255;
// //   }

// //   ctx.putImageData(imdata, 0, 0);
// // };

// // 3D with THREE.js
// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 1, 10000);
// camera.position.z = 200;

// let material = new THREE.ShaderMaterial({
//   uniforms: {
//     tExplosion: {
//       type: "t",
//       value: new THREE.TextureLoader().load("explosion.png"),
//     },
//     time: {
//       type: "f",
//       value: 0.0,
//     },
//   },
//   vertexShader: shaders.vs,
//   fragmentShader: shaders.fs,
// });

// let mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 4), material);
// scene.add(mesh);

// let renderer = new THREE.WebGLRenderer();
// renderer.setSize(WIDTH, HEIGHT);
// renderer.setPixelRatio(window.devicePixelRatio);

// // rootElement.children[0].remove();
// // rootElement.appendChild(renderer.domElement);
// // render();

// function render(t) {
//   material.uniforms["time"].value = 0.00025 * t;
//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// }



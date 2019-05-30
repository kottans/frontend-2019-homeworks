import React from "react";
import { object } from "prop-types";

const iconList = {
  clearSky: "01",
  fewClouds: "02",
  brokenClouds: ["03", "04"],
  rain: ["09", "10"],
  thunderstorm: "11",
  snow: "13",
  mist: "50"
};
const hours = new Date().getHours();

const MORNING_SKY = "#d7e8fd";
const AFTERNOON_SKY = "#6ba6f9";
const NIGHT_SKY = "#2e4482";
const SUN = "yellow";
const MOON = "#e6dfe8";
const CLOUD = "#b5aeb7";
const RAIN = "#356dee";
const WIND = "#7e807d";
const LIGHTING = "#ffcd00";
const SNOW = "#ffffff";
const ERROR_404 = "404";

function render(ctx, { height, width, weather }) {
  requestAnimationFrame(() => render(ctx, { width, height, weather }));
  let start = performance.now();

  ctx.fillRect(0, 0, width, height);

  if (Object.keys(weather).length !== 0 && weather.cod !== ERROR_404) {
    let weatherDescription = weather.weather[0].icon.substr(0, 2);

    switch (weatherDescription) {
      case iconList.clearSky:
        if (ctx.fillStyle === NIGHT_SKY) {
          drawMoon(width / 2, 80, MOON);
        } else {
          drawSun(width / 2, 100, SUN);
        }
        break;
      case iconList.fewClouds:
        if (ctx.fillStyle === NIGHT_SKY) {
          drawMoon(width / 2, 80, MOON);
        } else {
          drawSun(width / 2, 100, SUN);
        }
        drawClouds(width / 2, 140, CLOUD);
        break;
      case iconList.brokenClouds[0]:
      case iconList.brokenClouds[1]:
        drawClouds(width / 2, 140, CLOUD);
        break;
      case iconList.rain[0]:
      case iconList.rain[1]:
        drawRain(width / 2, 180, RAIN);
        drawClouds(width / 2, 140, CLOUD);
        break;
      case iconList.thunderstorm:
        drawThunderstorm(width / 2, 170, LIGHTING);
        drawRain(width / 2, 180, RAIN);
        drawClouds(width / 2, 140, CLOUD);
        break;
      case iconList.snow:
        drawClouds(width / 2, 140, CLOUD);
        drawSnow(width / 2 - 50, 210, SNOW);
        break;
      case iconList.mist:
        drawClouds(width / 2, 140, CLOUD);
        drawMist(width / 2 - 100, 110, 7, WIND);
        break;
    }
  }

  function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function drawSun(x, y, color) {
    drawCircle(x, y, 50, SUN);
    let gph = 360 / 12;
    let rs = Math.cos(start / 300) * 5;

    for (let i = 0; i < 12; i++) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(deg2rad(i * gph + rs));
      ctx.fillStyle = color;
      ctx.fillRect(-3, -90, 6, 30);
      ctx.restore();
    }
  }

  function drawMoon(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let xs = Math.cos(start / 300) * 3;
    ctx.moveTo(x, y - 50);
    ctx.quadraticCurveTo(x - 45, y - 45, x - 50, y);
    ctx.quadraticCurveTo(x - 45, y + 45, x, y + 50);
    ctx.quadraticCurveTo(x - 50 + xs, y, x, y - 50);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function drawMist(x, y, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    let xs = Math.cos(start / 400) * 3;
    let ys = Math.cos(start / 400) * 2;
    for (let i = 0; i < 3; i++) {
      y = y + 20;
      ctx.moveTo(x + xs, y + ys);
      ctx.quadraticCurveTo(x + 25 + xs, y + 15 + ys, x + 50 + xs, y + ys);
      ctx.quadraticCurveTo(x + 75 + xs, y - 15 + ys, x + 100 + xs, y + ys);
      ctx.quadraticCurveTo(x + 125 + xs, y + 15 + ys, x + 150 + xs, y + ys);
      ctx.quadraticCurveTo(x + 175 + xs, y - 15 + ys, x + 200 + xs, y + ys);
    }
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.closePath();
  }

  function drawThunderstorm(x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let xys = Math.sin(start / 300) * 2;
    ctx.moveTo(x - xys, y + xys);
    ctx.translate(x - xys, y + xys);
    ctx.lineTo(-70, 100);
    ctx.lineTo(-10, 40);
    ctx.lineTo(-15, 60);
    ctx.lineTo(25, 20);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function drawRain(x, y, color) {
    ctx.save();
    ctx.fillStyle = color;
    let ys = Math.sin(start / 300) * 5;
    ctx.translate(x, y + ys);
    ctx.fillRect(-60, 0, 6, 30);
    ctx.fillRect(-25, 10, 6, 30);
    ctx.fillRect(80, 0, 6, 30);
    ctx.fillRect(25, 25, 6, 30);
    ctx.fillRect(55, 20, 6, 30);
    ctx.fillRect(0, 40, 6, 30);
    ctx.restore();
  }

  function drawClouds(x, y, color) {
    let xs = Math.sin(start / 300) * 3;
    drawCircle(x - 30 + xs, y, 50, color);
    drawCircle(x + 30 + xs, y, 50, color);
    drawCircle(x - 80 + xs, y + 30, 30, color);
    drawCircle(x + 80 + xs, y + 20, 30, color);
    drawCircle(x + 35 + xs, y + 35, 35, color);
  }

  function drawSnow(x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let ys = Math.sin(start / 300) * 3;

    for (let i = 0; i < 5; i++) {
      ctx.moveTo(x, y);
      ctx.translate(x, y + ys);
      if (i < 2) {
        x = 40;
        y = 20;
      } else if (i === 2) {
        x = 40;
        y = -15;
      } else {
        x = -110;
        y = 25;
      }
      ctx.lineTo(0, 0);
      ctx.lineTo(20, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(10, 10);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, 20);
      ctx.lineTo(0, 0);
      ctx.lineTo(-10, 10);
      ctx.lineTo(0, 0);
      ctx.lineTo(-20, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(-10, -10);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, -20);
      ctx.lineTo(0, 0);
      ctx.lineTo(10, -10);
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function deg2rad(deg) {
    return (deg * Math.PI) / 180;
  }
}

export default class Weather extends React.PureComponent {
  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    if (6 <= hours && hours <= 11) {
      this.ctx.fillStyle = MORNING_SKY;
    } else if (12 <= hours && hours <= 20) {
      this.ctx.fillStyle = AFTERNOON_SKY;
    } else {
      this.ctx.fillStyle = NIGHT_SKY;
    }
    render(this.ctx, this.props);
  }
  componentDidUpdate() {
    render(this.ctx, this.props);
  }
  render() {
    const { width, height } = this.props;
    return (
      <canvas
        ref={node => {
          this.canvas = node;
        }}
        width={width}
        height={height}
        style={{
          borderBottom: "1px solid #eee"
        }}
      />
    );
  }
}

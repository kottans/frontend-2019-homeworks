import React from "react";
import LANG from "./color";

function render(ctx, { width, height, repos, repoName }, resArr, rt) {
  requestAnimationFrame(() =>
    render(ctx, { width, height, repos, repoName }, resArr, rt)
  );
  // let t = performance.now();
  let background = new Image();
  background.src = "static/media/space2.fa3e3e78.jpg";
  ctx.fillStyle = ctx.createPattern(background, "repeat");
  ctx.fill();
  ctx.fillRect(0, 0, width, height);

  if (Object.keys(repos).length === 0) {
    ctx.save();
    ctx.font = "32px Montserrat";
    ctx.fillStyle = "white";
    let txt = "Let's check your GitHub repo!";
    let txtWidth = ctx.measureText(txt).width;
    ctx.fillText(txt, width / 2 - txtWidth / 2, height / 2 - 16);
    ctx.restore();
  } else {
    ctx.save();
    ctx.font = "24px Montserrat";
    ctx.fillStyle = "white";
    resArr.forEach((obj, i) => {
      for (let key in obj) {
        let r = 0;
        let value = obj[key];
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = LANG.COLOR[key];
        ctx.arc(100 + r * 100, i * 50 + 70 + r, value * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        key !== "null"
          ? ctx.fillText(key + " [" + value + "]", 100 + r * 100, i * 50 + 70)
          : ctx.fillText(
              "Mixed" + " [" + value + "]",
              100 + r * 100,
              i * 50 + 70
            );
        r++;
      }
    });
    ctx.restore();

    rt.forEach((ball, ind) => {
      let expr = ind > 10 ? ind / 10 : ind + 1;
      ball.x += (ball.vx * expr) / 20;
      ball.y += (ball.vy * expr) / 15;

      if (
        ball.y + ball.vy > height - ball.radius ||
        ball.y + ball.vy < ball.radius
      ) {
        ball.vy = -ball.vy;
      }
      if (
        ball.x + ball.vx > width - ball.radius ||
        ball.x + ball.vx < ball.radius
      ) {
        ball.vx = -ball.vx;
      }

      ball.draw();
    });
  }
  if (repos.message === "Not Found") {
    ctx.save();
    ctx.font = "24px Montserrat";
    ctx.fillStyle = "white";
    let text = "There is no such galaxy in GitHub Universe";
    let txtWidth = ctx.measureText(text).width;
    ctx.fillText(text, width / 2 - txtWidth / 2, height / 2 + 12);
    ctx.restore();
  }
}

export default class Statistics extends React.PureComponent {
  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    render(this.ctx, this.props);
  }
  componentDidUpdate() {
    let { repos } = this.props;
    let resArr = [];
    let languages = Array.from(repos).map(item => item.language);
    let unique = languages.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    for (let i = 0; i < unique.length; i++) {
      let res = {};
      let key = unique[i];
      res[key] = 0;
      for (let j = 0; j < repos.length; j++) {
        if (Array.from(repos)[j].language === unique[i]) {
          res[key]++;
        }
      }
      resArr.push(res);
    }

    render(this.ctx, this.props, resArr, this.drawBall());
  }

  drawBall() {
    let { repos, width, height } = this.props;
    let quantity = repos.length;
    let ctx = this.ctx;
    let balls = [];
    for (let i = 0; i < quantity; i++) {
      let size = Array.from(repos)[i].size;
      let language = Array.from(repos)[i].language;
      let name = Array.from(repos)[i].name;
      let ball = {
        x: Math.random() * (width - (2 * size) / 1000) + size / 1000,
        y: Math.random() * (height - (2 * size) / 1000) + size / 1000,
        vx: 4,
        vy: 3,
        radius: size / 1000,
        color: LANG.COLOR[language],
        draw: function() {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.strokeStyle = "white";
          ctx.stroke();
          ctx.save();
          ctx.font = "14px Montserrat";
          ctx.fillStyle = "#fff";
          let txtWidth = ctx.measureText(name).width;
          ctx.fillText(name, this.x - txtWidth / 2, this.y + 7);
          ctx.restore();
          ctx.restore();
        }
      };
      balls.push(ball);
    }

    return balls;
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
      />
    );
  }
}

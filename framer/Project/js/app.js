var balloon, color, colors, device, deviceHeight, deviceWidth, i, profile, tab;

device = new Framer.DeviceView();

device.setupContext();

device.deviceType = "iphone-6-silver";

device.contentScale = 1;

deviceHeight = device.screen.height;

deviceWidth = device.screen.width;

profile = new Layer({
  width: 750,
  height: 1334,
  x: 0,
  y: 0,
  image: "images/profile.png"
});

colors = ["blue", "green", "purple", "red", "yellow"];

for (i = 1; i <= 30; i++) {
  color = Utils.randomChoice(colors);
  balloon = new Layer({
    width: 140,
    height: 286,
    x: Utils.randomNumber(-70, Screen.width + 70),
    y: Screen.height - 97,
    image: "images/" + color + ".png"
  });
  balloon.animate({
    properties: {
      y: -balloon.height,
      x: balloon.x + Utils.randomNumber(-100, 100)
    },
    time: Utils.randomNumber(2.0, 3.0),
    delay: Utils.randomNumber(0, 4),
    curve: "ease-in"
  });
}

tab = new Layer({
  width: 750,
  height: 97,
  y: Screen.height - 97,
  image: "images/tab.png"
});

balloon.on(Events.AnimationEnd, function() {
  return this.destroy();
});

function setup() {
  loadImage("FBvAptTVkAUKLHX.jfif", img => {
    createCanvas(img.width * 3, img.height);
    img.filter(GRAY);

    drawImg(img, 0, "Original (GRAY)");
    histogramStretch(img);  
    drawImg(img, 1, "Stretch (GRAY)");
    histogramEqualization(img);
    drawImg(img, 2, "Equalization (GRAY)");
  });
}

function drawImg(img, index, label)
{
  image(img, img.width * index, 0);
  textSize(32);
  fill(255, 255, 255);
  text(label, 10 + img.width * index, 30);
}
function histogramStretch(img)
{
  img.loadPixels();
  let minVal = 255, maxVal = 0 ;
  for (let i = 0; i < img.pixels.length; i += 4) {
    let pixelValue = img.pixels[i];
    minVal = min(minVal, pixelValue);
    maxVal = max(maxVal, pixelValue);
  }
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = map(img.pixels[i], minVal, maxVal, 0, 255);
    img.pixels[i + 1] = img.pixels[i];
    img.pixels[i + 2] = img.pixels[i];
  }
  img.updatePixels();
}

function histogramEqualization(img)
{
  let hist = new Array(256).fill(0);
  for (let i = 0; i < img.pixels.length; i += 4) {
    let pixelValue = img.pixels[i];
    hist[pixelValue]++;
  }
  let sum = hist.reduce((acc, val) => acc + val, 0);
  let cumulative = 0;
  for (let i = 0; i < 256; i++) {
    cumulative += hist[i];
    let newValue = map(cumulative, 0, sum, 0, 255);
    hist[i] = newValue;
  }
  for (let i = 0; i < img.pixels.length; i += 4) {
    let pixelValue = img.pixels[i];
    img.pixels[i] = hist[pixelValue];
    img.pixels[i + 1] = hist[pixelValue];
    img.pixels[i + 2] = hist[pixelValue];
  }
  img.updatePixels();
}
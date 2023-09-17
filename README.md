# ANU_P5JS_Histogram_Equalization

# Code
```
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
```

# 소감
## 김진혁(조장) 소감
```
이번에 P5.js를 이용하여 이미지의 픽셀의 히스토그램을 후처리하는 방법을 알아보고 실제로 구현하는 랩 과제를 진행하였습니다.
남태승 조원과 함께 진행해봤는데 둘다 히스토그램에 대해 강의시간에 처음 알게되어 조금더 추가 조사를 하게 되었었습니다.
조사를 하는 도중 서로 조사한 내용에대해 다소 엇갈리는 정보가 있거나 이해 차이가 있었지만
깊은 토론후에 히스토그램에 대해서 제대로 이해할수 있었습니다.
남태승 조원과 함께 이해한 바탕으로 직접 코드를 구현하여 동작을 확인해보았는데 실제로 예측한 결과물과 거의 같게 나와서 너무나 뿌듯했었습니다.
이번 결과물로 실제 다른 프로젝트에 유용하게 활용할 수 있을지 고민을 해보았지만 아쉽게도 저와 조원 둘다 사진에 대한 이해가 부족해서 신박한 활용방안을 떠오르지는 못했습니다.
하지만 이번에 히스토그램 영상처리에 대해 이해하고 디지털 영상처리가 어떤 분야인지 확실히 알게된것으로 너무 기쁘고 이 분야는 자주 사용되는 분야로 알고있는 만큼
이번에 배운것이 언젠가 꼭 활용될 때가 올것같다고 생각했습니다.
따라서 앞으로도 심제창 교수님의 디지털 영상처리 과목을 들으면서 해당 분야에 대해 좀더 심도깊게 이해하고 싶다는 생각과 설래는 감정이 강하게 느껴졌습니다.
```

## 남태승 소감
```
이번 과제를 진행하면서 영상처리 분야의 히스토그램에 대해서 알아보고 이를 코드로 구현하여 보았습니다. 
직접 이미지를 입력하여 입력된 이미지와 출력된 이미지를 비교하여보니 흐릿한 이미지나 이미지의 밝기(혹은 이미지의 명암)가 큰 편차가 없는 이미지에서 히스토그램 스트래칭 및 평탄화로 완성된 이미지가 더욱 눈에 들어왔습니다. 
이런 실습을 통하여 디지털영처리에 대해서 좀 더 이해한것 같아서 너무 기쁩니다. 
물론 코드를 히스토그램 평탄화 과정을 코드로 구현하는 구간이 조금 어려웠지만 웹검색과 chat GPT의 도움을 받아서 결과적으로 완성되어 너무 즐겁습니다.
```

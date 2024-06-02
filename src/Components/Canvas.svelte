<script>
  import jQuery from "jquery";
  import { MnistData } from "../mnist_data.js";
  import * as ml5 from "ml5";
  import * as util from "../mnist_utils";
  import { initCanvas } from "../draw_utils";
  import { onMount } from "svelte";
  import * as tf from "@tensorflow/tfjs";

  let canvas, ctx;

  let knnClassifier;

  async function loadKNNClassifier() {
    knnClassifier = ml5.KNNClassifier();
    knnClassifier.k = 30;
    const mnistData = new MnistData();
    await mnistData.load(5000, 800);
    const [x_train, y_train] = mnistData.getTrainData();
    const numTrainExamples = x_train.shape[0];
    for (let i = 0; i < numTrainExamples; i++) {
      const image = x_train.slice([i, 0, 0, 0], [1, 28, 28, 1]);
      const label = y_train.slice([i, 0], [1, 10]).argMax(1).dataSync()[0];
      knnClassifier.addExample(image.reshape([28 * 28]), label);
    }
    console.log("Training completed");
  }

  onMount(() => {
    // Initialize the canvas
    initCanvas("predict-canvas", 10, "#000000");

    canvas = document.getElementById("predict-canvas");
    ctx = canvas.getContext("2d");

    loadKNNClassifier();
    // Clear button functionality
    jQuery("#clear-btn").click(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Predict button functionality
    jQuery("#predict-btn").click(async () => {
      const preview = jQuery("#preview-canvas")[0];

      const img = tf.browser.fromPixels(canvas, 4);
      const resized = util.cropImage(img, canvas.width);
      await tf.browser.toPixels(resized, preview);

      const x_data = tf.cast(resized.reshape([1, 28, 28, 1]), "float32");
      const result = await knnClassifier.classify(x_data);
      const { label, confidences } = result;
      jQuery("#prediction").text("Predicted: " + label);

      // var y_pred = model.predict(x_data)
      // var prediction = Array.from(y_pred.argMax(1).dataSync())
      // $('#prediction').text('Predicted: ' + prediction)

      // const barchartData = Array.from(y_pred.dataSync()).map((d, i) => {
      //   return { index: i, value: d }
      // })
      // tfvis.render.barchart($('#predict-graph')[0], barchartData, { width: 400, height: 140 })
    });
  });
</script>

<div class="card-body">
  <h1 class="body-header">Try it out yourself!</h1>
  <p class="body-text">
    Draw a number (from 0 to 9) on the canvas below and see how KNN classifies
    what the number is!
  </p>
  <div class="canvas-container">
    <canvas
      id="predict-canvas"
      width="140"
      height="140"
      style="border:1px solid #000000;"
    ></canvas>
    <div class="preview-container">
      Preview <br />
      <canvas
        id="preview-canvas"
        width="28"
        height="28"
        style="border:1px solid #000000;"
      ></canvas>
    </div>
  </div>
  <div id="prediction-container">
    <h4><div class="badge badge-success" id="prediction"></div></h4>
  </div>
  <div class="button-container">
    <button type="button" class="btn btn-primary" id="clear-btn">Clear</button>
    <button type="button" class="btn btn-primary" id="predict-btn"
      >Predict</button
    >
  </div>
</div>
<hr />

<style>
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .canvas-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .preview-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
  }

  #prediction-container {
    margin-bottom: 20px;
    text-align: center;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }

  canvas {
    border: 1px solid black;
  }
</style>

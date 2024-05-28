<script>
    import { onMount } from 'svelte';
    import * as ml5 from 'ml5';
    import * as tf from '@tensorflow/tfjs';
    import { MnistData } from '../mnist_data.js';
    
    let canvas;
    let ctx;
    // Highlight: Add variables for the resized canvas
    let resizedCanvas;
    let resizedCtx;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let knnClassifier;
    let mnistData;
    
    async function trainClassifier() {
      mnistData = new MnistData();
      await mnistData.load(50, 10);
      const [x_train, y_train] = mnistData.getTrainData();
      const numTrainExamples = x_train.shape[0];
      for (let i = 0; i < numTrainExamples; i++) {
        const image = x_train.slice([i, 0, 0, 0], [1, 28, 28, 1]);
        const label = y_train.slice([i, 0], [1, 10]).argMax(1).dataSync()[0];
        knnClassifier.addExample(image.reshape([28 * 28]), label);
      }
      console.log('Training completed');
    }
    
    onMount(() => {
      knnClassifier = ml5.KNNClassifier();
      knnClassifier.k = 3;
      trainClassifier();
    
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      ctx.lineWidth = 10;
      // Highlight: Initialize the resized canvas and context
      resizedCanvas = document.getElementById('resized-canvas');
      resizedCtx = resizedCanvas.getContext('2d');
    
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
    });
    
    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
      isDrawing = false;
    }
    
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Highlight: Clear the resized canvas as well
      resizedCtx.clearRect(0, 0, resizedCanvas.width, resizedCanvas.height);
    }
    
    async function classifyDrawing() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const tensorImg = tf.browser.fromPixels(imageData, 1);
      console.log(tensorImg.arraySync());
      const resizedImg = tf.image.resizeBilinear(tensorImg, [28, 28]);
      const normalizedImg = resizedImg.div(255.0);
      const batchedImg = normalizedImg.expandDims(0);
      console.log(resizedImg.arraySync());
    
      const result = await knnClassifier.classify(batchedImg);
      console.log(result);
    
      // Highlight: Display the resized image on the additional canvas
      tf.browser.toPixels(resizedImg, resizedCanvas);
    }
    </script>
    
    <div>
      <canvas id="canvas" width="400" height="400"></canvas>
      <!-- Highlight: Add the resized canvas element -->
      <canvas id="resized-canvas" width="28" height="28"></canvas>
      <button on:click={clearCanvas}>Clear</button>
      <button on:click={classifyDrawing}>Classify</button>
    </div>
    
    <style>
    canvas {
      border: 1px solid black;
    }
    </style>
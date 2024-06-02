<script>
  import { onMount } from "svelte";
  import * as tf from "@tensorflow/tfjs";
  import * as d3 from "d3";
  import { MnistData } from "../mnist_data.js";

  let mnistData = new MnistData();
  let originalImageData = [];

  onMount(async () => {
    let mnistData = new MnistData();
    await mnistData.load(500, 100);
    const [trainImages, trainLabels] = mnistData.getTrainData();

    // Convert to array and select the first image
    const trainImagesArray = await trainImages.array();
    originalImageData = trainImagesArray[5];

    // Create the visualization
    createImageVisualization(originalImageData);

    // Clean up tensors to free memory
    trainImages.dispose();
    trainLabels.dispose();
  });

  function createImageVisualization(imageData) {
    const svg = d3
      .select("#image-visualization")
      .append("svg")
      .attr("width", 280)
      .attr("height", 280)
      .style("border", "1px solid black");

    svg
      .selectAll("rect")
      .data(imageData.flat())
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % 28) * 10)
      .attr("y", (d, i) => Math.floor(i / 28) * 10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => `rgb(${d * 255}, ${d * 255}, ${d * 255})`)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "red").attr("stroke-width", 2);

        d3.select("#tooltip")
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 20}px`)
          .style("display", "inline-block")
          .html(`Pixel value: ${(d * 255).toFixed(2)}`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");

        d3.select("#tooltip").style("display", "none");
      });
  }
</script>

<main>
  <h1>MNIST Training Image Visualization</h1>
  <div class="visualization-container">
    <div class="visualization-title">Original 28x28 Image</div>
    <div id="image-visualization"></div>
  </div>
  <div id="tooltip"></div>
</main>

<style>
  .h1 {
    padding: 2rem 1rem;
  }
  .visualization-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  .visualization-title {
    margin: 10px 0;
    font-size: 1.2em;
    font-weight: bold;
  }
  #tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    padding: 5px;
    display: none;
    pointer-events: none;
    font-size: 12px;
    z-index: 10;
  }
</style>

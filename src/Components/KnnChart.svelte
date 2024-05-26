<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // Generate random data points
  function generateRandomData(numPoints, numClasses) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        class: Math.floor(Math.random() * numClasses),
      });
    }
    return data;
  }

  // Calculate distances for KNN
  function calculateDistances(point, data) {
    return data
      .map((d) => ({
        ...d,
        distance: Math.sqrt((d.x - point.x) ** 2 + (d.y - point.y) ** 2),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  // Predict class for KNN
  function predictClass(distances, k) {
    const neighbors = distances.slice(0, k);
    const classCounts = {};
    neighbors.forEach((neighbor) => {
      classCounts[neighbor.class] = (classCounts[neighbor.class] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(classCounts));
    const predictedClasses = Object.keys(classCounts).filter(
      (c) => classCounts[c] === maxCount
    );

    return predictedClasses.length === 1 ? predictedClasses[0] : "tie";
  }

  let k = 3;
  let numClasses = 3;
  let numPoints = 50;
  let data = generateRandomData(numPoints, numClasses);

  const updateData = () => {
    data = generateRandomData(numPoints, numClasses);
    drawGraph();
  };

  const drawGraph = () => {
    const svg = d3.select("#graph");
    svg.selectAll("*").remove();

    // Draw data points
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 7)
      .attr("fill", (d) => d3.schemeCategory10[d.class]);

    // Handle hover and click events
    svg.on("mousemove", function (event) {
      const [mouseX, mouseY] = d3.pointer(event);
      const distances = calculateDistances({ x: mouseX, y: mouseY }, data);

      svg.selectAll("line").remove();
      svg
        .selectAll("line")
        .data(distances.slice(0, k))
        .enter()
        .append("line")
        .attr("x1", mouseX)
        .attr("y1", mouseY)
        .attr("x2", (d) => d.x)
        .attr("y2", (d) => d.y)
        .attr("stroke", (d) => d3.schemeCategory10[d.class])
        .attr("stroke-width", 1);
    });

    svg.on("click", function (event) {
      const [mouseX, mouseY] = d3.pointer(event);
      const distances = calculateDistances({ x: mouseX, y: mouseY }, data);
      const predictedClass = predictClass(distances, k);

      svg.selectAll("line").remove();

      const predictedColor =
        predictedClass === "tie"
          ? "white"
          : d3.schemeCategory10[predictedClass];

      svg
        .append("circle")
        .attr("cx", mouseX)
        .attr("cy", mouseY)
        .attr("r", 8)
        .attr("stroke", "black")
        .attr("fill", predictedColor);

      svg
        .append("text")
        .attr("x", mouseX)
        .attr("y", mouseY - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(predictedClass === "tie" ? "tie" : `Class ${predictedClass}`);
    });
  };

  onMount(() => {
    drawGraph();
  });
</script>

<div class="container">
  <h1 class="body-header">K-Nearest Neighbors Classification</h1>
  <p class="body-text">
    Click on the canvas below to see how the test-point is being classified.
  </p>
  <div class="controls">
    <div class="control">
      <label for="k">Number of Neighbors (k): {k}</label>
      <input
        type="range"
        id="k"
        min="1"
        max="10"
        bind:value={k}
        on:input={drawGraph}
      />
    </div>
    <div class="control">
      <label for="numClasses">Number of Classes: {numClasses}</label>
      <input
        type="range"
        id="numClasses"
        min="2"
        max="10"
        bind:value={numClasses}
        on:input={updateData}
      />
    </div>
    <div class="control">
      <label for="numPoints">Number of Points: {numPoints}</label>
      <input
        type="range"
        id="numPoints"
        min="10"
        max="200"
        bind:value={numPoints}
        on:input={updateData}
      />
    </div>
  </div>
  <div class="content">
    <svg id="graph" width="750" height="500"></svg>
    <div class="legend">
      {#each Array(numClasses) as _, i}
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: {d3.schemeCategory10[i]};"
          ></div>
          <div>Class {i}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .content {
    display: flex;
    align-items: center;
  }
  svg {
    border: 1px solid black;
    margin-top: 20px;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
  .control {
    margin: 5px 0;
  }
  .legend {
    margin-left: 20px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .legend-color {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>

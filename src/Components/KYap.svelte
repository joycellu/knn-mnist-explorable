<script>
    import { onMount } from 'svelte';
    import KNN from 'ml-knn';
    let k = 3; // Default value
    let knn;
    let canvas, ctx;

    function generateClusteredData(numPoints, separationDegree) {
        const points = [];
        const numClasses = 2;
        const maxX = 400;
        const maxY = 400;

        // Define centers for each class
        const centers = [
            { x: maxX * 0.47, y: maxY * 0.49 }, // Center for class 0
            { x: maxX * 0.53, y: maxY * 0.51 }  // Center for class 1
        ];

        // Variance around the center points
        const variance = 100;

        for (let i = 0; i < numPoints; i++) {
            const classIndex = i % numClasses;
            const centerX = centers[classIndex].x;
            const centerY = centers[classIndex].y;

            // Generate points around the center
            const x = centerX + Math.random() * variance * (Math.random() < 0.5 ? -1 : 1);
            const y = centerY + Math.random() * variance * (Math.random() < 0.5 ? -1 : 1);

            points.push({ x, y, class: classIndex });
        }

        // Optionally, adjust the separation degree by moving the centers apart or closer
        return points.map(point => ({
            x: point.x + (point.class === 0 ? -separationDegree : separationDegree),
            y: point.y + (point.class === 0 ? -separationDegree : separationDegree),
            class: point.class
        }));
    }

    // Generate 200 clustered points with moderate separation
    const points = generateClusteredData(200, 20);

    function trainKNN() {
      const dataset = points.map(p => [p.x, p.y]);
      const labels = points.map(p => p.class);
      knn = new KNN(dataset, labels, { k });
      draw();
    }
  
    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        const gridSize = 10;
        ctx.clearRect(0, 0, width, height);
        
        // Draw classification for each point in the grid
        for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            const prediction = knn.predict([[x, y]])[0];
            ctx.fillStyle = prediction === 0 ? '#fbc4ab' : '#d5e5ef'; // Change colors as needed
            ctx.fillRect(x, y, gridSize, gridSize);
        }
        }

        // Draw all points
        points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.class === 0 ? '#cc7161' : '#415a77';
        ctx.fill();
        });
    }
  
    onMount(() => {
      ctx = canvas.getContext('2d');
      trainKNN();
    });
  
    $: if (knn) {
      knn.k = k;
      draw();
    }
  </script>
    
<div class="container">
    <h1 class="body-header">Hyperparameter k</h1>
    <p class="body-text">
        The hyperparameter k determines how many closest neighbors are considered. 
        When k is small, the decision boundary tends to be more complex, following 
        the contours of training data more closely. As k increases, the decision 
        boundary tends to be smoother and simpler. Choosing the right k helps 
        balance between overfitting and underfitting. Toggle the slider below to see
        how decision boundaries change as the value of k changes!
    </p>
    <br>
    <canvas bind:this={canvas} width="400" height="400"></canvas>
    <br>
    <label for="k-slider">
    Choose k (number of neighbors): {k}
    </label>
    <input id="k-slider" type="range" min="1" max="100" bind:value={k} />
    <p class="body-text">
        <br>When k = 1, we see that the boundaries are complex and closely defined by 
        the training data. When this is the case, training error is very low. At 
        the cost, testing error may be high if the testing set differs from the 
        training set. As k increases, the boundaries become more robust. As an 
        effect, training error increases while testing errors decreases. However, 
        this doesn't mean that increasing k to the maximum is a good idea. Once k 
        gets too big, it takes in too many “opinions” and can get misled, meaning 
        both training and testing error starts increasing. As can be seen, choosing 
        an optimal value of k is important for KNN.
    </p>
</div>

<style>
    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
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
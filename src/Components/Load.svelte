<script>
    import jQuery from 'jquery';
    import * as tf from '@tensorflow/tfjs';
    import { MnistData } from '../mnist_data.js';
    import * as util from '../mnist_utils.js';

    async function loadData() {
        let data = new MnistData();
        await data.load(9, 9);
 
        const [x_test, y_test] = data.getTrainData(9);
        const labels = Array.from(y_test.argMax(1).dataSync());
        util.showExample('mnist-preview', x_test, labels);
    }
    
</script>


<div class="container" >  
    <h1 class="body-header">MNIST Classification</h1>
    <p class="body-text">
        Now let's take a look at an application of KNN: classifying handwritten 
        digits from 0-9. Here we use the MNIST database (Modified National 
        Institute of Standards and Technology database), which contains 60,000 
        training images and 10,000 testing images. Click the button below to see 
        some sample images in the dataset, which are 28x28 pixel grayscale images.
    </p>
    <n></n>
</div>
<div class="button-div">
    <button on:click={loadData}>
        Preview Data
    </button>
</div>
    
<div class="container">
    <h4><div id="loading-data" class="badge badge-warning"/></h4>
    <div id="mnist-preview"></div>
</div>


<style>
    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
    .button-div {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    button {
      font-family: var(--font-primary);
      border: 3px solid black;
      padding: 5px 10px;
    }
</style>
  
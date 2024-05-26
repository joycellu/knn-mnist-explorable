<script>
    import jQuery from 'jquery';
    import * as tf from '@tensorflow/tfjs';
    import { MnistData } from '../mnist_data.js';
    import * as util from '../mnist_utils.js';

    async function loadData() {
        let data = new MnistData();
        await data.load(50000, 10000);
 
        const [x_test, y_test] = data.getTestData(8);
        const labels = Array.from(y_test.argMax(1).dataSync());
        util.showExample('mnist-preview', x_test, labels);
    }
    
</script>


<div class="card-body" >    
    <h3>MNIST Dataset</h3>
</div>
<div class="button-div">
    <button on:click={loadData}>
        Load Data
    </button>
</div>
    
<div class="card-body">
    <h4><div id="loading-data" class="badge badge-warning"/></h4>
    <h4>Test Data Example</h4>
    <div id="mnist-preview"></div>
</div>


<style>
    .button-div {
      display: flex;
      justify-content: center;
    }
    button {
      font-family: var(--font-primary);
      border: 3px solid black;
      padding: 5px 10px;
    }
</style>
  
<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import * as tf from '@tensorflow/tfjs'
    import * as tfvis from '@tensorflow/tfjs-vis'
    import jQuery from 'jquery'

    import {MnistData} from '../mnist_data'
    import * as util from '../mnist_utils'
    import {initCanvas} from '../draw_utils'

    initCanvas('predict-canvas')

    jQuery('#clear-btn').click(function(){
        var canvas = jQuery('#predict-canvas')[0]
        var context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    })
</script>

<div class="card-body">
    <h3>Draw New Image</h3>    
    <div class="row  form-group">
        <div class="col-2 offset-0 form-group">
            <canvas id="predict-canvas" width="140" height="140" 
                    style="border:1px solid #000000;" ></canvas>
        </div>
        <div class="col-2" style="text-align:center">
            <div class="form-group">
                preview <br>
                <canvas id="preview-canvas" width="28" height="28" 
                        style="border:1px solid #000000;"></canvas>
            </div>
            <h4><div class="badge badge-success" id="prediction"/></h4>
        </div>
    </div>
    <button type="button" class="btn btn-primary" 
            id="clear-btn">Clear</button>
    <button type="button" class="btn btn-primary" 
            id="predict-btn" disabled>Predict</button>
</div><hr>
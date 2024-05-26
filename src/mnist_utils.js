import * as tf from '@tensorflow/tfjs';

export function showExample(elementId, data, labels, predictions=null ){
    const imgElement = document.getElementById(elementId);
    const testExamples = data.shape[0];
    imgElement.innerHTML = '';
    for (let i = 0; i < testExamples; i++) {
        const img = data.slice([i, 0], [1, data.shape[1]]);

        const div = document.createElement('div');
        div.className = 'pred-container';

        const canvas = document.createElement('canvas');
        canvas.className = 'prediction-canvas';
        tf.browser.toPixels (img.reshape([28, 28, 1]), canvas);
        const pred = document.createElement('div');

        const label = labels[i];
        if(predictions == null){
            pred.innerText = `label: ${label}`;
        }else{
            const prediction = predictions[i];
            const correct = prediction === label;

            pred.className = `pred ${(correct ? 'pred-correct' : 'pred-incorrect')}`;
            pred.innerText = `pred: ${prediction}`;
        }

        div.appendChild(pred);
        div.appendChild(canvas);

        imgElement.appendChild(div);
    }
}

export function cropImage(img, width=140){
    img = img.slice([0,0,3]);
    var mask_x = tf.greater(img.sum(0), 0).reshape([-1]);
    var mask_y = tf.greater(img.sum(1), 0).reshape([-1]);
    var st = tf.stack([mask_x,mask_y]);
    var v1 = tf.topk(st);
    var v2 = tf.topk(st.reverse());
    
    var [x1, y1] = v1.indices.dataSync();
    var [y2, x2] = v2.indices.dataSync();
    y2 = width-y2-1;
    x2 = width-x2-1;
    var crop_w = x2-x1;
    var crop_h = y2-y1;
    
    if (crop_w > crop_h) {
        y1 -= (crop_w - crop_h) / 2;
        crop_h = crop_w;
    }
    if (crop_h > crop_w) {
        x1 -= (crop_h - crop_w) / 2;
        crop_w = crop_h;
    }
    
    img = img.slice([y1,x1],[crop_h,crop_w ]);
    img = img.pad([[6,6],[6,6],[0,0]]);
    var resized = tf.image.resizeNearestNeighbor(img,[28, 28]);
    
    for(let i = 0; i < 28*28; i++) {
        resized[i] = 255 - resized[i];
    }
    return resized;
}
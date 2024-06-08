<script>
  import katexify from "../katexify";
  const math = "d(v, w) = \\sqrt{\\sum_{i=1}^{n} (v_i - w_i)^2}";
</script>

<div class="container">
  <h1 class="body-header">Euclidean Distance</h1>
  <p class="body-text">
    The Euclidean Distance between two n-dimensional vectors v, w:
    {@html katexify(
      math,
      true
    )}
    In this formula, v is the vectorized input that we want to classify. w would 
    then be the vector of a single item in the training set. The Euclidean 
    distances are recorded between v and all items in the training set, and the 
    k training items with nearest distance are polled for their labels. The 
    majority label is returned as the algorithm's prediction.
  </p>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
<div id="container">
  <h1 class="body-header">Concluding Text</h1>
  <p class="body-text">
    The key takeaway from our interactive explorable is that the k-nearest neighbors
    algorithm, despite its simplicity and intuitive nature, is still an
    effective tool for a wide range of classification tasks. Through our
    visualizations, users embark on a learning journey that reveals the
    elegance of this foundational machine learning technique.
  </p>
  <br>
  <p class="body-text">
    By first presenting KNN in a low-dimensional 2D space, we allow users to grasp
    the fundamental concepts of how the algorithm determines the k nearest
    neighbors and makes predictions through majority voting. This interactive
    introduction effectively demonstrates the simplicity and intuitive appeal
    of the algorithm, making it accessible to users with varying levels of
    technical expertise.
  </p>
  <br>
  <p class="body-text">
    Building upon this basic understanding, we introduce the importance of
    hyperparameter tuning of k through another interactive visualization. It
    demonstrates how decision boundaries change depending on the number of neighbors
    polled. This aids users' understanding of overfitting and underfitting in KNN.
  </p>
  <br>
  <p class="body-text">
    Furthermore, our drawing canvas allows users to experiment with the MNIST dataset.
    As users draw their own digits and observe how KNN classifies them, they discover the
    algorithm's surprising effectiveness, even when dealing with high-dimensional
    data.
  </p>
  <br>
  <p class="body-text">
    Sometimes, the most intuitive and straightforward approaches can yield
    astonishingly accurate and reliable results, challenging the common
    misconception that complex problems always require equally complex solutions.
  </p>
  <br>
  <div class="video-container">
    <iframe
      width="560" height="315"
      src="https://www.youtube.com/embed/RutY7sIRRcE?si=GHL1RQOkTUIqil11"
      title="Demo Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>
  </div>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .video-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1in; /* Add 1 inch of margin at the bottom */
  }
</style>
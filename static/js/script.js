function func() {
    let elem = document.querySelector('input[name="forma"]:checked').value;

    block1 = `<label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Length" min="0">
              </label>
              <label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Width" min="0">
              </label>
              <label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Height" min="0">
              </label>
              
              <div class="slide col-12 col-lg-3 col-md-6">
              <label id="sliderLabel">
                  <input type="checkbox" name="mm_inch" value="mm" checked/>
                      <span id="slider">
                          <span id="sliderMm">MM</span>
                          <span id="sliderInch">INCH</span>
                          <span id="sliderBlock"></span>
                      </span>
              </label>`
    block2 = `<label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Radius outer" min="0">
              </label>
              <label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Height" min="0">
              </label>
              
              <div class="slide col-12 col-lg-3 col-md-6">
              <label id="sliderLabel">
                  <input type="checkbox" name="mm_inch" value="mm" checked/>
                      <span id="slider">
                          <span id="sliderMm">MM</span>
                          <span id="sliderInch">INCH</span>
                          <span id="sliderBlock"></span>
                      </span>
              </label>`
    block3 = `<label class="col-12 col-lg-3 col-md-6">
                <input name="measure" type="number" step=any placeholder="Radius inner" min="0">
              </label>
              <label class="col-12 col-lg-3 col-md-6">
                  <input name="measure" type="number" step=any placeholder="Radius outer" min="0">
              </label>
              <label class="col-12 col-lg-3 col-md-6">
                  <input name="measure" type="number" step=any placeholder="Height" min="0">
              </label>
              
              <div class="slide col-12 col-lg-3 col-md-6">
              <label id="sliderLabel">
                  <input type="checkbox" name="mm_inch" value="mm" checked/>
                      <span id="slider">
                          <span id="sliderMm">MM</span>
                          <span id="sliderInch">INCH</span>
                          <span id="sliderBlock"></span>
                      </span>
              </label>`
    block4 = `<label class="col-12 col-lg-3 col-md-6">
                  <input name="measure" type="number" step=any placeholder="Radius outer" min="0">
              </label>
              
              <div class="slide col-12 col-lg-3 col-md-6">
              <label id="sliderLabel">
                  <input type="checkbox" name="mm_inch" value="mm" checked/>
                      <span id="slider">
                          <span id="sliderMm">MM</span>
                          <span id="sliderInch">INCH</span>
                          <span id="sliderBlock"></span>
                      </span>
              </label>`

    if (elem === 'block') {
        document.querySelector(".wstawka").innerHTML = block1;
    }
    else if (elem === 'cylinder') {
        document.querySelector(".wstawka").innerHTML = block2;
    }
    else if (elem === 'tube') {
        document.querySelector(".wstawka").innerHTML = block3;
    }
    else {
        document.querySelector(".wstawka").innerHTML = block4;
    }
}

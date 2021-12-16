<template>
    <div class="slider" :data-name="name"></div>
</template>

<script>
import nouislider from 'nouislider'
import wnumb from 'wnumb'
import 'nouislider/distribute/nouislider.css';

export default {
  props: {
    name: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      instance: undefined
    }
  },
  mounted: function () {
    var sliders = document.getElementsByClassName('slider');
    [].slice.call(sliders).forEach(slider => {

        let name = slider.getAttribute('data-name');
        nouislider.create(slider, {
            range: {
                'min': name === 'minus' ? -1 : 0,
                'max': name === 'minus' ? 0 : 1
            },
            start: [name === 'minus' ? -0.8 : 0.1, name === 'minus' ? -0.1 : 0.8],
            margin: 0.1,
            connect: true,
            tooltips: true,
            format: wnumb({
                decimals: 2
            }),
        });
        slider.noUiSlider.on('change', async () => {
          let val = await slider.noUiSlider.get();
          this.$store.dispatch('setRange', {name: slider.getAttribute('data-name'),val: val})
        });

        this.$store.dispatch('setRange', {name: slider.getAttribute('data-name'),val: slider.noUiSlider.get()})
    });
  }
}
</script>

<style>
</style>
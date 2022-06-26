<template>
  <div class="index">
    <Card></Card>
    <Chart></Chart>
  </div>
</template>

<script>
import Card from '@/components/StatisticalForm.vue';
import Chart from '@/components/StatisticalChart.vue';

export default {
  components: {
    Card,
    Chart,
  },
};
</script>

<style>
</style>

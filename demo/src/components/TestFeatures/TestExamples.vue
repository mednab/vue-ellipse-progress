<template>
  <section id="test-examples">
    <examples-controls
      @loadingChange="setLoadingState"
      @determinateChange="setDeterminateState"
      @noDataChange="setNoDataState"
      :test="true"
    />
    <v-container fluid class="fill-height">
      <v-row>
        <example2 :loading="loading" :determinate="determinate" :no-data="noData" :test="false" />
        <example2 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />
        <example3 :loading="loading" :determinate="determinate" :no-data="noData" :test="true" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
import ExamplesControls from "@/components/Examples/ExamplesControls";
import Example2 from "../Examples/Example2";
import Example3 from "../Examples/Example3";

export default {
  name: "TestExamples",
  components: {
    Example3,
    Example2,
    ExamplesControls,
  },
  data: () => ({
    loading: false,
    noData: false,
    determinate: false,
  }),
  methods: {
    setLoadingState(loadingState) {
      this.loading = loadingState;
    },
    setNoDataState(noDataState) {
      this.noData = noDataState;
    },
    setDeterminateState(determinateState) {
      this.determinate = determinateState;
    },
  },
};
</script>

<style scoped lang="scss">
#examples {
  position: relative;
  min-height: 100vh;
  padding: 200px 100px;
}

@media only screen and (max-width: 1263px) {
  #examples {
    padding: 100px 0px;
  }
}
</style>

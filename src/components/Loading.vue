<template>
  <div>
      <img src="../assets/loading.gif" class="loading">
  </div>
</template>

<script>
export default {
    name: 'loading'
}
</script>

<style lang="scss">
    .loading {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>
<template>
  <pre class="source-code-viewer">{{ source }}</pre>
</template>

<style>
.source-code-viewer {
  background-color: #ccc;
  overflow: auto;
  font-family: monospace;
}
</style>

<script>
export default {
  props: ['source'],
};
</script>

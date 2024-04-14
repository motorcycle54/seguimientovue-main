<template src="./timeLineItem.html"></template>
<script>
  import { onMounted } from "@vue/runtime-core";
  export default {
    name: "TimeLineItem",
    props : {data : Object},
    setup(props){
      let destinos = props.data;
      onMounted(() => {
        console.log("aquiiiii", destinos);
      });
      return { destinos }
    }
  }
</script>
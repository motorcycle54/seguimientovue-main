<template src="./timeLine.html"></template>
<script>
import { onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import { IframeChannelService } from "../../_services/iframeChannel.service";
export default {
  name: "TimeLine",
  props: { data: Object, compact: String },
  emits: ["idDetalle"],
  setup(props, { emit }) {
    const iframeChannelService = new IframeChannelService();
    let showRow = ref([]);
    let destinos = props.data;
    onMounted(() => {});

    let openClose = async(index, destino) => {
      if (destino.vinculo) {
        let obj = JSON.parse(JSON.stringify(destino.vinculo));
        iframeChannelService.sendMessage({ type: "getService", data: obj });

        let message = await iframeChannelService.listenMessage();
        destino.completeData = [];
        destino.completeData.push(...message.message);

        console.log("respuesta vinculo aqui ***", destino.completeData);
      }
      showRow.value[index] = showRow.value[index] == true ? false : true;
      
    };

    let openDetalle = (destino) => {
      if (!!destino) {
        console.log("aquiiiii", destino);
        emit("idDetalle", destino);
      }
    };

    return { destinos, showRow, openClose, openDetalle };
  },
};
</script>
<style>
.v-timeline--vertical.v-timeline--density-compact.v-timeline--side-end {
  grid-template-columns: min-content min-content;
}
.v-timeline--vertical.v-timeline {
  grid-template-columns: min-content min-content auto;
}

.line-time .v-timeline-item__body {
  min-width: 500px;
}

.v-timeline--vertical.v-timeline
  .v-timeline-item:first-child
  .v-timeline-item__body {
  -webkit-padding-before: 0px;
  padding-block-start: 0px;
}

.v-timeline--vertical.v-timeline
  .v-timeline-item:last-child
  .v-timeline-item__body {
  -webkit-padding-after: 24px;
  padding-block-end: 24px;
}

.v-timeline--vertical.v-timeline
  .v-timeline-item:last-child
  .v-timeline-item__body {
  -webkit-padding-after: 0px;
  padding-block-end: 0px;
}

.v-list-item--density-default.v-list-item--two-line {
  min-height: 42px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.v-timeline-item__opposite {
    position: absolute;
    left: 3px;
    z-index: 20;
}
</style>
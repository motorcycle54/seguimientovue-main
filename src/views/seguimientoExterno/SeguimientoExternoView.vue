<template src="./seguimientoExterno.html">
  
</template>
<script>
  import { onMounted } from "@vue/runtime-core";
  import { ref } from "@vue/reactivity";
  import { data1, dataDetalleTest } from "../../_dataExterna/data";
  import { IframeChannelService } from "../../_services/iframeChannel.service"
  export default {
    name: "TimeSeguimiento",
    setup(){
      const iframeChannelService = new IframeChannelService();
      let destinos = ref(data1);
      let openDetalle = ref(false);
      let dataDetalle = ref();
      
      onMounted(async() => {
        console.log("*** se envio esta data",window.data)
        // let message = await iframeChannelService.listenMessage();
        // if( message.message.constructor === Array ){          
        //   destinos.value = message.message
        // }
      });

      let openDialogDetalle = (destino) => {
        if(!!destino){          
          console.log("este es el id", destino)
          dataDetalle.value = dataDetalleTest;
          openDetalle.value = true;
        }
      }      

      
      return { openDetalle, destinos, openDialogDetalle, dataDetalle }
    }
  }
</script>
<style >
  .dialog-title {
    background: #0f2c52;
    color: #ffffff;
  }
</style>
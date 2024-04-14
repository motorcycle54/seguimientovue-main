<template src="./seguimiento.html">
  
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
      let openSeguimiento = ref(true);
      let openDetalle = ref(false);
      let dataDetalle = ref();
      
      onMounted(async() => {
        let message = await iframeChannelService.listenMessage();
        if( message.message.constructor === Array ){          
          destinos.value = message.message
        }
      });

      let openDialogDetalle = async(destino) => {
        if(!!destino){
          console.log("este es el id", destino)
          let obj = JSON.parse(JSON.stringify(destino));
          if(iframeChannelService.sendMessage({type:"openDetalleSeguimiento", data: obj})){
            let message = await iframeChannelService.listenMessage();
            dataDetalle.value = message.message;
            console.log("***data Detalle recibida", dataDetalle.value)
          }else{
            dataDetalle.value = dataDetalleTest;
          }         
          
          openDetalle.value = true;
        }
      }
      let openExternoSeguimiento = () => {
        var configuracion_ventana = "_blank,width=600,height=600,top=500,left=500,toolbar=no,location=no,status=no,menubar=no";
        let windowsSeguimiento = window.open(`${window.location.href}/externo`, "_blank", configuracion_ventana);
        windowsSeguimiento.data = dataDetalleTest;
        closeSeguimiento();
      }

      let closeSeguimiento = ()=>{
        openSeguimiento.value = false;
        iframeChannelService.sendMessage({type:"closeSeguimiento", data: openSeguimiento.value});
      }
      return { openSeguimiento, openDetalle, destinos, openExternoSeguimiento, closeSeguimiento, openDialogDetalle, dataDetalle }
    }
  }
</script>
<style >
  .dialog-title {
    background: #0f2c52;
    color: #ffffff;
  }

  html.v-overlay-scroll-blocked{
    width: 0% !important;

  }
</style>
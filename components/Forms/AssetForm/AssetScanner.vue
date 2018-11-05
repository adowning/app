<template>
 <v-layout column>
     <v-img src="./img/logo.png" aspect-ratio="1.7"></v-img>    
       <v-flex>
       <qrcode-reader v-if="!scan && !paused && startScan"  @init="onInit" @decode="onDecode" :paused="paused">
        </qrcode-reader>
      </v-flex>
      <v-flex>
       <v-btn v-if="!startScan" block color="primary" class="white--text" @click.native="scan()">
          Scan ID Badge
        </v-btn>
      </v-flex>
       <v-flex>
         <v-btn  block color="success" class="white--text" @click.native="updateScanedEmployee('1444044')">
          fakeScan
        </v-btn>
       <v-btn  block color="warn" class="white--text" @click.native="goHome()">
          Cancel
        </v-btn>
      </v-flex>
    <asset-list v-if="assetList.length < 1"/>
 </v-layout>

</template>
      
<script>
import { QrcodeReader } from "vue-qrcode-reader";
import { gebHandler } from "vue-geb"

export default{
  page: {
    title: "Log in"
  },
  data() {
    return {
      startScan: false
    }
  },
  
  methods: {
    goHome(){
      this.$router.push("/")
    },
    scan() {
      var self = this
      scanning = true
      // var cordova = cordova
      /* eslint-disable-next-line */
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          console.log(
            "We got a barcode\n" +
              "Result: " +
              result.text +
              "\n" +
              "Format: " +
              result.format +
              "\n" +
              "Cancelled: " +
              result.cancelled
          )
          self.updateScanedEmployee(result.text)
        },

        function(error) {
          alert("Scanning failed: " + error)
          scanning = false
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place ID badge inside the scan area", // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats:
            "DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF_417,RSS_EXPANDED,MSI,AZTEC", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  },
    onDestroy() {
      console.log("destroying")
      scanning = false
      finished = false
      
      this.user = null
    }
  }
  

</script>

<template>
 <v-container>
      <v-layout column>
    <v-img src="./img/logo.png" aspect-ratio="1.7"></v-img>    
       <v-flex>
   <qrcode-reader v-if="!finished && !paused && scanning"  @init="onInit" @decode="onDecode" :paused="paused">
        </v-flex>
      <v-flex>
       <v-btn v-if="!startScan" block color="primary" class="white--text" @click.native="scanning = true">
          Scan QRCode of Asset
        </v-btn>
      </v-flex>
       <v-flex>
         <v-btn v-if="isDeveloperMode" block color="success" class="white--text" @click.native="updateScanedEmployee('1444044')">
          fakeScan
        </v-btn>
       <v-btn  v-if="assetList.length < 1" block color="warn" class="white--text" @click.native="goHome()">
          Cancel
        </v-btn>
        <v-btn  v-if="assetList.length > 0 && scanning" block color="warn" class="white--text" @click.native="finished = true; scanning = false" >
          Finished
        </v-btn>
           <v-btn  v-if="assetList.length > 0 && !scanning" block color="warn" class="white--text" @click.native="finished = true">
          Scan more
        </v-btn>
      </v-flex>
      <v-flex>
            <v-data-table
    :headers="headers"
    :items="assets"
    v-model="selected"
    item-key="name"
    select-all
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.assetname }}</td>
      <td class="text-xs-right">{{ props.item.deviceimage }}</td>
      <td class="text-xs-right">{{ props.item.assettag }}</td>
      <v-btn></v-btn>
    </template>
  </v-data-table>
      </v-flex>
      </v-layout>
 </v-container>
</template>

<script>
// import ScanAsset from './ScanAsset'
// import AssetList from './AssetList'

export default {
  name: 'AssetForm',
  components: {
    // ScanAsset,
    // AssetList
  },
   data() {
    return {
      scanning: false,
      finished: false,
      selected: [],
        headers: [
          {
            text: 'Asset Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Device Image', value: 'image' },
          { text: 'Asset Tag', value: 'assettag' }
        ],
        assetList: []
    }
  },
  props: {
    // schema: [Object, Array],
    // parent: String
  },
  methods: {
    update(content) {
      this.$emit('update-value', {
        name: content.name,
        value: content.value,
        parent: this.parent
      })
  },
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

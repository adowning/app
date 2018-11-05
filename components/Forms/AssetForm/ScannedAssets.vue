<template>
 <v-container>
      <v-layout column>
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
      </v-layout>
 </v-container>
</template>

<script>
export default {
  name: 'ScannedAssets',
  data() {
    return {}
  },
  props: {
    // schema: [Object, Array],
    assetList: Array
  },
  methods: {
    update(content) {
      this.$emit('update-value', {
        name: content.name,
        value: content.value,
        parent: this.parent
      })
    }
  }
}
</script>

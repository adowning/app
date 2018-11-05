<template>
 <v-container>
   <v-spacer></v-spacer>
    <scan-badge v-if="!employee" @set-employee="setEmployee" />
     <Profile v-if="employee" :employee="employee"/>
 </v-container>
</template>
<script>
import ScanBadge from "../components/Employee/ScanBadge"
import Profile from "../components/Employee/Profile"

export default{
  page: {
    title: "Log in"
  },
  components: { ScanBadge, Profile },
  data() {
    return {
      employee: null
    }
  },
  mounted() {
    var self = this
    this.sub = this.$geb.getBus().subscribe(message => {
           if (message.type == "profileUpdated") {
        console.log(message.data) // this.$router.push("employee/profile")
        self.employee = message.data
      }
      if (message.type == "employeeScanSuccess") {
        console.log(message.data) // this.$router.push("employee/profile")
        self.employee = message.data
      }
    })
  },
  methods: {
    setEmployee(_employee) {
      this.employee = _employee
    }
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
    <v-col cols="10">
      <v-img
        :src="'https://image.freepik.com/free-vector/hand-drawn-cactus-plants_53876-6688.jpg'"
        max-height="600"
        
        
        
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </v-container>
  
</template>


<script>
export default {
  data: () => ({
    bmiTable: [
      {
        date: "2021-09-20",
        bmi: 50,
        note: "Echinopsis",
      },
      {
        date: "2021-09-21",
        bmi: 100,
        note: "Rebutia pulvinosa",
      },
      {
        date: "2021-09-22",
        bmi: 89,
        note: "Mammillaria",
      },
      {
        date: "2021-09-30",
        bmi: 200,
        note: "Haworthia limifolia",
      },
      {
        date: "2021-10-05",
        bmi: 650,
        note: "Succulent plant",
      },
      {
        date: "2021-10-11",
        bmi: 890,
        note: "Green finger",
      },
    ],

    search: "",
    headers: [
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Order",
        value: "bmi",
      },
      {
        text: "Name",
        value: "note",
      },
      { text: "Edit", align: "center", value: "actions", sortable: false },
    ],

    valid: true,
    bmi: 0,
    bmiRules: [
      (v) => !!v || "Price is required",
      (v) => (v && v > 0 && v < 1000) || "Price more than 0 and less than 1000",
    ],
    date: "",

    dateRules: [(v) => !!v || "Date is required"],
    note: "",

    dialog: false,
    dialogDelete: false,
    menu: false,
    modal: false,
    editedIndex: -1,
    itemSelected: {},

    editedItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },

    defaultItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },
  }),

  methods: {
    getColor(bmi) {
      if (bmi < 100) return "orange";
      else if (bmi >= 100 && bmi < 500) return "blue";
      else return "pink";
    },

    validate() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex == -1) {
          this.createItem();
        } else {
          this.updateItem();
        }
        console.log(this.bmiTable);
        this.close();
      } else {
        alert("Form not valid");
      }
    },

    createItem() {
      this.bmiTable.push(this.editedItem);
    },

    editItem(item) {
      this.editedIndex = this.bmiTable.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateItem() {
      Object.assign(this.bmiTable[this.editedIndex], this.editedItem);
    },

    deleteItem(item) {
      this.itemSelected = item;
      this.editedIndex = this.bmiTable.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.bmiTable.splice(this.editedIndex, 1);
      console.log(this.bmiTable);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.clearItem();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.clearItem();
    },

    clearItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.itemSelected = {};
      console.log(this.editedIndex);
    },
  },
  watch: {
    editedIndex(val) {
      console.log(val);
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Item" : "Edit Data";
    },
  },
};
</script>

<style>
.pinkkk {
  color: rgb(224, 154, 1);
}
</style>

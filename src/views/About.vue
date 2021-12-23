<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 pinkkk">
          Maxxcc
        </h1>
      </v-col>
    </v-row>
<v-row>
   <v-card
            White
            flat
  >
            <v-toolbar
              flat
              height="72"
    >
               <v-switch
                v-model="$vuetify.theme.dark"
                hint="Click to change Theme"
                inset
                label="Theme Dark"
                persistent-hint
              ></v-switch>
            </v-toolbar>          
          </v-card>
</v-row>


    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          
          <v-card>
            <v-card-title>
              Macxx
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="bmiTable"
              :loading="!bmiTable.length"
              :search="search"
            >
              <template slot="progress">
                <v-progress-linear
                  color="red"
                  indeterminate
                ></v-progress-linear>
              </template>

              <template v-slot:[`item.bmi`]="{ item }">
                <v-chip v-if="item.bmi != 0" :color="getColor(item.bmi)" dark>
                  {{ item.bmi }}
                </v-chip>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon large color="yellow darken-2" @click="editItem(item)"
                  >mdi-pencil-outline
                </v-icon>

                <v-icon large color="red darken-2" @click="deleteItem(item)"
                  >mdi-close-circle
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </template>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="card-shadow card-padding">
            <v-card-title
              >Yes,Sure. ({{ itemSelected.bmi }})</v-card-title
            >
            <v-card-actions class="pb-0">
              <v-spacer></v-spacer>
              <v-btn @click="closeDelete" color="yellow">Cancel</v-btn>

              <v-btn @click="deleteItemConfirm(itemSelected)" color="error"
                >Ok</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-btn
            @click="
              editedIndex = '-1';
              dialog = true;
            "
            color="success"
            >Add Item</v-btn
          >
        </template>

        <v-dialog v-model="dialog" max-width="800px">
          <v-card class="card-shadow">
            <v-card-title>{{ formTitle }}</v-card-title>

            <v-card-text class="card-padding">
              <v-container class="px-0">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <br />

                  <v-row>
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.bmi"
                        :counter="3"
                        :rules="bmiRules"
                        label="Price"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="editedItem.date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Update Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            :rules="dateRules"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="black" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="black"
                            @click="$refs.dialog.save(editedItem.date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.note"
                        :counter="255"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <br />
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions class="card-padding d-flex justify-center">
              <v-btn @click="close" color="error">Cancel</v-btn>

              <v-btn
                v-if="editedIndex == -1"
                :disabled="!valid"
                @click="validate"
                color="success"
                >Add Item</v-btn
              >
              <v-btn v-else @click="validate" color="success"
                >Edit</v-btn
              >
            </v-card-actions>
          </v-card>          
        </v-dialog>
      </v-col>
    </v-row>
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

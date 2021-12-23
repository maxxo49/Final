<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 pinkkk">
          Macxx
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
              height="0"
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
import{
  getFirestore,
  collection,
  query,
  onSnapshot,
  where,
  addDoc, setDoc,
  doc, deleteDoc
}from "firebase/firestore";

import { getAuth, signInAnonymously,onAuthStateChanged} from "firebase/auth"; 

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
    db : getFirestore(),

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
    authStateChanged() {       
      const auth = getAuth();       
        onAuthStateChanged(auth, (user) => {         
            if (user) { 
          // User is signed in, see docs for a list of available properties           
          // https://firebase.google.com/docs/reference/js/firebase.User           
          console.log(user); 
          // ... 
        } else { 
          // User is signed out 
          // ... 
        } 
      }); 
    }, 

    SignInAnonymously() {       
        const auth = getAuth();       
          signInAnonymously(auth) 
            .then(() => {           
              // Signed in.. 
        }) 
        .catch((error) => {           
          console.log(error); 
          // ... 
        }); 
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

    readItem(){
      if (localStorage.getItem("bmi") != null) {
        this.bmiTable = JSON.parse(localStorage.getItem("bmi"));
      }
      console.log(this.bmiTable);
    },








async getItemFromFirestore() {
      console.log("get and sync");
      
      const q = query(collection(this.db, "bmiTable"), where("bmi" ,">", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.bmiTable = [];
        var tmp = {};
        querySnapshot.forEach((doc) => {
          tmp = Object.assign({ uid: doc.id }, doc.data());
          this.bmiTable.push(tmp);
        });       
      });
      console.log(this.bmiTable);
      console.log(unsubscribe);
    },
    async createItem() {
      this.editedItem.bmi = parseInt(this.editedItem.bmi);
      // this.bmiTable.push(this.editedItem);
      // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));
      const docRef = await addDoc(collection(this.db, "bmiTable"), this.editedItem);
      console.log("Document written with ID: ", docRef.id);
    },
    
    
    editItem(item) {
      // this.editedIndex = this.bmiTable.indexOf(item);
      this.editedIndex = item.uid;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async updateItem() {
      this.editedItem.bmi = parseInt(this.editedItem.bmi);
      await setDoc(doc(this.db, "bmiTable", this.editedIndex), this.editedItem);
      // Object.assign(this.bmiTable[this.editedIndex], this.editedItem);
      // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));
    },
    deleteItem(item) {
      this.itemSelected = item;
      this.editedIndex = item.uid;
      console.log(this.editedIndex);
      // this.editedIndex = this.bmiTable.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      // this.bmiTable.splice(this.editedIndex, 1);
      // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));
      // console.log(this.bmiTable);     
      await deleteDoc(doc(this.db, "bmiTable", this.editedIndex));
      console.log("Delete");
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
  mounted() {
    //this.readItem();
    // this.SignInAnonymously();
    this.authStateChanged();          
    this.getItemFromFirestore();
    
  },
};
</script>

<style>
.pinkkk {
  color: rgb(224, 154, 1);
}
</style>

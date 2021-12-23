<template>
  <v-app id="inspire">
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 pointer"
          contain
          src="https://cdn.discordapp.com/attachments/354249727338086410/911295465423777792/desert-icon-7.png"
          transition="scale-transition"
          width="40"
          @click="goto('/')"
        />


        <v-toolbar-title class="pointer" @click="goto('/')">Cactus</v-toolbar-title>
        
        &nbsp;&nbsp;
        &nbsp;&nbsp;
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="Admin" depressed to="/AddProduct" text class="hidden-sm-and-down">
          <span class="mr-2">AddProduct</span>
          
        </v-btn>
         <v-btn v-if="signInState" to="/Customer" text class="hidden-sm-and-down">
          <span class="mr-2">Customer</span>
          
        </v-btn>
       

        
        <v-btn  @click="goto('/profile')"  text class="hidden-sm-and-down">
          <span class="mr-2">Profile</span>
        </v-btn>

        <v-btn v-if="!signInState" 
        depressed color="success" 
        to="/signinform"
        >Sign In</v-btn>
        <v-btn v-if="signInState"  depressed color="success" @click="SignOut">Sign Out</v-btn>

        
        
      </v-toolbar-items>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://stickershop.line-scdn.net/stickershop/v1/product/1405071/LINEStorePC/main.png;compress=true"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="goto(item.link)">
              {{
                item.title
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",

  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "Profile", icon: "mdi-forum", link: "/profile" },
    ],
    signInState: false,
    Admin: false,
  }),

  methods: {
    goto(path) {
      this.$router.push(path);
    },
    menuItems() {
      return this.menu;
    },
    SignOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful. 
          this.$router.push({ path: "/signinform" });
        })
        .catch((error) => {
          // An error happened. 
          console.log(error);
        });
    },
    authStateChanged() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties 
          // https://firebase.google.com/docs/reference/js/firebase.User 
          console.log(user);
          this.signInState = true;
         if (user.email=="admin@admin.com"){
            this.Admin = true;
            this.signInState = true;
          }
          else{
            this.signInState = true; 
            this.Admin = false; 
          }
         // ... 
        } else {
          this.signInState = false;
          // User is signed out 
          // ... 
        }
      });
    },

  },
  mounted() {
    this.authStateChanged();
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}

#inspire {
  background: url('https://cdn.discordapp.com/attachments/690189152922501124/911323216180572160/1269873.jpg')
    !important;
  /* background-size: cover; */
}

</style>

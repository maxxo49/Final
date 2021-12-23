<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.discordapp.com/attachments/690189152922501124/911330906365640774/unknown.png"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">


            <v-toolbar-title class="text-h6 white--text pl-0">
              Messages
            </v-toolbar-title>




          </v-app-bar>

          <v-card-title class="black--text mt-8">
            <v-avatar size="56">
              <img alt="user" :src="user.photoURL" />
            </v-avatar>
            <p class="ml-3">
              {{ user.displayName }}
            </p>
            <p class="ml-3">
              {{ user.email }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Today</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>


<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data: () => ({
    user: {},
    messages: [
      {
        from: "You",
        message: "Sure, I'll see you later.",
        time: "10:42am",
        color: "deep-purple lighten-1",
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green",
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple lighten-1",
      },
    ],
  }),
  methods: {
    authStateChanged() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log(user);
          this.user = user;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
  },
  watch: {},
  computed: {},
  mounted() {
    this.authStateChanged();
  },
};
</script> 
 
<style>
</style> 

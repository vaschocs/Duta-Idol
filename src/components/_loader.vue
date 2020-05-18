<template>
    <v-dialog
        v-model="$store.state.loader"
        hide-overlay
        persistent
        width="300"
    >

      <v-card
       color="deep-blue" dense dark
      >
        <v-card-text>
          LOADING
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>

    </v-dialog>
</template>
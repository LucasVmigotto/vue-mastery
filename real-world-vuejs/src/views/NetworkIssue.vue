<template>
  <div>
    <h1>Oops!</h1>
    <h3>Looks like you're experiencing some network issue, please click go back and try again.</h3>
    <router-link :to="{ name: 'event-list' }">Just take me to home</router-link>
  </div>
</template>

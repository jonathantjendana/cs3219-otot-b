<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Contact Book</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  title() {
    return 'Contact Book'
  }
}
</script>

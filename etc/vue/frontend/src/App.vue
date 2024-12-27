<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid px-4">
      <a class="navbar-brand" href="#">Node-RED Explorer</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <a class="nav-link" href="/">Home</a>
          <a class="nav-link" href="/about">About</a>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

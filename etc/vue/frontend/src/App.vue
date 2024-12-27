<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Node-RED Explorer</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/">Home</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/about">About</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

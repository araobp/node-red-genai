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
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

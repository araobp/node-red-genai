<script setup>
</script>

<template>
  <div class="container mt-3">

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button"
          role="tab" aria-controls="home-tab-pane" aria-selected="true">Node-RED</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button"
          role="tab" aria-controls="profile-tab-pane" aria-selected="false">Others</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active mt-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
        <div class="list-group">
          <RouterLink to="/app1" target="_blank" class="list-group-item list-group-item-action">App 1</RouterLink>
          <RouterLink to="/app2" target="_blank" class="list-group-item list-group-item-action">App 2</RouterLink>
          <RouterLink to="/app3" target="_blank" class="list-group-item list-group-item-action">App 3</RouterLink>
        </div>
      </div>
      <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">...
      </div>
    </div>
  </div>
</template>

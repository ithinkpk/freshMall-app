<template>
  <div class="menu-list">
    <a-menu :default-selected-keys="['1']" :default-open-keys="['sub1']" mode="inline" theme="dark"
      :inline-collapsed="$store.state.collapsed">
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if="!route.meta.hidden">
          <template>
            <span slot="title">
              <a-icon :type="route.meta.icon" /><span>{{ route.meta.title }}</span>
            </span>
            <a-menu-item v-for="child in route.children" :key="child.name">
              <router-link :to="{ name: child.name }">
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>

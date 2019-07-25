<template>
  <app-detail :is-edit="true" />
</template>

<script>
import AppDetail from './components/AppDetail'

export default {
  name: 'EditForm',
  components: { AppDetail }
}
</script>


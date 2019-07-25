<template>
  <app-detail :is-edit="false" />
</template>

<script>
import AppDetail from './components/AppDetail'

export default {
  name: 'CreateForm',
  components: { AppDetail }
}
</script>


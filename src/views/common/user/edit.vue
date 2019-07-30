<template>
  <user-form :is-edit="true" />
</template>

<script>
import UserForm from './components/UserForm'

export default {
  name: 'EditUser',
  components: { UserForm }
}
</script>


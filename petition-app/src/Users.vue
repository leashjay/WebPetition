<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <div v-if="$route.params.userId">
      <div id="user">​
        <router-link :to="{ name: 'users'}">​Back to Users​</router-link>
        <br/><br/>

        <table>
          <tr>
            <td>User ID</td>
            <td>Username</td>
          </tr>
          <td>
          <td>​{{ $route.params.userId }}​</td>
          <td>​{{ getSingleUser($route.params.userId).username }}​</td>
        </table>

        <button type="button" class="btn btn-primary"
                data-toggle="modal" data-target="#deleteUserModal">Delete
        </button>
      </div>

      <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog"
           aira-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteUserModalLabel"> Delete User</h5>
              <button type="button" class="close" data-dismiss="modal" areia-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure that you want to delete this user?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="'modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>


    <div v-else>
      <div id="users">
        <label> All Users </label>
        <table>
          <tr v-for="user in users">
            <td>​{{ user.username }}​</td>
            <td>​<!--- view link here --> ​</td>
            <td>
              <router-link :​to="{ name: 'user', params: { userId: user.user_id}}">​View​</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        users: []
      }
    },
    mounted: function () {
      this.getUsers();
    },
    methods: {
      getUsers: function () {
        this.$http.get('http://localhost:4941/api/v1/users')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      getSingleUser: function (id) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].user_id === id) {
            return this.users[i];
          }
        }
      }
    }
  }
</script>

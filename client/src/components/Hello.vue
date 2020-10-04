<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Contacts</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-alert :show="loadingError" variant="danger"
      >Loading from server failed</b-alert
    >
    <b-row v-if="!loading && !loadingError">
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Created Date</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact._id">
              <td>{{ contact.create_date | formatDateTime }}</td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.gender }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateContactToEdit(contact)">Edit</a> -
                <a href="#" @click.prevent="deleteContact(contact._id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="model._id ? 'Edit Contact ID#' + model._id : 'New Contact'">
          <b-alert v-model="showError" variant="danger" dismissible
            >None of the fields can be empty</b-alert
          >
          <form @submit.prevent="saveContact">
            <b-form-group label="Name">
              <b-form-input
                type="text"
                v-model="model.name"
                placeholder="John Doe"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Gender">
              <b-form-input
                type="text"
                v-model="model.gender"
                placeholder="Male/Female"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input
                type="text"
                v-model="model.email"
                placeholder="johndoe@test.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Phone">
              <b-form-input
                type="text"
                v-model="model.phone"
                placeholder="8123456"
              ></b-form-input>
            </b-form-group>

            <div>
              <b-btn type="submit" variant="success" class="mr-1">{{
                this.model._id ? "Update" : "Create"
              }}</b-btn>
              <b-btn
                type="submit"
                variant="secondary"
                class="mr-1"
                @click.prevent="onCancel"
                v-if="this.model._id"
                >Cancel</b-btn
              >
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/api";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      loadingError: false,
      contacts: [],
      model: {},
      showError: false,
      console,
    };
  },
  async created() {
    this.model.timestamp = new Date(Date.now()).toISOString();
    this.refreshContacts();
  },
  computed: {
    prettyDate: {
      get: function () {
        return this.$options.filters.formatDate(this.model.timestamp);
      },
      set: function (newValue) {
        let currTime = moment(this.model.timestamp).format("HH:mm:ss");
        if (moment(newValue + " " + currTime).isValid()) {
          this.model.timestamp = moment(
            newValue + " " + currTime
          ).toISOString();
        }
      },
    },
    prettyTime: {
      get: function () {
        return this.$options.filters.formatTime(this.model.timestamp);
      },
      set: function (newValue) {
        let currDate = moment(this.model.timestamp).format(
          moment.HTML5_FMT.DATE
        );
        if (moment(currDate + " " + newValue).isValid()) {
          this.model.timestamp = moment(
            currDate + " " + newValue
          ).toISOString();
        }
      },
    },
  },
  methods: {
    async refreshContacts() {
      this.loading = true;
      try {
        this.contacts = await api.getContacts();
      } catch (e) {
        this.loading = false;
        this.loadingError = true;
        return;
      }
      this.loading = false;
      this.loadingError = false;
      this.showError = false;
    },
    async populateContactToEdit(contact) {
      this.model = Object.assign({}, contact);
    },
    async saveContact() {
      if (!(this.model.name && this.model.gender && this.model.email && this.model.phone)) {
        this.showError = true;
        return;
      }
      if (this.model._id) {
        await api.updateContact(this.model._id, this.model);
      } else {
        await api.createContact(this.model);
      }
      this.model = {}; // reset form
      this.model.timestamp = new Date(Date.now()).toISOString();
      await this.refreshContacts();
    },
    async deleteContact(id) {
      if (confirm("Are you sure you want to delete this contact?")) {
        if (this.model._id === id) {
          this.model = {};
        }
        await api.deleteContact(id);
        await this.refreshContacts();
      }
    },
    async onCancel() {
      this.model = {};
      this.model.timestamp = new Date(Date.now()).toISOString();
      await this.refreshContacts();
    },
  },
};
</script>
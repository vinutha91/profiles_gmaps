var profilesUrl = 'https://jsonplaceholder.typicode.com/users',
    profilesList = [],
    errorElement = {},
    loading = {},
    profileTemplate = '',
    profilesContainer = {};

function pageLoaded() {
  errorElement = document.getElementById('profiles-load-error');
  loading = document.getElementById('loading');
  profileTemplate = document.getElementById('profile-template').innerHTML;
  profilesContainer = document.getElementById('profiles');

  init();
}

function init() {
	resetPage();

	
}
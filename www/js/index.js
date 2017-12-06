var profilesUrl = 'https://jsonplaceholder.typicode.com/users',
    profilesList = [],
    errorElement = {},
    loading = {},
    profileTemplate = '',
    profilesContainer = {},
    gmapObjects = [];

function pageLoaded() {
  errorElement = document.getElementById('profiles-load-error');
  loading = document.getElementById('loading');
  profileTemplate = document.getElementById('profile-template').innerHTML;
  profilesContainer = document.getElementById('profiles');

  init();
}

function resetPage() {
    errorElement.style.display = 'none';
    loading.style.display = 'block';
}

function init() {

  resetPage();  
  // Get profiles list here
  getProfilesList(profilesUrl, success, failure);

  function success(profiles) {
    // Get all profiles: Even ID and Sorted by last name in ascending order
    profilesList = profiles.filter(function(profile) {
      return !!profile.id && profile.id%2 === 0;
    }).sort(function(a, b) {
      return a.name.split(" ")[a.name.split(" ").length === 1 ? 1 : a.name.split(" ").length - 1]
              .localeCompare(b.name.split(" ").length === 1 ? 1 : b.name.split(" ")[b.name.split(" ").length - 1]);
    }).forEach(function(profile) {
      addProfile(profile);
    });

    errorElement.style.display = 'none';
    loading.style.display = 'none';
  }

  function failure(error) {
    errorElement.style.display = 'block';
    loading.style.display = 'none';
  }
}

function addProfile(profile) {
  
  // Prepares the profile from profileTemplate
  function createProfile() {
    var html = profileTemplate, regex;
    for (prop in profile) {
      regex = new RegExp('{{' + prop + '}}', 'ig');
      html = html.replace(regex, profile[prop]);
      if (prop === 'address') {
        for (subProp in profile[prop]) {
          regex = new RegExp('{{'+subProp+'}}', 'ig');
          html = html.replace(regex, profile[prop][subProp]);
        }
      }

      if (prop === 'company') {
        for (subProp in profile[prop]) {
          if (subProp === 'name') {
            regex = new RegExp('{{companyName}}', 'ig');
            html = html.replace(regex, profile[prop][subProp]);
          }
        }
      }
    }
    return html;
  }

  profilesContainer.innerHTML += createProfile();

  createMapAndMarker(parseFloat(profile.address.geo.lat), parseFloat(profile.address.geo.lng), '#gmaps'+profile.id);
}

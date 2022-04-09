window.$ = window.jQuery;
window.loadThrasioJobs = function() {
  //console.log("here");

  //Checking for potential Thrasio source or origin parameters
  var pageUrl = window.location.href;
  var thrsParameter = "";
  var trackingPrefix = "?thrs-";
  var accountName = "thrasio";
  // Define the container where we will put the content (or put in the body)
  var jobsContainer =
    document.getElementById("thrs-jobs-container") || document.body;

  if (pageUrl.indexOf(trackingPrefix) >= 0) {
    // Found Thrasio parameter
    var pageUrlSplit = pageUrl.split(trackingPrefix);
    thrsParameter = "?thrs-" + pageUrlSplit[1];
  }

  var htmlTagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  function replaceTag(tag) {
    return htmlTagsToReplace[tag] || tag;
  }

  //For displaying titles that contain brackets in the 'append' function
  function sanitizeForHTML(str) {
    if (typeof str == "undefined") {
      return "";
    }
    return str.replace(/[&<>]/g, replaceTag);
  }

  //Functions for checking if the variable is unspecified and removing script tags + null check
  //For making class names from department and team names
  function sanitizeAttribute(string) {
    if (string == "" || typeof string == "undefined") {
      return "uncategorized";
    }
    string = sanitizeForHTML(string);
    return string.replace(/\s+/gi, "");
  }

  // Adding the account name to the API URL
  var url =
    "https://api.lever.co/v0/postings/" +
    accountName +
    "?group=department&mode=json";

  //Create an object ordered by department and team
  function createJobs(responseData) {
    if (!responseData) return;

    //Older versions of IE might not interpret the data as a JSON object
    if (typeof responseData === "string") {
      responseData = JSON.parse(responseData);
    }

    var postingsByDepartment = [];

    for (var i = 0; i < responseData.length; i++) {
      if (!responseData[i]) continue;
      if (!responseData[i].postings) continue;
      if (!(responseData[i].postings.length > 0)) continue;

      postingsByDepartment[i] = {
        similarPostings: [],
        departmentTitle: responseData[i].title,
      };

      for (var j = 0; j < responseData[i].postings.length; j++) {
        var currentPosting = responseData[i].postings[j];
        if (postingsByDepartment[i].similarPostings.length == 0) {
          postingsByDepartment[i].similarPostings[0] = {
            similarPostingsTitle: currentPosting.text,
            postings: [currentPosting],
          };

          continue;
        }

        var identicalTitleIndex = postingsByDepartment[
          i
        ].similarPostings.findIndex(function(item) {
          return item.similarPostingsTitle == currentPosting.text;
        });

        if (identicalTitleIndex != -1) {
          postingsByDepartment[i].similarPostings[
            identicalTitleIndex
          ].postings.push(currentPosting);
        } else {
          postingsByDepartment[i].similarPostings.push({
            similarPostingsTitle: currentPosting.text,
            postings: [currentPosting],
          });
        }
      }
    }

    //console.log('postingsByDepartment', postingsByDepartment)

    // Sort by department
    postingsByDepartment.sort(function(a, b) {
      var departmentA = a.departmentTitle.toLowerCase(),
        departmentB = b.departmentTitle.toLowerCase();
      if (departmentA < departmentB) return -1;
      if (departmentA > departmentB) return 1;
      return 0;
    });

    window.postingsByDepartment = postingsByDepartment;
    window.filteredPostingsByDepartment = postingsByDepartment;

    window.getPostingsHtml = function getPostingsHtml(
      groupedPostings,
      isToShowLocationDropdown
    ) {
      var content = "";

      for (var i = 0; i < groupedPostings.length; i++) {
        // If there are no departments used, there is only one "unspecified" department, and we don't have to render that.
        if (groupedPostings.length >= 1) {
          var haveDepartments = true;
        }

        //console.log(groupedPostings[i].similarPostings.length);

        if (haveDepartments) {
          content +=
            '<section class="thrs-department" data-department="' +
            groupedPostings[i].departmentTitle +
            '">' +
            '<h3 class="thrs-department-title">' +
            sanitizeForHTML(groupedPostings[i].departmentTitle) +
            "(" +
            groupedPostings[i].similarPostings.length +
            ")" +
            "</h3>";
        }
        if (isToShowLocationDropdown) {
          for (var k = 0; k < groupedPostings[i].similarPostings.length; k++) {
            content +=
              '<div class="thrs-job" data-frst-index="' +
              i +
              '" data-scnd-index="' +
              k +
              '">' +
              '<span class="thrs-descr" data-frst-index="' +
              i +
              '" data-scnd-index="' +
              k +
              '">' +
              sanitizeForHTML(
                groupedPostings[i].similarPostings[k].similarPostingsTitle
              ) +
              "</span>" +
              "</div>";
          }
        } else {
          for (var k = 0; k < groupedPostings[i].similarPostings.length; k++) {
            content +=
              '<a href="/company/careers/open-roles/' +
              groupedPostings[i].similarPostings[k].postings[0].id +
              '/" class="thrs-job">' +
              '<span class="thrs-descr">' +
              sanitizeForHTML(
                groupedPostings[i].similarPostings[k].similarPostingsTitle
              ) +
              "</span>" +
              "</a>";
          }
        }

        if (haveDepartments) {
          content += "</section>";
        }
      }

      return content;
    };

    window.getAplliedFilterText = function getAplliedFilterText(
      groupedPostings,
      location,
      departments,
      employmentType
    ) {
      var count = 0;
      var resultString = "";

      for (var i = 0; i < groupedPostings.length; i++) {
        for (var j = 0; j < groupedPostings[i].similarPostings.length; j++) {
          for (
            var k = 0;
            k < groupedPostings[i].similarPostings[j].postings.length;
            k++
          ) {
            count += 1;
          }
        }
      }

      resultString += count + " open roles";

      let hostname = window.location.protocol + "//" + window.location.hostname;
      //console.log(hostname);

      if (!location) {
        resultString += " in all locations";
      } else {
        resultString +=
          " in " +
          location +
          '<img src="'+hostname+'/wp-content/themes/thrasio/assets/images/Clear_icon@3x.png" class="clear-icon" data-clear="location" />';
      }

      if (!departments.length) {
        resultString += " in all departments";
      } else {
        for (var i = 0; i < departments.length; i++) {
          resultString +=
            " in the " +
            departments[i] +
            " Dept" +
            '<img src="'+hostname+'/wp-content/themes/thrasio/assets/images/Clear_icon@3x.png" class="clear-icon" data-clear="department" data-department-clear="' +
            departments[i] +
            '"/>';
        }
      }

      if (!employmentType) {
        resultString += " in all employment types";
      } else {
        resultString +=
          " for " +
          employmentType +
          " roles" +
          '<img src="'+hostname+'/wp-content/themes/thrasio/assets/images/Clear_icon@3x.png" class="clear-icon" data-clear="employment-type" />';
      }

      return resultString;
    };

    window.getFilterResultsText = function(
      searchString,
      locationFilter,
      departmentMultyFilter,
      employmentTypeFilter
    ) {
      // console.log(
      //   "getFilterResultsText",
      //   searchString,
      //   locationFilter,
      //   departmentMultyFilter,
      //   employmentTypeFilter
      // );
      var defaultText = "Browse all open positions...";
      var isFiltersChanged =
        searchString ||
        locationFilter ||
        departmentMultyFilter.length ||
        employmentTypeFilter;

      if (!isFiltersChanged) {
        return defaultText;
      }

      var resultParts = [];

      if (searchString) {
        resultParts.push(searchString.toLowerCase());
      }

      if (locationFilter) {
        resultParts.push(" " + locationFilter);
      }

      for (var i = 0; i < departmentMultyFilter.length; i++) {
        resultParts.push(" " + departmentMultyFilter[i]);
      }

      if (employmentTypeFilter) {
        resultParts.push(" " + employmentTypeFilter);
      }

      return "Results for: " + resultParts.join(",");
    };

    jobsContainer.innerHTML = getPostingsHtml(postingsByDepartment, true);
    $("#thrs-clear-filter-text").html(
      getAplliedFilterText(postingsByDepartment, null, [], null)
    );
    window.dispatchEvent(new Event("thrasioJobsRendered"));
  }

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "json";

  request.onload = function() {
    if (request.status == 200) {
      createJobs(request.response);
    } else {
      console.log("Error fetching jobs.");
      jobsContainer.innerHTML =
        "<p class='thrs-error'>Error fetching jobs.</p>";
    }
  };

  request.onerror = function() {
    console.log("Error fetching jobs.");
    jobsContainer.innerHTML = "<p class='thrs-error'>Error fetching jobs.</p>";
  };

  request.send();
};

window.loadThrasioJobs();

// IE polyfill for findIndex - found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true,
  });
}

// IE Polyfill for New Event

(function() {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

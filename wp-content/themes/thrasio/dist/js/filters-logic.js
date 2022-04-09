window.addEventListener("thrasioJobsRendered", function() {
  var jobList = window.postingsByDepartment;
  var locations = [];
  var departments = [];
  var workTypes = [];
  var selectExpand = {
    department: false,
    location: false,
    employmentType: false,
  };
  var multiselect = document.getElementsByClassName("multiselect")[0];
  var checkboxes = document.getElementById("checkboxes");
  var body = document.getElementsByTagName("body")[0];
  var checkedDepartments = [];
  var locationSelector = $("#thrs-location-select");
  var employmentTypeSelector = $("#thrs-work-type-select");
  var locationOptions = $("#thrs-location-options");
  var employmentTypeOptions = $("#thrs-employment-type-options");
  var selectedLocation = null;
  var selectedEmploymentType = null;
  let thrsJobsContainer = document.getElementById("thrs-jobs-container");
  let wrapper = document.getElementById("wrapper");

  wrapper.addEventListener("click", (e) => {
    if (e.target.className === "thrs-descr") {
      return null;
    }
    removeIsOpenClass();
  });

  thrsJobsContainer.addEventListener("click", (e) => {
    removeIsOpenClass();

    if (e.target.className === "thrs-descr") {
      e.target.parentNode.classList.add("isOpen");
    }
  });

  const removeIsOpenClass = () => {
    let isOpenElements = thrsJobsContainer.getElementsByClassName("isOpen");
    Array.from(isOpenElements).map((el) => {
      el.classList.remove("isOpen");
    });
  };

  locationSelector.on("click", function(event) {
    multiselect.childNodes[1].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    multiselect.classList.remove("multiselect-active");

    locationSelector[0].childNodes[1].childNodes[1].classList.toggle(
      "rotate-svg"
    );
    locationSelector[0].classList.toggle("multiselect-active");
    employmentTypeSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    employmentTypeSelector[0].classList.remove("multiselect-active");

    if (!selectExpand.location) {
      locationOptions.css("display", "block");
      selectExpand.location = true;
      employmentTypeOptions.css("display", "none");
      checkboxes.style.display = "none";
      selectExpand.employmentType = false;
      selectExpand.department = false;
    } else {
      locationOptions.css("display", "none");
      selectExpand.location = false;
    }
    event.stopPropagation();
  });

  employmentTypeSelector.on("click", function(event) {
    multiselect.childNodes[1].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    multiselect.classList.remove("multiselect-active");

    locationSelector[0].classList.remove("multiselect-active");
    locationSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    employmentTypeSelector[0].childNodes[1].childNodes[1].classList.toggle(
      "rotate-svg"
    );
    employmentTypeSelector[0].classList.toggle("multiselect-active");
    if (!selectExpand.employmentType) {
      employmentTypeOptions.css("display", "block");
      locationOptions.css("display", "none");
      checkboxes.style.display = "none";
      selectExpand.employmentType = true;
      selectExpand.location = false;
      selectExpand.department = false;
    } else {
      employmentTypeOptions.css("display", "none");
      selectExpand.employmentType = false;
    }
    event.stopPropagation();
  });

  multiselect.addEventListener("click", function showCheckboxes(event) {
    multiselect.childNodes[1].childNodes[1].childNodes[1].classList.toggle(
      "rotate-svg"
    );
    multiselect.classList.toggle("multiselect-active");

    locationSelector[0].classList.remove("multiselect-active");
    locationSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    employmentTypeSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    employmentTypeSelector[0].classList.remove("multiselect-active");
    if (!selectExpand.department) {
      checkboxes.style.display = "block";
      locationOptions.css("display", "none");
      employmentTypeOptions.css("display", "none");
      selectExpand.department = true;
      selectExpand.location = false;
      selectExpand.employmentType = false;
    } else {
      checkboxes.style.display = "none";
      selectExpand.department = false;
    }
    event.stopPropagation();
  });

  body.addEventListener("click", function hideCheckboxes() {
    multiselect.childNodes[1].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    multiselect.classList.remove("multiselect-active");

    employmentTypeSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    employmentTypeSelector[0].classList.remove("multiselect-active");
    locationSelector[0].classList.remove("multiselect-active");
    locationSelector[0].childNodes[1].childNodes[1].classList.remove(
      "rotate-svg"
    );
    checkboxes.style.display = "none";
    employmentTypeOptions.css("display", "none");
    locationOptions.css("display", "none");
    selectExpand.department = false;
    selectExpand.employmentType = false;
    selectExpand.location = false;

    $("#location-dropdown").remove();
  });

  for (var i = 0; i < postingsByDepartment.length; i++) {
    for (var j = 0; j < postingsByDepartment[i].similarPostings.length; j++) {
      for (
        var k = 0;
        k < postingsByDepartment[i].similarPostings[j].postings.length;
        k++
      ) {
        var item = postingsByDepartment[i].similarPostings[j].postings[k];
        var location = item.categories.location;
        if (jQuery.inArray(location, locations) == -1) {
          locations.push(location);
        }
        var department = item.categories.department;
        if (jQuery.inArray(department, departments) == -1) {
          departments.push(department);
        }
        var workType = item.categories.commitment;
        if (jQuery.inArray(workType, workTypes) == -1) {
          workTypes.push(workType);
        }
      }
    }
  }

  locations.sort();
  departments.sort();
  workTypes.sort();

  for (var j = 0; j < locations.length; j++) {
    locationOptions.append("<label>" + locations[j] + "</label>");
  }
  for (var j = 0; j < departments.length; j++) {
    $("#thrs-jobs-filter .thrs-jobs-filter-departments").append(
      "<option class=department>" + departments[j] + "</option>"
    );
    $("#checkboxes").append(
      '<label for="' +
        departments[j] +
        '"><input type="checkbox" class="checkbox-input" id="' +
        departments[j] +
        '" />' +
        departments[j] +
        "</label>"
    );
  }
  for (var j = 0; j < workTypes.length; j++) {
    employmentTypeOptions.append("<label>" + workTypes[j] + "</label>");
  }

  function applyCurrentFilters() {
    var locationFilter = selectedLocation;
    var commitmentFilter = selectedEmploymentType;
    var searchString = $("#thrs-jobs-filter .thrs-search")
      .val()
      .toLowerCase();
    var jobsContainer =
      document.getElementById("thrs-jobs-container") || document.body;

    var filteredJobList = jobList.reduce(function(acc, item) {
      if (
        checkedDepartments.length &&
        !checkedDepartments.includes(item.departmentTitle)
      ) {
        return acc;
      }
      var currentPostings = item.similarPostings.reduce(function(
        acc,
        similarPostingGroup
      ) {
        var subpostings = similarPostingGroup.postings.filter(function(
          posting
        ) {
          if (
            locationFilter != null &&
            posting.categories.location != locationFilter
          ) {
            return false;
          }

          if (
            commitmentFilter != null &&
            posting.categories.commitment != commitmentFilter
          ) {
            return false;
          }

          var stringArr = searchString.trim().split(" ");

          if (stringArr.length > 0) {
            for (i = 0; i <= stringArr.length; i++) {
              if (
                stringArr[i] !== undefined &&
                !posting.text.toLowerCase().includes(stringArr[i])
              ) {
                return false;
              }
            }
          }

          return true;
        });

        if (subpostings.length) {
          acc.push({
            similarPostingsTitle: similarPostingGroup.similarPostingsTitle,
            postings: subpostings,
          });
        }

        return acc;
      },
      []);

      if (currentPostings.length) {
        acc.push({
          departmentTitle: item.departmentTitle,
          similarPostings: currentPostings,
        });
      }

      return acc;
    }, []);

    // Show the 'no results' message if there are no matching results
    if (filteredJobList.length >= 1) {
      $("#thrs-no-results").hide();
    } else {
      $("#thrs-no-results").show();
    }

    window.filteredPostingsByDepartment = filteredJobList;

    jobsContainer.innerHTML = window.getPostingsHtml(
      filteredJobList,
      locationFilter == null
    );
    $("#thrs-clear-filter-text").html(
      window.getAplliedFilterText(
        filteredJobList,
        locationFilter,
        checkedDepartments,
        commitmentFilter
      )
    );
    $("#thrs-filter-results-text").text(
      window.getFilterResultsText(
        searchString,
        locationFilter,
        checkedDepartments,
        commitmentFilter
      )
    );

    $("#thrs-clear-filter-text .clear-icon").on("click", function(event) {
      var filterToClear = event.target.dataset.clear;
      console.log("filterToClear", filterToClear);

      if (filterToClear == "location") {
        selectedLocation = null;
        $("#thrs-location-select option").text("Location");
      }

      if (filterToClear == "employment-type") {
        selectedEmploymentType = null;
        $("#thrs-work-type-select option").text("Employment Type");
      }

      if (filterToClear == "department") {
        var removedDepartment = event.target.dataset.departmentClear;
        $('label:contains("' + removedDepartment + '")')
          .find(".checkbox-input")
          .prop("checked", false);
        checkedDepartments = checkedDepartments.filter(function(dep) {
          return dep != removedDepartment;
        });
        console.log(
          checkedDepartments,
          $('label:contains("' + removedDepartment + '")')
        );
      }

      applyCurrentFilters();
    });
  }

  // $('#thrs-jobs-filter select').change(applyCurrentFilters);

  $(".checkbox-input").on("change", function() {
    if (this.checked) {
      checkedDepartments.push(this.nextSibling.textContent);
    } else {
      checkedDepartments = checkedDepartments.filter(
        (dep) => dep != this.nextSibling.textContent
      );
    }

    applyCurrentFilters();
  });

  locationOptions.on("click", function(event) {
    selectedLocation = event.target.textContent;
    $(locationOptions[0].parentNode)
      .find("option")
      .text(selectedLocation);
    applyCurrentFilters();
  });

  employmentTypeOptions.on("click", function(event) {
    selectedEmploymentType = event.target.textContent;
    $(employmentTypeOptions[0].parentNode)
      .find("option")
      .text(selectedEmploymentType);
    applyCurrentFilters();
  });

  // handling search input with debounce
  var timeoutId = 0;
  $("#thrs-jobs-filter .thrs-search").on("input", function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(applyCurrentFilters, 150);
  });

  function resetToInitialList() {
    const jobsContainer =
      document.getElementById("thrs-jobs-container") || document.body;
    jobsContainer.innerHTML = window.getPostingsHtml(
      window.postingsByDepartment
    );
  }

  $("#thrs-jobs-container").on("click", function(event) {
    if (!["thrs-job", "thrs-descr"].includes(event.target.className)) {
      return true;
    }

    var frstIndex = event.target.dataset.frstIndex;
    var scndIndex = event.target.dataset.scndIndex;
    var locations = (window.filteredPostingsByDepartment ||
      window.postingsByDepartment)[frstIndex].similarPostings[scndIndex]
      .postings;
    var closestJob = $(event.target).closest(".thrs-job");

    $("#location-dropdown").remove();

    closestJob.append('<div id="location-dropdown"></div>');

    for (var i = 0; i < locations.length; i++) {
      $("#location-dropdown").append(
        '<a href="/company/careers/open-roles/' +
          locations[i].id +
          '/" class="location-dropdown_options">' +
          locations[i].categories.location +
          "</a>"
      );
    }

    event.stopPropagation();
  });

  ///////////////
  const optionFix = document.querySelectorAll(
    ".thrs-employment-type-options label"
  );

  const ArrLabelsOfOptions = Array.from(optionFix);

  ArrLabelsOfOptions.map((el) => {
    if (el.innerText === "undefined") {
      el.remove();
    }
  });
  ///////////////////////////
});

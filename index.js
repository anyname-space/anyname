document.addEventListener("DOMContentLoaded", () => {
  const namesList = document.getElementById("names-list");
  const categories = document.getElementById("categories-list");
  const genders = document.getElementById("genders-list");
  const nameTypes = document.getElementById("name-types-list");

  const fetchJson = async (path) => {
    const response = await fetch(path);
    const responseJson = await response.json();
    console.log("fetchJson", { response: responseJson });
    return responseJson;
  };

  const displayNames = (names) => {
    names.forEach((name) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = name;
      namesList.appendChild(listItem);
    });
  };

  const fetchData = async () => {
    const names = [];
    const categoriesArray = [];
    const gendersArray = [];
    const nameTypesArray = [];

    const categoriesMarkdown = await fetchJson("data/category.json");
    categoriesArray.push(...categoriesMarkdown.category);
    const gendersMarkdown = await fetchJson("data/gender.json");
    gendersArray.push(...gendersMarkdown.gender);
    const nameTypesMarkdown = await fetchJson("data/name_type.json");
    nameTypesArray.push(...nameTypesMarkdown.name_type);

    for (const category of nameTypesArray) {
      const response = await fetch(`data/names/${category}/`);
      const files = await response.text();

      const regex = /href="(.+?\.json)/g;
      let matches = files.match(regex);

      if (matches !== null) {
        matches.forEach(async (matchData) => {
          const matches = matchData.replace(/href="|\\/g, "");
          const nameDetail = await fetchJson(matches);
          console.log("name", { matchData, fileName: matches, nameDetail });
          names.push(nameDetail);
        });
      }
    }

    displayNames(names);
    categoriesArray.forEach((cat) => {
      const listItem = document.createElement("li");
      listItem.textContent = cat;
      categories.appendChild(listItem);
    });
    gendersArray.forEach((gender) => {
      const listItem = document.createElement("li");
      listItem.textContent = gender;
      genders.appendChild(listItem);
    });
    nameTypesArray.forEach((type) => {
      const listItem = document.createElement("li");
      listItem.textContent = type;
      nameTypes.appendChild(listItem);
    });
  };

  fetchData();
});

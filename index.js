document.addEventListener("DOMContentLoaded", () => {
  const namesList = document.getElementById("names-list");
  const categories = document.getElementById("categories-list");
  const genders = document.getElementById("genders-list");
  const nameTypes = document.getElementById("name-types-list");

  const fetchMarkdown = async (path) => {
    const response = await fetch(path);
    return await response.text();
  };

  const displayNames = (names) => {
    names.forEach((name) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = marked.parse(name);
      namesList.appendChild(listItem);
    });
  };

  const fetchData = async () => {
    const names = [];
    const categoriesArray = [];
    const gendersArray = [];
    const nameTypesArray = [];

    const categoryList = ["1_word", "2_words", "3_words"];

    const categoriesMarkdown = await fetchMarkdown("data/categories.md");
    categoriesArray.push(...categoriesMarkdown.split("\n").slice(1));
    const gendersMarkdown = await fetchMarkdown("data/genders.md");
    gendersArray.push(...gendersMarkdown.split("\n").slice(1));
    const nameTypesMarkdown = await fetchMarkdown("data/name_types.md");
    nameTypesArray.push(...nameTypesMarkdown.split("\n").slice(1));

    for (const category of categoryList) {
      const response = await fetch(`data/names/${category}/`);
      const files = await response.text();

      const regex = /<a href="(.+?\.md)">(.+?)<\/a>/g;
      let match;

      while ((match = regex.exec(files)) !== null) {
        const nameDetail = await fetchMarkdown(
          `data/names/${category}/${match[2].trim()}`
        );
        console.log("name", { match, fileName: match[2].trim() });
        names.push(nameDetail);
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

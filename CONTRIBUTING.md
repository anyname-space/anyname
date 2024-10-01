# Contributing to anyname

Thank you for your interest in contributing to anyname! Before making any changes, we kindly ask you to first discuss your proposed change via issues, discussions, or another method with the maintainers of this repository.

Please also adhere to our [Code of Conduct](./code_of_conduct.md) when interacting with others.

## Pull Request Process

1. **Create a new branch**:

   - Use a meaningful branch name such as `add-new-name` or `update-category`.

     ```bash
     git checkout -b your-branch-name
     ```

2. **Add your changes**:
   - For **names**, navigate to the appropriate `/data/names/` file (one-word, two-words, three-words).
   - For **categories**, edit the `/data/categories.json` file, or create a new one if necessary.
3. **Update the README.md**: If your changes affect the structure, instructions, or usage of the project, make sure to update the README.md accordingly.
4. **Create a pull request**:
   - Push your changes to your branch and open a pull request.
   - Add a clear and concise description of your changes.
   - Ensure your PR passes all the checks before requesting a review.
5. **Approval**: Your PR will be reviewed by the maintainers. If everything looks good, it will be merged!

## Adding Names

To add new names, follow these steps:

1. **Create a new branch**: Use a meaningful name for your branch.

   ```bash
   git checkout -b add-new-name
   ```

2. **Add your name**:

- Go to the `/data/names/` directory.
- Select the appropriate folder, ex: one word name `/data/names/1` etc.
- Create file with Create a file with the name you will add in `snake_case` format, ex: `name.json`, `this_is_long_name.json`.
- Append your name following this format:

  ```json
  {
    "name": "My Name",
    "name_type": "1",
    "gender": "male",
    "origin": "Indonesia",
    "category": ["Traditional", "Popular"],
    "contributor": {
      "github_username": "your_github_username"
    },
    "meaning": "Brave"
  }
  ```

- Don't forget to credit yourself by adding your GitHub username in the `contributor` field!

3. **Create a pull request**: Once you're done, push your branch and open a pull request. Make sure to explain what you’ve added in the description.

## Adding or Updating Categories

To add or update categories:

1. Follow steps 1 above.
2. Edit the `/data/categories.json` file and add your category, or update the existing ones if needed. Use this format:

   ```json
   {
     "category": ["Traditional", "Modern", "Unique", "Popular", "Mythical"]
   }
   ```

3. Make sure your new category aligns with existing names.
4. Open a pull request following the process mentioned above.

## Guidelines

- **Unique Names**: Make sure the names or categories you're adding are unique.
- **Format**: Follow the format as outlined above.
- **Respect Existing Work**: Avoid unnecessary duplicates or changes unless discussed.
- **Have Fun!**: This project is a collaborative effort, so let's keep it positive and inclusive.

Thank you for contributing to anyname! 😊

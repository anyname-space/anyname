package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"strings"
)

type Category struct {
	Category []string `json:"category"`
}

// Valid key that is allowed in the JSON
var validCategoryKey = "category"

func ValidateCategory(filePath string) error {
	// Read JSON file
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	// Check for additional keys
	var rawJSON map[string]interface{}
	if err := json.Unmarshal(data, &rawJSON); err != nil {
		return err
	}

	// Check if only valid keys are present
	if len(rawJSON) > 1 || (len(rawJSON) == 1 && rawJSON[validCategoryKey] == nil) {
		return errors.New("invalid JSON structure: only the 'category' key is allowed")
	}

	// Unmarshal the valid category key into the struct
	var category Category
	if cats, ok := rawJSON[validCategoryKey].([]interface{}); ok {
		for _, cat := range cats {
			if catStr, isString := cat.(string); isString {
				category.Category = append(category.Category, catStr)
			}
		}
	} else {
		return errors.New("invalid format for 'category'")
	}

	// Check for duplicates
	categoryMap := make(map[string]bool)
	for _, cat := range category.Category {
		cat = strings.TrimSpace(cat)
		if categoryMap[cat] {
			return fmt.Errorf("duplicate category found: %s", cat)
		}
		categoryMap[cat] = true
	}

	// Ensure there's at least one category
	if len(category.Category) == 0 {
		return errors.New("Category list cannot be empty")
	}

	fmt.Println("Category format is valid and no duplicates found.")
	return nil
}

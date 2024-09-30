package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main() {
	namesMap, err := getNamesFromJSON()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	duplicates := findDuplicates(namesMap)
	if len(duplicates) > 0 {
		fmt.Println("Duplicate names found ❌❌❌:")
		for name, files := range duplicates {
			fmt.Printf("Name: %s, Found in files: %v\n", name, files)
		}
		os.Exit(1) // Exit with non-zero status to indicate failure
	} else {
		fmt.Println("No duplicates found. ✅✅✅")
	}
}

// getNamesFromJSON retrieves names from JSON files in data/names/
func getNamesFromJSON() (map[string][]string, error) {
	namesMap := make(map[string][]string)

	err := filepath.Walk("../../data/names/", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(path) == ".json" {
			file, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			var data map[string]interface{}
			if err := json.Unmarshal(file, &data); err != nil {
				return err
			}
			if name, ok := data["name"].(string); ok {
				namesMap[name] = append(namesMap[name], path)
			}
		}
		return nil
	})

	return namesMap, err
}

// findDuplicates checks for duplicate names in the provided map
func findDuplicates(namesMap map[string][]string) map[string][]string {
	duplicates := make(map[string][]string)

	for name, files := range namesMap {
		if len(files) > 1 {
			duplicates[name] = files
		}
	}

	return duplicates
}

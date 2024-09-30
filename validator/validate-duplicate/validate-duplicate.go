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
		// Kirim hasil duplikasi ke output GitHub Actions
		fmt.Println("Duplicate names found ❌❌❌:")
		result := "Duplicate names found ❌❌❌ "
		for name, files := range duplicates {
			result += fmt.Sprintf("***Name:*** %s, ***Found in files:*** %v\n", name, files)
		}
		setGitHubOutput("duplicates", result)
		os.Exit(1) // Exit with non-zero status to indicate failure
	} else {
		fmt.Println("No duplicates found. ✅✅✅")
		setGitHubOutput("duplicates", "No duplicates found. ✅✅✅")
		os.Exit(0) // Exit with zero status to indicate success
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

// setGitHubOutput writes output to GITHUB_OUTPUT to pass data between steps
func setGitHubOutput(name, value string) {
	output := fmt.Sprintf("%s=%s\n", name, value)
	fmt.Printf("Setting GitHub output: %s", output)
	// Write to $GITHUB_OUTPUT for GitHub Actions
	f, err := os.OpenFile(os.Getenv("GITHUB_OUTPUT"), os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		fmt.Printf("Error opening GITHUB_OUTPUT: %v", err)
		return
	}
	defer f.Close()

	if _, err := f.WriteString(output); err != nil {
		fmt.Printf("Error writing to GITHUB_OUTPUT: %v", err)
	}
}

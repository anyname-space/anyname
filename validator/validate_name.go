package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type Name struct {
	Name string `json:"name"`
}

func main() {
	invalidFiles := []string{}

	// Loop through each folder (1, 2, 3)
	for i := 1; i <= 3; i++ {
		folder := fmt.Sprintf("data/names/%d", i)
		err := filepath.Walk(folder, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if !info.IsDir() && strings.HasSuffix(info.Name(), ".json") {
				// Read JSON file
				data, err := ioutil.ReadFile(path)
				if err != nil {
					return err
				}

				// Unmarshal JSON
				var name Name
				if err := json.Unmarshal(data, &name); err != nil {
					return err
				}

				// Count words in name
				wordCount := len(strings.Fields(name.Name))
				if wordCount != i {
					invalidFiles = append(invalidFiles, path)
				}
			}
			return nil
		})
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	}

	// Output results
	if len(invalidFiles) > 0 {
		fmt.Println("Invalid files found:")
		for _, file := range invalidFiles {
			fmt.Println(file)
		}
		// Output for GitHub Actions to capture
		fmt.Printf("::set-output name=invalidFiles::%s\n", strings.Join(invalidFiles, ", "))
		os.Exit(1) // Exit with a non-zero status
	} else {
		fmt.Println("All files are valid.")
	}
}

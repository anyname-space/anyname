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

func ValidateNames() ([]string, error) {
	invalidFiles := []string{}

	// Loop through each folder (1, 2, 3)
	for i := 1; i <= 3; i++ {
		folder := fmt.Sprintf("../data/names/%d", i) // Path relatif ke folder 'data'
		err := filepath.Walk(folder, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			if !info.IsDir() && strings.HasSuffix(info.Name(), ".json") {
				data, err := ioutil.ReadFile(path)
				if err != nil {
					return err
				}

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
			return nil, err
		}
	}

	return invalidFiles, nil
}

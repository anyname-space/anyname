package main

import (
	"fmt"
	"os"
)

func main() {
	invalidFiles, err := ValidateNames()
	if err != nil {
		fmt.Println("Errorfff:", err)
		os.Exit(1)
	}

	if len(invalidFiles) > 0 {
		fmt.Println("Invalid name files found ❌❌❌:")
		for _, file := range invalidFiles {
			fmt.Println(file)
		}

		//fmt.Printf("::set-output name=validation_output::%s", strings.Join(invalidFiles, ", "))
		os.Exit(1)
	} else {
		fmt.Println("All name files are valid ✅✅✅.")
	}

	categoryFilePath := "../data/category.json"
	err = ValidateCategory(categoryFilePath)
	if err != nil {
		fmt.Println("Error in category validation:", err)
		os.Exit(1)
	} else {
		fmt.Println("Category file is valid.")
	}
	os.Exit(0)
}

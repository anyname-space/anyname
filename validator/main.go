package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	// Validasi nama-nama JSON di folder data/names/
	invalidFiles, err := ValidateNames()
	if err != nil {
		fmt.Println("Errorfff:", err)
		os.Exit(1)
	}

	// Output hasil validasi nama
	if len(invalidFiles) > 0 {
		fmt.Println("Invalid name files found:")
		for _, file := range invalidFiles {
			fmt.Println(file)
		}
		// Output untuk GitHub Actions menangkap hasil
		fmt.Printf("::set-output name=invalidFiles::%s\n", strings.Join(invalidFiles, ", "))
		fmt.Println(invalidFiles)

	} else {
		fmt.Println("All name files are valid.")
	}

	// Validasi kategori JSON di data/categories.json
	categoryFilePath := "../data/category.json" // Sesuaikan path relatif ke file
	err = ValidateCategory(categoryFilePath)
	if err != nil {
		fmt.Println("Error in category validation:", err)

	} else {
		fmt.Println("Category file is valid.")
	}
	os.Exit(1)
}

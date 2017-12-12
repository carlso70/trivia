package utils

import (
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"golang.org/x/crypto/bcrypt"
)

func DefaultAvatarUrl() string {
	return "https://s3.us-east-2.amazonaws.com/triviacast/default.png"
}

func UploadFileToS3(filename string) string {
	// Create a Session with a custom region
	sess := session.Must(session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.AnonymousCredentials,
	}))

	// Create an uploader with the session and default options
	uploader := s3manager.NewUploader(sess)
	f, err := os.Open(filename)
	if err != nil {
		panic(err)
	}

	buck := GetBucket()

	// Upload the file to S3.
	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: &buck,
		Key:    &filename,
		Body:   f,
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("file uploaded to, %s\n", result.Location)
	return result.Location
}

func GetBucket() string {
	return "triviacast"
}

func GetKey() string {
	return ""
}

func GenerateId() int {
	max := 100000000
	rand.Seed(time.Now().UTC().UnixNano())
	return rand.Intn(max)
}

func EncryptPass(password string) string {
	// Hashing the password with the default cost of 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(hashedPassword))
	return string(hashedPassword)
}

// DecryptPass decrepts a hashed password that is stored in the db to one we are comparing
func DecryptPass(password string, hashedPassword string) error {
	// Comparing the password with the hash
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	// If err == nil that means it was a match
	return err
}

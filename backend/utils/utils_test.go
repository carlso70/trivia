package utils

import (
	"testing"
)

func TestEncryptionDecryption(t *testing.T) {
	pass := "testing"
	hashed := EncryptPass(pass)

	if err := DecryptPass(pass, hashed); err != nil {
		t.Errorf("Failed not a match")
	}
}

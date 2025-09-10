using System.Security.Cryptography;
using System.Text;

public static class HashHelper
{
    // Hashes the password with SHA256 and a salt
    public static string HashPassword(string password)
    {
        // In real scenarios, store and use a unique salt per user
        var salt = "<replace_with_unique_salt>";
        var saltedPassword = password + salt;

        using SHA256 sha256 = SHA256.Create();
        byte[] bytes = Encoding.UTF8.GetBytes(saltedPassword);
        byte[] hashBytes = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hashBytes);
    }

    // Verifies that a plain password matches the stored hash
    public static bool VerifyPassword(string password, string hashedPassword)
    {
        string hashOfInput = HashPassword(password);
        return hashedPassword == hashOfInput;
    }
}

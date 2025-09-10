using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public Guid UserID { get; set; }

    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [StringLength(1)]
    public string? MiddleInitial { get; set; }

    [EmailAddress]
    public string? EmailAddress { get; set; }

    [Phone]
    public string? PhoneNumber { get; set; }

    public string PasswordHash { get; set; } = string.Empty;

}
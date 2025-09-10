using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Customer")]
public class CustomerEntity
{
    [Key]
    public int CustomerId { get; set; }

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [StringLength(1)]
    public string? MiddleInitial { get; set; } = string.Empty;
}

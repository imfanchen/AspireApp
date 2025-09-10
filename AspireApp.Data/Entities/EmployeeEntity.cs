using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Employee")]
public class EmployeeEntity
{
    [Key]
    public int EmployeeId { get; set; }

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [StringLength(1)]
    public string? MiddleInitial { get; set; } = string.Empty;
}
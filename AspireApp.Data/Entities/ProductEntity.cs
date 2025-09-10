using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

[Table("Product")]
public class ProductEntity
{
    [Key]
    public Guid ProductId { get; set; }

    [Required]
    [MaxLength(256)]
    public string Name { get; set; }

    [Required]
    [Precision(18, 2)]
    public decimal Price { get; set; }
}